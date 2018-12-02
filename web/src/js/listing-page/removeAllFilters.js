import $ from 'jquery';
import queryString from 'query-string';

import getProducts from './getProducts';
import addQueryString from '../utils/addQueryString'
import { SORT_BY_FILTERS_KEY } from './sortByFilters';
import { getSortByFilter, setValueToSortByFilter  } from './sortByFilters';
import { getCheckboxFilters, setValuesToCheckboxFilters } from './checkboxFilters';
import { deactivateCategoryFilters, hideActiveFilters, emptyActiveFiltersElement } from './categoryFilters';

export const CATEGORY_FILTERS_KEY = 'filtersValues';

const initRemoveAllFilters = () => {
  $('<a href="#" class="filters_remove-all-filters">Zrusit filtry</a>').appendTo('.filters__wrapper');

  const element = $('.filters_remove-all-filters');

  element.on('click', function(e) {
    e.preventDefault();

    // reset all filters
    setValuesToCheckboxFilters(getCheckboxFilters(), false);
    setValueToSortByFilter(getSortByFilter(), false);
    deactivateCategoryFilters();
    emptyActiveFiltersElement();
    hideActiveFilters();

    removeAllFromQueryString();
    getProducts(queryString.parse(location.search));
  })
}

export const showHideRemoveAllFiltersElement = () => {
  const el = $('.filters_remove-all-filters');

  if (isSomeFilterActive()) {
    el.addClass('filters_remove-all-filters--visible');
  } else {
    el.removeClass('filters_remove-all-filters--visible');
  }
}

function isSomeFilterActive() {
  return (
    queryString.parse(location.search).sortBy ||
    queryString.parse(location.search).filters ||
    queryString.parse(location.search).SORT_BY_FILTERS_KEY ||
    queryString.parse(location.search).CATEGORY_FILTERS_KEY
  );
}

function removeAllFromQueryString() {
  const newQueryString = queryString.stringify({});

  addQueryString(newQueryString);
}

export default initRemoveAllFilters;
