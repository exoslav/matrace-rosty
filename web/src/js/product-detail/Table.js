import $ from 'jquery'
import { oneLineTrim } from 'common-tags';

export const SIMPLE_TABLE = 'SIMPLE_TABLE'

const Table = function({ items, id, arrowDirection }) {
  this.type = SIMPLE_TABLE
  this.items = items || []
  this.activeItemId = items.filter(item => item.selectedOnDefault)[0]
  this.tableId = id
  this.arrowDirection = arrowDirection || 'center'

  this.template = $('<div class="configurator__table" />')
  
  this.isVisible = false;

  this.showTable = () => {
    this.template.show()
    this.template.addClass('configurator__table--visible')
    this.isVisible = true
  }

  this.hideTable = () => {
    this.template.hide()
    this.template.removeClass('configurator__table--visible')
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
    this.template.addClass(`configurator__table-arrow configurator__table-arrow--${this.arrowDirection}`)
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
    this.updateSelected(item)

    $(window).trigger('tableWithCategories.handleItemClick', this)
  }

  this.renderItems = () => {
    this.items.map((item) => {
      const listItem = $(oneLineTrim
        `<li class="configurator__item ${item.id === this.activeItemId ? 'configurator__item--active' : ''}" />`
      )

      const imgElement = item.imgSrc
        ? oneLineTrim`
          <div class="configurator__item-img-wrap">
            <img class="configurator__item-img" src="${item.imgSrc}" alt="${item.title}" />
          </div>
         `
        : ''

      const itemLink = $(oneLineTrim`
        <a class="configurator__item-link" href="#">
          ${imgElement}
          <div class="configurator__item-title">${item.title}</div>
          ${item.price ? '<span class="configurator__item-price">' + item.price + '&nbspKč</span>' : ''}
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
