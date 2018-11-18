import $ from 'jquery';
import queryString from 'query-string';

import getProducts from './getProducts';
import { activeFilters, addSortByFilter } from './activeFilters';

const initSortByFilters = () => {
  const activeClassName = 'product-form-sort--active';
  const sortByFilters = $('.filters__sort-by-list .product-form-sort');

  sortByFilters.each(function() {
    if ($(this).attr('data-filter-value') === activeFilters.sortByFilters.value) {
      $(this).addClass(activeClassName);
    }
  });

  sortByFilters.on('click', function(e) {
    e.preventDefault();

    const oldSortByFiltersValue = activeFilters.sortByFilters.value;
    const activeClassName = 'product-form-sort--active';
    const active = $(this).hasClass(activeClassName);

    if (active) {
      return;
    }

    addSortByFilter($(this).attr('data-filter-value'));

    const onGetProductsSuccess = () => {
      sortByFilters.removeClass(activeClassName);
      $(this).addClass(activeClassName);
    }

    const onGetProductsError = () => {
      addSortByFilter(oldSortByFiltersValue);
      alert('error when getting new products');
    }

    getProducts(onGetProductsSuccess, onGetProductsError);
  });
}

export default initSortByFilters;
