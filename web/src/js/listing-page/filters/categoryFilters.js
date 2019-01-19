import queryString from 'query-string';

import getProducts from '../getProducts';
import addQueryString from '../../utils/addQueryString'

export const CATEGORY_FILTERS_KEY = 'filters';

export const deactivateCategoryFilters = () => {
  $(`.filters__category`)
    .find(`input[data-filter-value]`)
    .prop('checked', false);
}

export const hideActiveFilters = () => {
  $('.filters__active-filters').addClass('filters__active-filters--hidden');
}

export const emptyActiveFiltersElement = () => {
  $('.filters__active-filters__list-wrapper').empty();
}

const initCategoryFilters = () => {
  const DEFAULT_FILTER_VALUE = 'default';
  let currentFilterCategory = DEFAULT_FILTER_VALUE;
  const filterSelect = $('#categories-filters');
  const filterWrapper = $('.filters__select-category-filter__select-wrapper');
  const categoryLists = $('.filters__category');
  const closeButton = $('.filters__close-category');

  filterSelect.on('change', filteringLogicFuntion);

  setValuesOnLoad();
  filteringLogicFuntion();
  onClose();
  onCategoryItemChange();
  renderActiveFilters();

  function setValuesOnLoad() {
    const filters = arrayifyFilters(queryString.parse(location.search).filters);
    filters.map(f => $(`[data-filter-value="${f}"]`).prop('checked', true));
  }

  function filteringLogicFuntion() {
    showHideActiveFilters();
    
    currentFilterCategory = filterSelect.val();

    if (currentFilterCategory === DEFAULT_FILTER_VALUE) {
      categoryLists.hide();
      filterWrapper.removeClass('filters__select-category-filter__select-wrapper--open');

      return;
    }

    categoryLists.hide();

    filterWrapper.addClass('filters__select-category-filter__select-wrapper--open');
    $(`.filters__category--${currentFilterCategory}`).show();
  }

  function onCategoryItemChange() {
    $('.filters__category .filters__category__item input[type=checkbox]')
      .on('change', function() {
        const filters = arrayifyFilters(queryString.parse(location.search).filters);
        const filterValue = $(this).attr('data-filter-value');
        const active = filters
          .find(i => i === filterValue) || false;

        if (active) {
          removeCategoryValueFromQueryString(filterValue);
        } else {
          addCategoryValueToQueryString(filterValue);
        }

        getProducts(queryString.parse(location.search));
        emptyActiveFiltersElement();
        renderActiveFilters();
        showHideActiveFilters();
      })
  }

  function renderActiveFilters() {
    const filters = arrayifyFilters(queryString.parse(location.search).filters);
    const content = $('<ul class="filters__active-filters__list" />');

    for (let i = 0; i < filters.length; i++) {
      const currentFilter = $(`input[data-filter-value="${filters[i]}"]`);

      if (!currentFilter || !currentFilter.length) {
        return;
      }

      const label = currentFilter.attr('data-label');
      const value = currentFilter.attr('data-filter-value');
      const listItem = $('<li class="filters__active-filters__item" />');

      $(`
        <button
          type="button"
          class="filters__active-filters__button"
          data-label="${label}"
          data-filter-value="${value}"
        >
          <span class="filters__active-filters__text">${label}</span>
          <i class="icon icon-cancel"></i>
        </button>
      `)
      .on('click', function() {
        getProducts(queryString.parse(location.search));
        removeCategoryValueFromQueryString(value);
        emptyActiveFiltersElement();
        renderActiveFilters();

        $(`.filters__category`)
          .find(`input[data-filter-value="${value}"]`)
          .prop('checked', false);

        showHideActiveFilters();
      })
      .appendTo(listItem);

      listItem.appendTo(content);
    }

    $(content).appendTo($('.filters__active-filters__list-wrapper'));
  }

  function onClose() {
    closeButton.on('click', () => {
      filterSelect.val(DEFAULT_FILTER_VALUE);
      categoryLists.hide();
      filterWrapper.removeClass('filters__select-category-filter__select-wrapper--open');
    })
  }
}

function arrayifyFilters(filters) {
  if (!filters) {
    return [];
  }

  if (Array.isArray(filters)) {
    return filters;
  }

  return filters.split(',');
}

function showHideActiveFilters() {
  const HIDDEN_CLASSNAME = 'filters__active-filters--hidden';
  const filters = arrayifyFilters(queryString.parse(location.search).filters);
  const filtersElement = $('.filters__active-filters');

  if (filters.length > 0) {
    filtersElement.removeClass(HIDDEN_CLASSNAME);
  } else {
    filtersElement.addClass(HIDDEN_CLASSNAME);
  }
}

function removeCategoryValueFromQueryString(val) {
  const queryStr = queryString.parse(location.search);
  const filters = arrayifyFilters(queryStr.filters);
  const newFilters = filters.filter(i => i !== val).join(',');

  const newQueryString = queryString.stringify({
    ...queryStr,
    filters: newFilters ? newFilters : undefined
  }, { encode: false });

  addQueryString(newQueryString);
}

function addCategoryValueToQueryString(val) {
  const queryStrings = queryString.parse(location.search);
  const queryFilters = queryStrings.filters;

  const newQueryString = queryString.stringify({
    ...queryStrings,
    filters: `${queryFilters ? queryFilters + ',' + val : val}`
  }, { encode: false });

  addQueryString(newQueryString);
}

export default initCategoryFilters;
