import $ from 'jquery'

const TableWithCategories = function({ categories, id, row, button }) {
  this.categories = categories || []
  this.activeCategory = 1
  this.activeItem = null
  this.tableId = id

  this.template = $('<div class="configurator__table" />')
  
  this.showTable = () => {
    this.template.show()
  }

  this.hideTable = () => {
    this.template.hide()
  }

  this.getTableId = () => {
    return this.tableId
  }

  this.getActiveCategory = () => {
    return this.categories.filter(category => category.id === this.activeCategory)[0]
  }

  this.attachEvents = () => {
    this.template.find('.configurator__submit').on('click', () => {
      button.attr('data-open-table', 'false')
      this.hideTable()
    })
  }

  this.init = () => {
    this.renderBody()
    this.renderItems()
    this.renderCategories()
    this.renderFooter()

    this.attachEvents()

    this.template.appendTo(row)

    console.log(this)
  }

  this.getActiveItem = () => {
    return this.items.filter(item => item.id === this.activeItem)[0]
  }

  this.updateSelected = (selectedItem) => {
    this.template.find('.configurator__selected-item').html(`
      <img class="configurator__selected-item-image" src="${selectedItem.imgSrc}" alt="${selectedItem.title}" />
      <span class="configurator__selected-item-title">${selectedItem.title}</span>
    `)

    this.template.find('.configurator__selected-price').html(`+&nbsp;${this.getActiveCategory().categoryPrice}&nbsp;Kč`)
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

    this.activeItem = item.id

    button.html(`
      <img class="configurator__option-selected__img" src="${item.imgSrc}" alt="${item.title}" />
      <span class="configurator__option-selected__title">${item.title}</span>
      <span class="configurator__option-selected__price">+&nbsp;${this.getActiveCategory().categoryPrice}&nbsp;Kč</span>
    `)

    this.updateSelected(item)
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
      const listItem = $(`<li class="configurator__item ${item.id === this.activeItem ? 'configurator__item--active' : ''}" />`)

      const itemLink = $(`
        <a class="configurator__item-link" href="#">
          <div class="configurator__item-img-wrap">
            <img class="configurator__item-img" src="${item.imgSrc}" alt="${item.title}" />
          </div>
          <div class="configurator__item-title">${item.title}</div>
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
