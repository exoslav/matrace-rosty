import { oneLineTrim } from 'common-tags';
import createTableItem from './createTableItem'
import { formatPrice } from './configurator-helpers'

export const SIMPLE_TABLE = 'SIMPLE_TABLE'

const Table = function({ items, id, arrowDirection, isPreselected, preselectedId, preselectedPrice, preselectedTitle }) {
  this.type = SIMPLE_TABLE
  this.isPreselected = isPreselected || false
  this.items = items || []
  this.activeItemId = preselectedId ? preselectedId : items.filter(item => item.selectedOnDefault)[0]
  this.tableId = id
  this.arrowDirection = arrowDirection || 'center'

  this.CLASSNAME_ACTIVE = 'configurator__item--active'

  this.template = $(`<div class="configurator__table configurator__table-id-${this.tableId}" />`)
  
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

  this.init = () => {
    this.renderBody()
    this.renderItems()
    this.template.addClass(`configurator__table-arrow configurator__table-arrow--${this.arrowDirection}`)
  }

  this.getActiveItem = () => {
    return this.items.filter(item => item.id === this.activeItemId)[0]
  }

  this.removeActiveClassFromItems = (items) => {
    $(items).closest('.configurator__item').removeClass(this.CLASSNAME_ACTIVE)
  }

  this.setActiveClassToItem = (item) => {
    $(item).closest('.configurator__item').addClass(this.CLASSNAME_ACTIVE)
  }

  this.handleItemClick = (e, item) => {
    this.activeItemId = item.id
    this.removeActiveClassFromItems($(`.configurator__table-id-${this.tableId} .${this.CLASSNAME_ACTIVE}`))
    this.setActiveClassToItem(e.target)

    $(window).trigger('tableWithCategories.handleItemClick', this)
  }

  this.renderItems = () => {
    this.items.map((item) => {
      const listItem = $(oneLineTrim
        `<li class="configurator__item ${item.id === this.activeItemId ? this.CLASSNAME_ACTIVE : ''}" />`
      )

      const imgElement = createTableItem(
        item.title,
        item.imgSrc,
        item.imgSrcPreview,
        this.tableId
      );

      const itemLink = $(oneLineTrim`
        <div class="configurator__item-link">
          ${imgElement}
          <div class="configurator__item-title">${item.title}</div>
          ${item.price ? '<span class="configurator__item-price">' + formatPrice(item.price) + '&nbspKč</span>' : ''}
          ${item.availability && item.availability.label ? '<span class="configurator__item-availability configurator__item-availability--' + item.availability.class.trim() + '">' + item.availability.label.trim() + '</span>' : ''}
          <div class="configurator__item__button-wrapper">
            <button class="configurator__item__button" type="button">Vyberte</button>
          </div>
        </div>
      `)

      itemLink
        .appendTo(listItem)
        .find('.configurator__item__button')
        .on('click', e => {
          this.handleItemClick(e, item);
          this.hideTable();
        });

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
}

export default Table
