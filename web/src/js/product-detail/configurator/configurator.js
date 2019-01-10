import $ from 'jquery';
import { oneLineTrim } from 'common-tags';
import Table from './Table';
import TableWithCategories from './TableWithCategories';
import { renderErrorMessage, removeErrorMessages } from './error-messaging';
import { addItemToCachedData, isDataCached, getCachedDataById } from './configurator-data-cache';
import { getOptionItemPosition, getArrowDirection, formatPrice, getConfiguratorUrlByType } from './configurator-helpers';
import { priceStorage, updatePriceStorage, addItemToPriceStorage, getTotalPrice, updateTotalItems } from './price-storage';
import { appendLoader, removeLoader, dataLoading, addLoadingClassNameToOption, removeLoadingClassNameFromOption } from './configurator-loader';
import { fetcher } from '../../services/fetcher';

const tableStore = []

export const TYPE_VARIANT = 'variant';
export const TYPE_ATTRIBUTE = 'attribute';

const updateTotalPrice = (totalPrice) => {
  $('.product-detail-hidden-form__total-price').text(totalPrice)
}

const renderTables = (data, optionItem) => {
  tableStore.map(Table => Table.tableId !== data.id ? Table.hideTable() : null)

  const isTableInitialized = tableStore.filter(Table => Table.tableId === data.id)[0]
  const optionPosition = getOptionItemPosition($('.configurator__option'), optionItem)

  if (!isTableInitialized) {
    let TableItem = null

    const isPreselected = !!optionItem.data().preselected;

    const defaultOptions = {
      id: data.id,
      isPreselected: isPreselected,
      preselectedTitle: $(optionItem).find('.configurator__option-selected__title').text(),
      preselectedId: isPreselected ? Number(optionItem.data().preselectedVariantId) : null,
      preselectedPrice: isPreselected ? Number(optionItem.data().preselectedVariantPrice) : null,
      arrowDirection: getArrowDirection(getOptionItemPosition($('.configurator__option'), optionItem))
    }

    if (data.categories) {
      const tableOpts = {
        ...defaultOptions,
        categories: data.categories
      }

      TableItem = new TableWithCategories(tableOpts)
    } else {
      const tableOpts = {
        ...defaultOptions,
        items: data.items
      }

      TableItem = new Table(tableOpts)
    }

    TableItem.init()
    TableItem.template.appendTo($(optionItem).closest('.configurator__row'))
    TableItem.template.addClass(`configurator__table--position-${optionPosition}`)
    TableItem.showTable()

    tableStore.push(TableItem)
  } else {
    const CurrentTable = tableStore.filter(Table => Table.tableId === data.id)[0]

    if (CurrentTable.isVisible) {
      CurrentTable.template.removeClass(`configurator__table--position-${optionPosition}`)
      CurrentTable.hideTable()
    } else {
      CurrentTable.template.addClass(`configurator__table--position-${optionPosition}`)
      CurrentTable.showTable()
    }
  }
}

const updateHiddenFormData = (tableId, value) => {
  if (tableId === 'product-variant') {
    $('.product-detail-hidden-form').find(`#product-variant-price-selection`).val(value)
  }

  $('.product-detail-hidden-form').find(`input#attribute-${tableId}`).val(value)
}

const setDefaultPriceOnLoad = () => {
  const elements = $('button[data-option-id]')

  elements.each(function() {
    if ($(this).attr('data-default-value')) {
      addItemToPriceStorage({
        optionId: $(this).attr('data-option-id'),
        price: parseInt($(this).attr('data-default-value'))
      })
    }
  })
}

const setHiddenFormDataOnLoad = () => {
  const button = $('button[data-preselected-variant-id]')

  // only single item should be preselected
  if (button.length === 1) {
    updateHiddenFormData(
      'product-variant',
      button.attr('data-preselected-variant-id')
    )
  }
}

