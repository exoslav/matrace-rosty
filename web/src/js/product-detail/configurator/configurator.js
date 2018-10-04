import $ from 'jquery'
import { oneLineTrim } from 'common-tags'
import Table, { SIMPLE_TABLE } from './Table'
import TableWithCategories, { CATEGORIES_TABLE } from './TableWithCategories'
import { getOptionItemPosition, getArrowDirection, formatPrice } from './configurator-helpers'
import { priceStorage, updatePriceStorage, addItemToPriceStorage, getTotalPrice, updateTotalItems } from './price-storage'

const errorMessages = []
const tableStore = []

const TYPE_VARIANT = 'variant'
const TYPE_ATTRIBUTE = 'attribute'
const ERROR_MESSAGE_UNEXPECTED_ERROR = 'Nastala neočekávaná chyba, nebylo možné načíst položky. Zkuste to prosím znovu.'

const updateTotalPrice = (totalPrice) => {
  $('.product-detail-hidden-form__total-price').text(totalPrice)
}

const renderOptions = (data, optionItem) => {
  tableStore.map(Table => Table.tableId !== data.id ? Table.hideTable() : null)

  const isTableInitialized = tableStore.filter(Table => Table.tableId === data.id)[0]
  const optionItemPosition = getOptionItemPosition($('.configurator__option'), optionItem)

  if (!isTableInitialized) {
    let TableItem = null

    const isPreselected = optionItem.dataset.preselected ? true : false

    const defaultOptions = {
      id: data.id,
      isPreselected: isPreselected,
      preselectedTitle: $(optionItem).find('.configurator__option-selected__title').text(),
      preselectedId: isPreselected ? Number(optionItem.dataset.preselectedVariantId) : null,
      preselectedPrice: isPreselected ? Number(optionItem.dataset.preselectedVariantPrice) : null,
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
    TableItem.template.addClass(`configurator__table--position-${optionItemPosition}`)
    TableItem.showTable()

    tableStore.push(TableItem)
  } else {
    const CurrentTable = tableStore.filter(Table => Table.tableId === data.id)[0]

    if (CurrentTable.isVisible) {
      CurrentTable.template.removeClass(`configurator__table--position-${optionItemPosition}`)
      CurrentTable.hideTable()
    } else {
      CurrentTable.template.addClass(`configurator__table--position-${optionItemPosition}`)
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

const renderErrorMessage = (optionItem, optionItemPosition, errorMsg, errorText) => {
  const rowElement = $(optionItem).closest('.configurator__row')

  const message = $(oneLineTrim`<div 
      class="
        configurator__error-message 
        configurator__error-message--position-${optionItemPosition} 
        configurator__error-message__arrow 
        configurator__error-message__arrow--${getArrowDirection(optionItemPosition)}"
    >
      ${errorText}
    </div>`)
    
    message.appendTo(rowElement)

    errorMsg.push(message)
}

const removeErrorMessages = () => {
  errorMessages.map(errorMessage => errorMessage.remove())

  errorMessages.splice(0, 1)
}

const initConfigurator = () => {
  const cachedData = []

  setDefaultPriceOnLoad()

  $('.configurator__option').on('click', function() {
    const self = this
    const loader = $('<div class="configurator__option-loader"></div>')
    const type = $(this).attr('data-type') === TYPE_VARIANT
      ? TYPE_VARIANT
      : TYPE_ATTRIBUTE
    const optionData = {
      productId: parseInt($(self).attr('data-product-id')),
      optionId: type === TYPE_VARIANT
        ? $(self).attr('data-option-id')
        : parseInt($(self).attr('data-option-id'))
    }
    const TYPE_VARIANT_URL = '/api/product/get-price-variants/'
    const TYPE_ATTRIBUTE_URL = '/api/attribute/get-variants/'
    const URL = type === TYPE_VARIANT
      ? `${TYPE_VARIANT_URL}${optionData.productId}`
      : `${TYPE_ATTRIBUTE_URL}${optionData.optionId}`
    const dataExists = cachedData.filter(dataItem => dataItem.id === optionData.optionId)[0]

    if (dataExists) {
      removeErrorMessages()
      renderOptions(dataExists, self)
    } else {
      $(self).addClass('configurator__option--loading')
      loader.appendTo(self)

      $.ajax({
        method: 'GET',
        url: URL
      })
        .done(function(data) {
          loader.remove()
          removeErrorMessages()
          $(self).removeClass('configurator__option--loading')
          renderOptions(data, self)

          const shouldAddToPriceStorage = priceStorage.filter(item => item.optionId === optionData.optionId)[0]

          if (!shouldAddToPriceStorage) {
            addItemToPriceStorage({
              optionId: optionData.optionId,
              price: 0
            })
          }

          cachedData.push(data)
        })
        .fail(function() {
          removeErrorMessages()
          const optionItemPosition = getOptionItemPosition($('.configurator__option'), self)
          loader.remove()
          $(self).removeClass('configurator__option--loading')
          renderErrorMessage(self, optionItemPosition, errorMessages, ERROR_MESSAGE_UNEXPECTED_ERROR)
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

  window.onConfiguratorFormSubmit = function(requestSettings) {
    if (
      requestSettings.nette &&
      requestSettings.nette.form &&
      requestSettings.nette.form[0] &&
      requestSettings.nette.form[0].id === 'product-add-to-basket-form'
    ) {
      $('.configurator__errors-template').remove()

      let isValid = true

      const errorList = $('<ul/>')
      const errorTemplate = $('<div class="configurator__errors-template" />')
      const errorTemplateHeader = $('<h2>Pro vložení produktu do košíku musíte vybrat následující položky:</h2>')

      $('.configurator__option').each((index, item) => {
        if ($(item).attr('data-required') === 'true') {
        const itemId = $(item).attr('data-option-id')
        const inputValue = $(`${itemId === 'product-variant' ? '#product-variant-price-selection' : '#attribute-' + itemId}`).val()

        isValid = inputValue ? true : false

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
