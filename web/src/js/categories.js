import $ from 'jquery';

import getFilters from './listing-page/getFiltersFromUrl';
import activeFilters from './listing-page/activeFilters';
import initSortByFilters from './listing-page/sortByFilters';
import initCategoryFilters from './listing-page/categoryFilters';
import initCheckboxFilters from './listing-page/checkboxFilters';
import $ui from './externals/jquery-ui.min.js';

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

  initSortByFilters();
  initCheckboxFilters();
  initCategoryFilters();
})