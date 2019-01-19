import $ from 'jquery';

import initPriceFilters from './listing-page/filters/priceFilters';
import initSortByFilters from './listing-page/filters/sortByFilters';
import initCategoryFilters from './listing-page/filters/categoryFilters';
import initCheckboxFilters from './listing-page/filters/checkboxFilters';
import initRemoveAllFilters, { showHideRemoveAllFiltersElement } from './listing-page/filters/removeAllFilters';
import { normalizePagination, renderPagination } from './listing-page/pagination';

$(document).ready(function() {
  const initPagination = {
    page: parseInt($('[data-current-page]').attr('data-current-page')),
    pageCount: parseInt($('[data-pages-count]').attr('data-pages-count'))
  };

  renderPagination(normalizePagination(initPagination));

  initPriceFilters();
  initSortByFilters();
  initCheckboxFilters();
  initCategoryFilters();
  initRemoveAllFilters();
  showHideRemoveAllFiltersElement();
})