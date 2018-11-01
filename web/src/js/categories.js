import $ from 'jquery'
import $ui from './externals/jquery-ui.min.js'

$(document).ready(function() {
  const initSlider = () => {
    const defaultMinValue = 234
    const defaultMaxValue = 987
    const minField = $('.filters__range-min')
    const maxField = $('.filters__range-max')

    minField.html(`${defaultMinValue} Kč`)
    maxField.html(`${defaultMaxValue}  Kč`)

    $('.filters__range-element').slider({
      range: true,
      min: defaultMinValue,
      max: defaultMaxValue,
      step: 81,
      values: [defaultMinValue, defaultMaxValue],
      slide: function( event, ui ) {
        const { values } = ui
        const minVal = values[0]
        const maxVal = values[1]

        minField.html(`${minVal} Kč`)
        maxField.html(`${maxVal} Kč`)
      }
    })
  }

  initSlider();

  const activeFilters = []

  window.categoryFilterSelection = () => {
    const DEFAULT_FILTER_VALUE = 'default'
    let currentFilterCategory = DEFAULT_FILTER_VALUE;
    const filterSelect = $('#categories-filters')
    const filterWrapper = $('.filters__select-category-filter__select-wrapper')
    const categoryLists = $('.filters__category')
    const closeButton = $('.filters__close-category')

    filterSelect.on('change', filteringLogicFuntion)

    filteringLogicFuntion()
    handleOnClose()
    handleFilterItemChange()

    function filteringLogicFuntion() {
      showHideActiveFilters()
      
      currentFilterCategory = filterSelect.val()

      if (currentFilterCategory === DEFAULT_FILTER_VALUE) {
        categoryLists.hide()
        filterWrapper.removeClass('filters__select-category-filter__select-wrapper--open')

        return
      }

      categoryLists.hide()

      filterWrapper.addClass('filters__select-category-filter__select-wrapper--open')
      $(`.filters__category--${currentFilterCategory}`).show()
    }

    function handleOnClose() {
      closeButton.on('click', () => {
        filterSelect.val(DEFAULT_FILTER_VALUE)
        categoryLists.hide()
        filterWrapper.removeClass('filters__select-category-filter__select-wrapper--open')
      })
    }

    function handleFilterItemChange() {
      $('.filters__category .filters__category__item input[type=checkbox]').on('change', function() {
        const filterName = $(this).attr('data-label') || $(this).attr('name')
        const active = activeFilters.find(i => i === filterName) || false

        if (active) {
          removeActiveFilter(filterName)
        } else {
          activeFilters.push(filterName)
        }

        emptyActiveFilters()
        renderActiveFilters()

        showHideActiveFilters()
      })
    }

    function removeActiveFilter(filterName) {
      const itemIndex = activeFilters.indexOf(filterName)
      activeFilters.splice(itemIndex, 1)
    }

    function emptyActiveFilters() {
      $('.filters__active-filters__list-wrapper').empty()
    }

    function renderActiveFilters() {
      const content = $('<ul/>', { class: 'filters__active-filters__list' })

      for (let i = 0; i < activeFilters.length; i++) {
        const listItem = $('<li class="filters__active-filters__item" />')

        $(`
          <button type="button" class="filters__active-filters__button" data-label="${activeFilters[i]}">
            <span class="filters__active-filters__text">${activeFilters[i]}</span>
            <i class="icon icon-cancel"></i>
          </button>
        `)
        .on('click', function() {
          const label = $(this).attr('data-label')

          removeActiveFilter(label)
          emptyActiveFilters()
          renderActiveFilters()

          $(`.filters__category`).find(`input[data-label="${label}"]`).prop('checked', false)

          showHideActiveFilters()
        })
        .appendTo(listItem)

        listItem.appendTo(content)
      }

      $(content).appendTo($('.filters__active-filters__list-wrapper'))
    }

    function showHideActiveFilters() {
      const filtersElement = $('.filters__active-filters')

      if (activeFilters.length > 0) {
        filtersElement.removeClass('filters__active-filters--hidden')
      } else {
        filtersElement.addClass('filters__active-filters--hidden')
      }
    }
  }

  window.categoryFilterSelection();
})