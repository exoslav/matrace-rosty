import $ from 'jquery'
import mockData from './configurator-mock'
import Table from './Table'
import TableWithCategories from './TableWithCategories'

const tableStore = []

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

const renderOptionWrap = () => {
  return $('<div class="configurator__option-wrap" data-open="false" />')
}

const renderOptionLabel = (optionItem) => {
  const label = $(`<span class="configurator__option-label">${optionItem.title}</span>`)

  // label.on('click', () => handleOptionClick())

  return label
}

const renderOptionItem = (optionItem, row) => {
  const button = $(`
    <button type="button" href="#" class="configurator__option" data-initialized="false" data-open-table="false" data-option-id="${optionItem.id}">
      <span>Vyberte</span>
    </button>
  `)

  button.on('click', () => handleOptionClick(button, optionItem, row))

  return button
}

const renderConfigurator = data => {
  const block = $('<div class="configurator"><h2>Konfigurator</h2></div>')

  let configuratorRow = $('<div class="configurator__row" />')

  data.map((item, index) => {
    if (index % 2 === 0) {
      configuratorRow = $('<div class="configurator__row" />')
    }

    const optionWrap = renderOptionWrap()
    const optionItem = renderOptionItem(item, configuratorRow)
    const optionLabel = renderOptionLabel(item)

    optionWrap.appendTo(configuratorRow)
    optionLabel.appendTo(optionWrap)
    optionItem.appendTo(optionWrap)
    configuratorRow.appendTo(block)
  })

  block.appendTo($('.configurator-wrapper'))
}

const initConfigurator = () => {
  $('.product-detail__button').on('click', function() {
    const PRODUCT_DETAIL_CONFIGURATOR = 'some url'

    renderConfigurator(mockData)

    /*
    $.ajax({
      method: 'GET',
      url: PRODUCT_DETAIL_CONFIGURATOR,
      data: { productId: 123 }
    })
      .done(function(data) {
        renderConfigurator(data)
      })
      .fail(function() {
        alert( "error" );
      })
    */
  })
}

export default initConfigurator
