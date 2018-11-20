import $ from 'jquery';
import queryString from 'query-string';

import addQueryString from '../utils/addQueryString';

import getProducts from './getProducts';

export const SORT_BY_FILTERS_KEY = 'sortBy';
const PRICE_ASC = 'price-asc';
const ACTIVE_CLASSNAME = 'product-form-sort--active';
const sortByFilters = $('.filters__sort-by-list .product-form-sort');

const initSortByFilters = () => {
  const activeFilter = getFilter();

  // MOCK
  const values = ['price-asc', 'price-desc', 'latest']
  sortByFilters.each(function(index) {
    $(this).attr('data-filter-value', values[index]);
  });

  sortByFilters.each(function() {
    const self = $(this);

    if (self.attr('data-filter-value') === activeFilter) {
      self.addClass(ACTIVE_CLASSNAME);
    }
  });

  sortByFilters.on('click', function(e) {
    e.preventDefault();

    const self = $(this);
    const currentFilterValue = self.attr('data-filter-value');
    const oldActiveElement = self;
    const oldFilterValue = activeFilter;
    const active = self.hasClass(ACTIVE_CLASSNAME);

    if (active) {
      return;
    }

    addFilterValueToQueryString(currentFilterValue);

    sortByFilters.removeClass(ACTIVE_CLASSNAME);
    self.addClass(ACTIVE_CLASSNAME);

    const onGetProductsError = () => {
      addFilterValueToQueryString(oldFilterValue);
      sortByFilters.removeClass(ACTIVE_CLASSNAME);
      oldActiveElement.addClass(ACTIVE_CLASSNAME);
    }

    getProducts(() => {}, onGetProductsError);
  });
}

function getFilter() {
  return queryString.parse(location.search).sortBy || PRICE_ASC;
}

function addFilterValueToQueryString(val) {
  const newQueryString = queryString.stringify({
    ...queryString.parse(location.search),
    sortBy: val
  });

  addQueryString(newQueryString);
}

export default initSortByFilters;
