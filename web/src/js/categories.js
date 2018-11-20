import $ from 'jquery';

import $ui from './externals/jquery-ui.min.js';
import initSortByFilters from './listing-page/sortByFilters';
import initCategoryFilters from './listing-page/categoryFilters';
import initCheckboxFilters from './listing-page/checkboxFilters';

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

  $('#snippet-productsList-products-filter, #snippet-productsList-products')
    .wrapAll('<div class="products-listing-wrapper" />');

  initSortByFilters();
  initCheckboxFilters();
  initCategoryFilters();
})