const initConfigurator = () => {
  setDefaultPriceOnLoad()
  setHiddenFormDataOnLoad()

  $('.configurator__option').on('click', function() {
    const self = $(this);
    const optionIdDataValue = self.attr('data-option-id');
    const optionType = self.attr('data-type');
    const productId = parseInt(self.attr('data-product-id'));
    const optionId = isNaN(optionIdDataValue) ? optionIdDataValue : parseInt(optionIdDataValue);
    const dataExists = isDataCached(optionId);
    const optionPosition = getOptionItemPosition($('.configurator__option'), self);

    if (dataLoading(self)) {
      return;
    }

    if (dataExists) {
      const existingData = getCachedDataById(optionId);

      removeErrorMessages();
      renderTables(existingData, self);
    } else {
      addLoadingClassNameToOption(self);
      appendLoader(self, optionId);

      const getData = async () => await fetcher(getConfiguratorUrlByType(optionType, productId, optionId));

      getData()
        .then(data => {
          removeLoader(optionId);
          removeErrorMessages();
          removeLoadingClassNameFromOption(self);
          renderTables(data, self);

          const shouldAddToPriceStorage = priceStorage.filter(item => item.optionId === optionId)[0];

          if (!shouldAddToPriceStorage) {
            addItemToPriceStorage({
              optionId,
              price: 0
            });
          }

          addItemToCachedData(data);
        })
        .catch((error) => {
          removeErrorMessages();
          removeLoader(optionId);
          removeLoadingClassNameFromOption(self);
          renderErrorMessage(self, optionPosition);
        })
    }
  })

  $(window).on('tableWithCategories.handleItemClick', function (e, Table) {
    const activeItem = Table.getActiveItem()
    const optionElement = $(`[data-option-id="${Table.tableId}"]`)
    const itemHasImage = !!activeItem.imgSrc

    const imgElement = itemHasImage
      ? `<img class="configurator__option-selected__img" src="${activeItem.imgSrc}" alt="${activeItem.title}" />`
      : ''

    optionElement.html(oneLineTrim`
      ${imgElement}
      <span class="${
      itemHasImage
        ? 'configurator__option-selected__title configurator__option-selected__title--offset-left'
        : 'configurator__option-selected__title'}
      ">
        ${activeItem.title}
      </span>
      <span class="configurator__option-selected__price">+&nbsp;${formatPrice(activeItem.price)}&nbsp;Kč</span>
    `)

    const value = activeItem.id
    const itemPrice = activeItem.price

    updateHiddenFormData(Table.tableId, value)
    updatePriceStorage(Table.tableId, itemPrice)
    updateTotalPrice(formatPrice(getTotalPrice()))
  });

  $('#total-items').on('change', function() {
    updateTotalItems(parseInt($('#total-items').val()))
    updateTotalPrice(formatPrice(getTotalPrice()))
  })

  $('.product-detail-hidden-form__submit').attr('type', 'submit')

  window.basketStartsUpdating = function() {
    const submitButton = $('.product-detail-hidden-form__submit');
    const loader = $(`
        <div class="product-detail-hidden-form__add-to-basket-loader"></div>
    `);

    $(loader).appendTo(submitButton);
    submitButton.addClass('product-detail-hidden-form__submit--loading');
  }

  window.basketStopsUpdating = function() {
    const submitButton = $('.product-detail-hidden-form__submit');

    submitButton.removeClass('product-detail-hidden-form__submit--loading');
    submitButton.find('.product-detail-hidden-form__add-to-basket-loader').remove();
  }

  window.onConfiguratorFormSubmit = function(requestSettings) {
    if (
      requestSettings.nette &&
      requestSettings.nette.form &&
      requestSettings.nette.form[0] &&
      requestSettings.nette.form[0].id === 'product-add-to-basket-form'
    ) {
      if ($('.product-detail-hidden-form__submit').hasClass('product-detail-hidden-form__submit--loading')) {
        return false;
      }

      $('.configurator__errors-template').remove()

      let isValid = true

      const errorList = $('<ul/>')
      const errorTemplate = $('<div class="configurator__errors-template" />')
      const errorTemplateHeader = $('<h2>Pro vložení produktu do košíku musíte vybrat následující položky:</h2>')

      $('.configurator__option').each((index, item) => {
        if ($(item).attr('data-required') === 'true') {
        const itemId = $(item).attr('data-option-id')
        const inputValue = $(`${itemId === 'product-variant' ? '#product-variant-price-selection' : '#attribute-' + itemId}`).val()

        isValid = !!inputValue;

        if (!inputValue) {
          const label = $(item).parent().find('.configurator__option-label').text()
          $(oneLineTrim`<li>${label}</li>`).appendTo(errorList)
        }
      }
    })

      if (!isValid) {
        errorTemplateHeader.appendTo(errorTemplate)
        errorList.appendTo(errorTemplate)
        errorTemplate.appendTo($('.configurator'))

        return false
      } else {
        return true
      }
    }
  }
}

export default initConfigurator
