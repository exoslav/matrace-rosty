import { formatPrice } from './configurator-helpers'

export const CATEGORIES_TABLE = 'CATEGORIES_TABLE'

const TableWithCategories = function({ categories, id, arrowDirection }) {
  this.type = CATEGORIES_TABLE
  this.categories = categories || []
  this.activeCategory = 0
  this.activeItemId = null
  this.tableId = id
  this.arrowDirection = arrowDirection || 'center'

  this.CATEGORY_CLASSNAME_ACTIVE = 'configurator__category-link--active'
  this.ITEM_CLASSNAME_ACTIVE = 'configurator__item--active'

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

  this.getActiveCategory = () => {
    return this.categories[this.activeCategory]
  }

  this.getActiveItem = () => {
    return this.getActiveCategory().items.filter(item => this.activeItemId === item.id)[0]
  }

  this.attachEvents = () => {
    this.template.find('.configurator__submit').on('click', () => {
      this.hideTable()
    })
  }

  this.init = () => {
    this.renderBody()
    this.renderItems()
    this.renderCategories()
    this.renderFooter()
    this.template.addClass(`configurator__table-arrow configurator__table-arrow--${this.arrowDirection}`)
    this.attachEvents()
  }

  this.updateSelected = (selectedItem) => {
    this.template.find('.configurator__selected-item').html(`
      <img class="configurator__selected-item-image" src="${selectedItem.imgSrc}" alt="${selectedItem.title}" />
      <span class="configurator__selected-item-title">${selectedItem.title}</span>
    `)

    this.template.find('.configurator__selected-price').html(`+&nbsp;${formatPrice(this.getActiveItem().price)}&nbsp;Kč`)
  }

  this.handleCategoryClick = (e, categoryIndex) => {
    e.preventDefault()

    this.activeCategory = categoryIndex

    this.template.find('.configurator__items').empty()
    this.template.find('.configurator__categories').empty()

    this.renderCategories()
    this.renderItems()
  }

  this.removeActiveClassFromItems = (items) => {
    $(items).removeClass(this.ITEM_CLASSNAME_ACTIVE)
  }

  this.setActiveClassToItem = (item) => {
    $(item).closest('.configurator__item').addClass(this.ITEM_CLASSNAME_ACTIVE)
  }

  this.handleItemClick = (e, item) => {
    e.preventDefault()

    this.activeItemId = item.id
    this.updateSelected(item)

    this.removeActiveClassFromItems($(`.configurator__table-id-${this.tableId} .configurator__items .${this.ITEM_CLASSNAME_ACTIVE}`))
    this.setActiveClassToItem(e.target)

    $(window).trigger('tableWithCategories.handleItemClick', this)
  }

  this.renderCategories = () => {
    this.categories.map((category, index) => {
      const isActiveCategory = index === this.activeCategory

      const categoryItem = $(`<li class="configurator__category" />`)
      const categoryLink = $(`<a class="configurator__category-link ${isActiveCategory ? this.CATEGORY_CLASSNAME_ACTIVE : ''}" href="#">${category.name}</a>`)
        .on('click', (e) => this.handleCategoryClick(e, index))

      categoryLink.appendTo(categoryItem)
      categoryItem
        .appendTo(this.template.find('.configurator__categories'))
    })
  }

  this.renderItems = () => {
    const items = this.categories[this.activeCategory].items

    items.map((item) => {
      const listItem = $(`<li class="configurator__item ${item.id === this.activeItemId ? this.ITEM_CLASSNAME_ACTIVE : ''}" />`)

      const itemLink = $(`
        <a class="configurator__item-link" href="#">
          <div class="configurator__item-img-wrap">
            <img class="configurator__item-img" src="${item.imgSrc}" alt="${item.title}" />
          </div>
          <div class="configurator__item-title">${item.title}</div>
          ${item.price ? '<div class="configurator__item-price">' + formatPrice(item.price) + '&nbsp;Kč</div>' : ''}
          ${item.availability && item.availability.label ? '<span class="configurator__item-availability configurator__item-availability--' + item.availability.class.trim() + '">' + item.availability.label.trim() + '</span>' : ''}
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
      <ul class="configurator__categories"></ul>
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

export default TableWithCategories
