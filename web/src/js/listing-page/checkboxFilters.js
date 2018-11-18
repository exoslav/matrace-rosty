import $ from 'jquery';
import queryString from 'query-string';

import getProducts from './getProducts';
import { activeFilters, addCheckboxFilter, removeCheckboxFilter } from './activeFilters';

const initCheckboxFilters = () => {
  const checkboxFilters = $('.filters__checkbox-filters .checkbox__element');

  activeFilters.checkboxFilters
    .map(f => $(`[data-filter-value="${f.value}"]`).prop('checked', f.active));

  checkboxFilters.on('change', function() {
    const currentValue = $(this).attr('data-filter-value');
    const active = !!activeFilters.checkboxFilters.find(i => i.value === currentValue);
    const oldCheckboxFilters = {...activeFilters.checkboxFilters};

    if (active) {
      removeCheckboxFilter(currentValue);
    } else {
      addCheckboxFilter(currentValue, true);
    }

    const onGetProductsError = () => {
      if (active) {
        $(this).prop('checked', true);
        addCheckboxFilter(currentValue, true);
      } else {
        $(this).prop('checked', false);
        removeCheckboxFilter(currentValue);
      }
    }

    getProducts(() => {}, onGetProductsError);
  });
}

export default initCheckboxFilters;
