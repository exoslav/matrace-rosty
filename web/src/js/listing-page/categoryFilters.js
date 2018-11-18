import $ from 'jquery';
import queryString from 'query-string';

import getProducts from './getProducts';
import { activeFilters, addCategoryFilter, removeCategoryFilter } from './activeFilters';

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
    activeFilters.categoryFilters
      .map(i => $(`[data-filter-value="${i.value}"]`).prop('checked', true));
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
        const filterValue = $(this).attr('data-filter-value');
        const active = activeFilters.categoryFilters.find(i => i.value === filterValue) || false;
    
        if (active) {
          removeCategoryFilter(filterValue);
        } else {
          addCategoryFilter(
            $(this).attr('data-filter-value'),
            $(this).attr('data-label')
          );
        }

        emptyActiveFiltersElement();
        renderActiveFilters();

        showHideActiveFilters();
      })
  }

  function renderActiveFilters() {
    const categoryFilters = activeFilters.categoryFilters;
    const content = $('<ul/>', { class: 'filters__active-filters__list' })

    for (let i = 0; i < categoryFilters.length; i++) {
      const { label, value } = categoryFilters[i];
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
        removeCategoryFilter(value);
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

  function emptyActiveFiltersElement() {
    $('.filters__active-filters__list-wrapper').empty();
  }

  function showHideActiveFilters() {
    const categoryFilters = activeFilters.categoryFilters;
    const filtersElement = $('.filters__active-filters');

    if (categoryFilters.length > 0) {
      filtersElement.removeClass('filters__active-filters--hidden');
    } else {
      filtersElement.addClass('filters__active-filters--hidden');
    }
  }

  function onClose() {
    closeButton.on('click', () => {
      filterSelect.val(DEFAULT_FILTER_VALUE);
      categoryLists.hide();
      filterWrapper.removeClass('filters__select-category-filter__select-wrapper--open');
    })
  }
}

export default initCategoryFilters;
