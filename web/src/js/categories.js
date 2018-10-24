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

        console.log(minField)

        minField.html(`${minVal} Kč`)
        maxField.html(`${maxVal} Kč`)
      }
    })
  }

  initSlider();

  const filterSelect = $('#categories-filters')

  filterSelect.on('change', function() {
    const val = $(this).val()
    const cateogryLists = $('.filters__category')

    if (val === 'default') {
      cateogryLists.hide()
      $('.filters__select-category-filter__select-wrapper').removeClass('filters__select-category-filter__select-wrapper--open')

      return
    }

    cateogryLists.hide()

    $('.filters__select-category-filter__select-wrapper').addClass('filters__select-category-filter__select-wrapper--open')
    $(`.filters__category--${val}`).show()

  })

  $('.filters__close-category').on('click', () => {
    filterSelect.val('default')
    $('.filters__category').hide()
    $('.filters__select-category-filter__select-wrapper').removeClass('filters__select-category-filter__select-wrapper--open')
  })
})