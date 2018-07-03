import $ from 'jquery'
import mockOptions1 from './configurator-option-1-mock'
import mockOptions2 from './configurator-option-2-mock'
import mockOptions3 from './configurator-option-3-mock'
import mockOptions4 from './configurator-option-4-mock'
import Table, { SIMPLE_TABLE } from './Table'
import TableWithCategories, { CATEGORIES_TABLE } from './TableWithCategories'
import { oneLineTrim } from 'common-tags';

const tableStore = []

const mockData = [
  mockOptions1,
  mockOptions2,
  mockOptions3,
  mockOptions4
]

let priceStorage = []

const TYPE_VARIANT = 'variant'
const TYPE_ATTRIBUTE = 'attribute'

const renderOptions = (data, optionItem) => {
  tableStore.map(Table => Table.tableId !== data.id ? Table.hideTable() : null)

  const isTableInitialized = tableStore.filter(Table => Table.tableId === data.id)[0]

  let optionItemPosition = 0

  $('.configurator__option').each((index, item) => {
    if (item === optionItem) {
      optionItemPosition = index + 1
    }
  })

  if (!isTableInitialized) {
    let TableItem = null

    const defaultOptions = {
      id: data.id,
      arrowDirection: optionItemPosition % 2 === 0
        ? 'right' : 'left'
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

const updateHiddenFormData = (inputId, value) => {
  $('.product-detail-hidden-form').find(`input[name='option-id-${inputId}']`).val(value)
}

const updateTotalPrice = (optionId, currentPrice) => {
  priceStorage = priceStorage.map((item) => {
    if (item.optionId === optionId) {
      return {
        ...item,
        price: currentPrice
      }
    }

    return { ...item }
  })

  const totalPrice = priceStorage.reduce((prev, curr) => {
    return {
      price: prev.price + curr.price
    }
  }, { price: 0 }).price

  $('.product-detail-total-price__value').text(totalPrice)
}

const setDefaultPriceOnLoad = () => {
  const elements = $('button[data-option-id]')

  elements.each(function() {
    if ($(this).attr('data-default-value')) {
      priceStorage.push({
        optionId: parseInt($(this).attr('data-option-id')),
        price: parseInt($(this).attr('data-default-value'))
      })
    }
  })
}

const initConfigurator = () => {
  const cachedData = []

  setDefaultPriceOnLoad()

  $('.configurator__option').on('click', function() {
    const self = this

    let itemIndex = 0

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

    const TYPE_VARIANT_URL = 'http://matrace.1sys.cz/api/product/get-price-variants/'
    const TYPE_ATTRIBUTE_URL = 'http://matrace.1sys.cz/api/attribute/get-variants/'
    const URL = type === TYPE_VARIANT
      ? `${TYPE_VARIANT_URL}${optionData.productId}`
      : `${TYPE_ATTRIBUTE_URL}${optionData.optionId}`

    let currentData = null
    const dataExists = cachedData.filter(dataItem => dataItem.id === optionData.optionId)[0]

    if (dataExists) {
      renderOptions(dataExists, self)
    } else {
      loader.appendTo(self)

      $.ajax({
        method: 'GET',
        url: URL
      })
        .done(function(data) {
          loader.remove()
          renderOptions(data, self)

          const shouldAddToPriceStorage = priceStorage.filter(item => item.optionId === optionData.optionId)[0]

          if (!shouldAddToPriceStorage) {
            priceStorage.push({
              optionId: optionData.optionId,
              price: 0
            })
          }

          cachedData.push(data)
        })
        .fail(function() {
          loader.remove()
          alert( "error" );
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
          ? 'configurator__option-selected__title--offset-left'
          : 'configurator__option-selected__title'}
      ">
        ${activeItem.title}
      </span>
      <span class="configurator__option-selected__price">+&nbsp;${activeItem.price}&nbsp;Kč</span>
    `)

    let value = ''
    if (Table.type === SIMPLE_TABLE) {
      value = `selectedItemId=${Table.getActiveItem().id}`
    } else if (Table.type === CATEGORIES_TABLE) {
      value = `selectedCategoryId=${Table.getActiveCategory().id}&selectedItemId=${Table.getActiveItem().id}`
    }

    const itemPrice = Table.getActiveItem().price !== null
      ? Table.getActiveItem().price
      : Table.getActiveCategory().defaultPrice

    updateHiddenFormData(Table.tableId, value)
    updateTotalPrice(Table.tableId, itemPrice)

    console.log(priceStorage)
  });
}

export default initConfigurator
