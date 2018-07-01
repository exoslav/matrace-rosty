import $ from 'jquery'
import mockOptions1 from './configurator-option-1-mock'
import mockOptions2 from './configurator-option-2-mock'
import mockOptions3 from './configurator-option-3-mock'
import mockOptions4 from './configurator-option-4-mock'
import Table, { SIMPLE_TABLE } from './Table'
import TableWithCategories, { CATEGORIES_TABLE } from './TableWithCategories'

const tableStore = []

const mockData = [
  mockOptions1,
  mockOptions2,
  mockOptions3,
  mockOptions4
]

let priceStorage = []

const renderOptions = (data, clickedEl) => {
  tableStore.map(Table => Table.tableId !== data.id ? Table.hideTable() : null)

  const isTableInitialized = tableStore.filter(Table => Table.tableId === data.id)[0]

  if (!isTableInitialized) {
    let TableItem = null

    if (data.categories) {
      const tableOpts = {
        id: data.id,
        categories: data.categories,
        row: null,
        button: $(clickedEl)
      }

      TableItem = new TableWithCategories(tableOpts)
    } else {
      const tableOpts = {
        id: data.id,
        items: data.items,
        button: $(clickedEl)
      }

      TableItem = new Table(tableOpts)
    }

    TableItem.init()
    TableItem.template.appendTo($(clickedEl).closest('.configurator__row'))
    TableItem.showTable()

    tableStore.push(TableItem)
  } else {
    const CurrentTable = tableStore.filter(Table => Table.tableId === data.id)[0]

    CurrentTable.isVisible
      ? CurrentTable.hideTable()
      : CurrentTable.showTable()
    
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

  console.log(priceStorage)

  $('.configurator__option').on('click', function() {
    const self = this
    const PRODUCT_DETAIL_CONFIGURATOR = 'http://matrace.1sys.cz/api/attribute/get-variants/'
    const optionData = {
      productId: parseInt($(self).attr('data-product-id')),
      optionId: parseInt($(self).attr('data-option-id'))
    }

    let currentData = null
    const dataExists = cachedData.filter(dataItem => dataItem.id === optionData.optionId)[0]

    if (dataExists) {
      renderOptions(dataExists, self)
    } else {
      $.ajax({
        method: 'GET',
        url: `${PRODUCT_DETAIL_CONFIGURATOR}${optionData.optionId}`
      })
        .done(function(data) {
          const parsedData = JSON.parse(data)
          renderOptions(parsedData, self)
        })
        .fail(function() {
          alert( "error" );
        })

      const shouldAddToPriceStorage = priceStorage.filter(item => item.optionId === optionData.optionId)[0]

      if (!shouldAddToPriceStorage) {
        priceStorage.push({
          optionId: optionData.optionId,
          price: 0
        })
      }

      currentData = mockData.filter(mockedDataItem => mockedDataItem.id === optionData.optionId)[0]

      cachedData.push(currentData)
    }
  })

  $(window).on('tableWithCategories.handleItemClick', function (e, Table) {
    let value = ''
    if (Table.type === SIMPLE_TABLE) {
      value = `selectedItemId=${Table.getActiveItem().id}`
    } else if (Table.type === CATEGORIES_TABLE) {
      value = `selectedCategoryId=${Table.getActiveCategory().id}&selectedItemId=${Table.getActiveItem().id}`
    }

    const itemPrice = Table.getActiveItem().price
      ? Table.getActiveItem().price
      : Table.getActiveCategory().defaultPrice

    updateHiddenFormData(Table.tableId, value)
    updateTotalPrice(Table.tableId, itemPrice)

    console.log(priceStorage)
  });
}

export default initConfigurator
