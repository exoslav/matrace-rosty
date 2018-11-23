import $ from 'jquery';
import queryString from 'query-string';

import { SORT_BY_FILTERS_KEY } from './sortByFilters';
import { CATEGORY_FILTERS_KEY } from './categoryFilters';
import addQueryString from '../utils/addQueryString';

import getProducts from './getProducts';

const initCheckboxFilters = () => {
  const initialFilters = getInitialFilters();
  const checkboxFilters = $('.filters__checkbox-filters .checkbox__element');

  initialFilters
    .map(f => $(`[data-filter-value="${f}"]`).prop('checked', true));

  checkboxFilters.on('change', function() {
    const activeFilters = getInitialFilters();
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

function getInitialFilters() {
  const checkboxFilters = [];
  const filters = queryString.parse(location.search);

  Object.keys(filters).forEach((key) => {
    const queryStringValue = filters[key];

    if (
      (
        filters[key] !== SORT_BY_FILTERS_KEY ||
        filters[key] !== CATEGORY_FILTERS_KEY
      ) && queryStringValue === '1'
    ) {
      checkboxFilters.push(key);
    }
  });

  return checkboxFilters;
}

function addFilterValueToQueryString(key, val) {
  const newQueryString = queryString.stringify({
    ...queryString.parse(location.search),
    [key]: val
  });

  addQueryString(newQueryString);
}

export default initCheckboxFilters;
