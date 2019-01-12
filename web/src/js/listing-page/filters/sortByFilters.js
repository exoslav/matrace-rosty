import $ from 'jquery';
import queryString from 'query-string';

import addQueryString from '../../utils/addQueryString';

import getProducts from '../getProducts';

export const SORT_BY_FILTERS_KEY = 'sortBy';
const ACTIVE_CLASSNAME = 'product-form-sort--active';
const sortByFilters = $('.filters__sort-by-list .product-form-sort');

export const getSortByFilter = () => queryString.parse(location.search).sortBy || null;

export const setValueToSortByFilter = (activeFilter, value) => {
  sortByFilters.each(function() {
    const self = $(this);

    if (self.attr('data-filter-value') === activeFilter) {
      if (value) {
        self.addClass(ACTIVE_CLASSNAME);
      } else {
        self.removeClass(ACTIVE_CLASSNAME);
      }
    }
  });
}

const initSortByFilters = () => {
  const activeFilter = getSortByFilter();

  setValueToSortByFilter(activeFilter, true);

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

    getProducts(
      queryString.parse(location.search),
      () => {},
      onGetProductsError
    );
  });
}

function addFilterValueToQueryString(val) {
  const newQueryString = queryString.stringify({
    ...queryString.parse(location.search),
    sortBy: val
  }, { encode: false });

  addQueryString(newQueryString);
}

export default initSortByFilters;
