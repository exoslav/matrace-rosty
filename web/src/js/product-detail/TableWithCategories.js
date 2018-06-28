import $ from 'jquery'

export const CATEGORIES_TABLE = 'CATEGORIES_TABLE'

const TableWithCategories = function({ categories, id, button }) {
  this.type = CATEGORIES_TABLE
  this.categories = categories || []
  this.activeCategory = 1
  this.activeItemId = null
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

  this.getActiveCategory = () => {
    return this.categories.filter(category => category.id === this.activeCategory)[0]
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

    this.attachEvents()
  }

  this.updateSelected = (selectedItem) => {
    this.template.find('.configurator__selected-item').html(`
      <img class="configurator__selected-item-image" src="${selectedItem.imgSrc}" alt="${selectedItem.title}" />
      <span class="configurator__selected-item-title">${selectedItem.title}</span>
    `)

    this.template.find('.configurator__selected-price').html(`+&nbsp;${this.getActiveItem().price ? this.getActiveItem().price : this.getActiveCategory().defaultPrice}&nbsp;Kč`)
  }

  this.handleCategoryClick = (e, categoryId) => {
    e.preventDefault()

    this.activeCategory = categoryId

    this.template.find('.configurator__items').empty()
    this.template.find('.configurator__categories').empty()

    this.renderCategories()
    this.renderItems()
  }

  this.handleItemClick = (e, item) => {
    e.preventDefault()

    this.activeItemId = item.id

    button.html(`
      <img class="configurator__option-selected__img" src="${item.imgSrc}" alt="${item.title}" />
      <span class="configurator__option-selected__title">${item.title}</span>
      <span class="configurator__option-selected__price">+&nbsp;${this.getActiveItem().price ? this.getActiveItem().price : this.getActiveCategory().defaultPrice}&nbsp;Kč</span>
    `)

    this.updateSelected(item)

    $(window).trigger('tableWithCategories.handleItemClick', this)
  }

  this.renderCategories = () => {
    this.categories.map((category) => {
      const isActiveCategory = category.id === this.activeCategory

      const categoryItem = $(`<li class="configurator__category" />`)
      const categoryLink = $(`<a class="configurator__category-link ${isActiveCategory ? 'configurator__category-link--active' : ''}" href="#">${category.categoryTitle}</a>`)
        .on('click', (e) => this.handleCategoryClick(e, category.id))

      categoryLink.appendTo(categoryItem)
      categoryItem
        .appendTo(this.template.find('.configurator__categories'))
    })
  }

  this.renderItems = () => {
    const items = this.categories.filter(category => category.id === this.activeCategory)[0].items

    items.map((item) => {
      const listItem = $(`<li class="configurator__item ${item.id === this.activeItemId ? 'configurator__item--active' : ''}" />`)

      const itemLink = $(`
        <a class="configurator__item-link" href="#">
          <div class="configurator__item-img-wrap">
            <img class="configurator__item-img" src="${item.imgSrc}" alt="${item.title}" />
          </div>
          <div class="configurator__item-title">${item.title}</div>
          ${item.price ? '<div class="configurator__item-price">' + item.price + '&nbsp;Kč</div>' : ''}
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
