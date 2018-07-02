import $ from 'jquery'

export const SIMPLE_TABLE = 'SIMPLE_TABLE'

const Table = function({ items, id, button }) {
  this.type = SIMPLE_TABLE
  this.items = items || []
  this.activeItemId = items.filter(item => item.selectedOnDefault)[0]
  this.tableId = id

  this.template = $('<div class="configurator__table" />')
  
  this.isVisible = false;

  this.showTable = () => {
    this.template.show()
    this.isVisible = true
  }

  this.hideTable = () => {
    this.template.hide()
    this.isVisible = false
  }

  this.attachEvents = () => {
    this.template.find('.configurator__submit').on('click', () => {
      this.hideTable()
    })
  }

  this.init = () => {
    this.renderBody()
    this.renderItems()
    this.renderFooter()

    this.attachEvents()
  }

  this.getActiveItem = () => {
    return this.items.filter(item => item.id === this.activeItemId)[0]
  }

  this.updateSelected = (selectedItem) => {
    const imgElement = selectedItem.imgSrc
      ? `<img class="configurator__selected-item-image" src="${selectedItem.imgSrc}" alt="${selectedItem.title}" />`
      : ''

    this.template.find('.configurator__selected-item').html(`
      ${imgElement}
      <span class="configurator__selected-item-title">${selectedItem.title}</span>
    `)

    this.template.find('.configurator__selected-price').html(`+&nbsp;${selectedItem.price}&nbsp;Kč`)
  }

  this.handleItemClick = (e, item) => {
    e.preventDefault()

    this.activeItemId = item.id

    const imgElement = item.imgSrc
      ? `<img class="configurator__option-selected__img" src="${item.imgSrc}" alt="${item.title}" />`
      : ''

    button.html(`
      ${imgElement}
      <span class="configurator__option-selected__title">${item.title}</span>
      <span class="configurator__option-selected__price">+&nbsp;${item.price}&nbsp;Kč</span>
    `)

    this.updateSelected(item)

    $(window).trigger('tableWithCategories.handleItemClick', this)
  }

  this.renderItems = () => {
    this.items.map((item) => {
      const listItem = $(`<li class="configurator__item ${item.id === this.activeItemId ? 'configurator__item--active' : ''}" />`)

      const imgElement = item.imgSrc
        ? `
          <div class="configurator__item-img-wrap">
            <img class="configurator__item-img" src="${item.imgSrc}" alt="${item.title}" />
          </div>
         `
        : ''

      const itemLink = $(`
        <a class="configurator__item-link" href="#">
          ${imgElement}
          <div class="configurator__item-title">${item.title}</div>
          <span class="configurator__item-price">${item.price}&nbspKč</span>
        </a>
      `)

      itemLink
        .appendTo(listItem)
        .on('click', e => this.handleItemClick(e, item))

      listItem
        .appendTo(this.template.find('.configurator__items'))
      
    })
  }

  this.renderBody = () => {
    $(this.bodyTemplate).appendTo(this.template)
  }

  this.renderFooter = () => {
    $(this.footerTemplate).appendTo(this.template)
  }

  this.bodyTemplate = `
    <div class="configurator__table-body">
      <ul class="configurator__items"></ul>
    </div>
  `

  this.footerTemplate = `
    <div class="configurator__footer">
      <div class="configurator__selected-block">
        <span>Vybráno:</span>
        <div class="configurator__selected-item"></div>
      </div>
      <span class="configurator__selected-price"></span>
      <button class="configurator__submit" type="button">Potvrdit</button>
    </div>
  `
}

export default Table
