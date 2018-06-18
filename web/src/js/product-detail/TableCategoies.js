TableCategoiesimport $ from 'jquery'

const Table = function(categories, row, button, optionId) {
  this.categories = categories || []
  this.activeCategory = 1
  this.activeItem = null
  this.open = false
  this.tableId = optionId

  this.template = $('<div class="configurator__table" />')
  this.categoriesList = $('<ul class="configurator__categories" />')
  this.itemsList = $('<ul class="configurator__items" />')
  this.footer = $('<div class="configurator__footer" />')
  this.submit = $('<button class="configurator__submit" type="button">Potvrdit</button>')
  this.selectedBlock = $('<div class="configurator__selected-block"><span>Vybráno:</span></div>')
  this.selectedItem = $('<div class="configurator__selected-item" />')
  this.totalPrice = $('<div class="configurator__total-price" />')
  this.tableBody = $('<div class="configurator__table-body" />')

  this.showTable = () => {
    this.template.show()
  }

  this.hideTable = () => {
    this.template.hide()
  }

  this.getTableId = () => {
    return this.tableId
  }

  this.init = () => {
    this.tableBody.appendTo(this.template)
    this.selectedItem.appendTo(this.selectedBlock)
    this.submit.appendTo(this.footer)
    this.submit.on('click', () => this.hideTable())
    this.renderCategories()
    this.renderItems()
    this.renderFooter()

    this.template.appendTo(row)
  }

  this.getActiveCategory = () => {
    return this.categories.filter(category => category.id === this.activeCategory)[0]
  }

  this.getActiveItem = () => {
    return this.getActiveCategory().items.filter(item => item.id === this.activeItem)[0]
  }

  this.updateSelected = (selectedItem) => {
    this.selectedItem.html(`
      <img class="configurator__selected-item-image" src="${selectedItem.imgSrc}" alt="${selectedItem.title}" />
      <span class="configurator__selected-item-title">${selectedItem.title}</span>
    `)
  }

  this.handleCategoryClick = (e, categoryId) => {
    e.preventDefault()

    this.activeCategory = categoryId

    this.categoriesList.empty()
    this.itemsList.empty()

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

      const categoryListIem = $(`<li class="configurator__category" />`)
      const categoryLink = $(`<a class="configurator__category-link ${isActiveCategory ? 'configurator__category-link--active' : ''}" href="#">${category.categoryTitle}</a>`)
        .on('click', (e) => this.handleCategoryClick(e, category.id))

      categoryLink.appendTo(categoryListIem)
      categoryListIem.appendTo(this.categoriesList)

      this.categoriesList.appendTo(this.tableBody)
    })
  }

  this.renderItems = () => {
    const items = this.categories.filter(category => category.id === this.activeCategory)[0].items

    items.map((item) => {
      const isActiveItem = item.id === this.activeItem

      const listItem = $(`<li class="configurator__item ${isActiveItem ? 'configurator__item--active' : ''}" />`)
      const listItemLink = $(`
        <a class="configurator__item-link" href="#">
          <img class="configurator__item-img" src="${item.imgSrc}" alt="${item.title}" />
          <span>${item.title}</span>
        </a>`)
        .on('click', (e) => this.handleItemClick(e, item))

      listItemLink.appendTo(listItem)
      listItem.appendTo(this.itemsList)

      this.itemsList.appendTo(this.tableBody)
    })
  }

  this.renderFooter = () => {
    const item = this.activeItem ? this.getActiveItem() : null

    if (item) {
      this.updateSelected()
    }

    this.selectedBlock.prependTo(this.footer)

    this.footer.appendTo(this.template)
  }
}

export default Table
