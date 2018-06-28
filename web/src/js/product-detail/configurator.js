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

/*
const handleOptionClick = (self, optionItem, row) => {
  tableStore.map(Table => Table.hideTable())

  $('.configurator__option').each((index, item) => {
    if (parseInt($(item).attr('data-option-id')) !== optionItem.id) {
      $(item).attr('data-open-table', 'false')
    }
  })

  if (self.attr('data-initialized') === 'false') {
    self.attr('data-initialized', 'true')

    if (optionItem.hasCategories) {
      const button = self
      const { categories, id } = optionItem
      const tableOpts = { categories, id, row, button }

      const TableItem = new TableWithCategories(tableOpts)

      TableItem.init()

      tableStore.push(TableItem)
    } else {
      const button = self
      const { items, id } = optionItem
      const tableOpts = { items, id, row, button }

      const TableItem = new Table(tableOpts)

      TableItem.init()

      tableStore.push(TableItem)
    }

  }

  const currentTable = tableStore.filter(table => {
    console.log(table, table.getTableId(), optionItem.id)
    return table.getTableId() === optionItem.id
  })[0]

  if (self.attr('data-open-table') === 'false') {
    self.attr('data-open-table', 'true')
    currentTable.showTable()
  } else {
    self.attr('data-open-table', 'false')
    currentTable.hideTable()
  }
}
*/

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

const initConfigurator = () => {
  const cachedData = []

  $('.configurator__option').on('click', function() {
    const self = this
    const PRODUCT_DETAIL_CONFIGURATOR = 'url'
    const optionData = {
      productId: parseInt($(self).attr('data-product-id')),
      optionId: parseInt($(self).attr('data-option-id'))
    }

    let currentData = null
    const dataExists = cachedData.filter(dataItem => dataItem.id === optionData.optionId)[0]

    if (dataExists) {
      /*
      $.ajax({
        method: 'GET',
        url: PRODUCT_DETAIL_CONFIGURATOR,
        data: {
          productId: optionData.productId,
          optionId: optionData.optionId
        }
      })
        .done(function(data) {
          renderOptions(data, self)
        })
        .fail(function() {
          alert( "error" );
        })
      */
      currentData = dataExists
    } else {
      currentData = mockData.filter(mockedDataItem => mockedDataItem.id === optionData.optionId)[0]
    }

    renderOptions(currentData, self)
  })

  $(window).on('tableWithCategories.handleItemClick', function (e, Table) {
    let value = ''
    if (Table.type === SIMPLE_TABLE) {
      value = `optionId=${Table.getActiveItem().id}`
    } else if (Table.type === CATEGORIES_TABLE) {
      value = `category=${Table.getActiveCategory().id}&optionId=${Table.getActiveItem().id}`
    }
    
    $('.product-detail-hidden-form').find(`input[name='option-id-${Table.tableId}']`).val(value)
  });

}

export default initConfigurator
