import $ from 'jquery';

import getFilters from './getFiltersFromUrl';

export let activeFilters = {...getFilters()};

export const addCategoryFilter = (value, label) => {
  activeFilters.categoryFilters = [
    ...activeFilters.categoryFilters,
    {
      value,
      label
    }
  ]
}

export const removeCategoryFilter = (value) => {
  activeFilters.categoryFilters = activeFilters.categoryFilters
    .filter(i => i.value !== value);
}

export const removeSortByFilter = () => {
  activeFilters = {
    ...activeFilters,
    sortByFilters: {}
  }
}

export const removeCheckboxFilter = (value) => {
  activeFilters.checkboxFilters = 
    activeFilters.checkboxFilters.filter(i => i.value !== value)
}

export const addCheckboxFilter = (value, active) => {
  activeFilters.checkboxFilters = [
    ...activeFilters.checkboxFilters,
    {
      value,
      active
    }
  ]
}

export const addSortByFilter = (value) => {
  activeFilters = {
    ...activeFilters,
    sortByFilters: { value }
  }
}

