import $ from 'jquery';
import queryString from 'query-string';

import { SORT_BY_FILTERS_KEY } from './sortByFilters';
import { CATEGORY_FILTERS_KEY } from './categoryFilters';
import addQueryString from '../../utils/addQueryString';

import getProducts from '../getProducts';

/*
- checkBoxFilters are filters with checkbox only
- their value should be always "1"
- now there are only two checkBoxFilters on listing page: akcni, dostupne
*/

export const setValuesToCheckboxFilters = (filters, val) => {
  filters.map(f => $(`[data-filter-value="${f}"]`).prop('checked', val));
}

export const getCheckboxFilters = () => {
  const checkboxFilters = [];
  const filters = queryString.parse(location.search);

  Object.keys(filters).forEach((key) => {
    const queryStringValue = filters[key];

    if (
        queryStringValue === '1' &&
        queryStringValue !== SORT_BY_FILTERS_KEY &&
        queryStringValue !== CATEGORY_FILTERS_KEY
    ) {
      checkboxFilters.push(key);
    }
  });

  return checkboxFilters;
}

const initCheckboxFilters = () => {
  const checkboxFilters = $('.filters__checkbox-filters .checkbox__element');

  setValuesToCheckboxFilters(getCheckboxFilters(), true);

  checkboxFilters.on('change', function() {
    const activeFilters = getCheckboxFilters();
    const currentValue = $(this).attr('data-filter-value');
    const active = !!activeFilters.find(i => i === currentValue);


    if (active) {
      addFilterValueToQueryString(currentValue, undefined);
    } else {
      addFilterValueToQueryString(currentValue, 1);
    }

    const onGetProductsError = () => {
      if (active) {
        $(this).prop('checked', true);
        addFilterValueToQueryString(currentValue, 1);
      } else {
        $(this).prop('checked', false);
        addFilterValueToQueryString(currentValue, undefined);
      }
    }

    getProducts(
      queryString.parse(location.search),
      () => {},
      onGetProductsError
    );
  });
}

function addFilterValueToQueryString(key, val) {
  const newQueryString = queryString.stringify({
    ...queryString.parse(location.search),
    [key]: val
  });

  addQueryString(newQueryString);
}

export default initCheckboxFilters;