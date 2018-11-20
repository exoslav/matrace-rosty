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

