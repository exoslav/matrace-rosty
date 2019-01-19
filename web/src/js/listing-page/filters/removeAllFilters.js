import queryString from 'query-string';

import getProducts from '../getProducts';
import addQueryString from '../../utils/addQueryString';
import { setPricesToDefault, MIN_PRICE_FILTER_KEY, MAX_PRICE_FILTER_KEY  } from './priceFilters';
import { getSortByFilter, setValueToSortByFilter, SORT_BY_FILTERS_KEY  } from './sortByFilters';
import { getCheckboxFilters, setValuesToCheckboxFilters } from './checkboxFilters';
import { deactivateCategoryFilters, hideActiveFilters, emptyActiveFiltersElement, CATEGORY_FILTERS_KEY } from './categoryFilters';

const initRemoveAllFilters = () => {
  const element = $('.filters_remove-all-filters');

  element.on('click', function(e) {
    e.preventDefault();

    // reset all filters
    setValuesToCheckboxFilters(getCheckboxFilters(), false);
    setValueToSortByFilter(getSortByFilter(), false);
    deactivateCategoryFilters();
    emptyActiveFiltersElement();
    hideActiveFilters();
    setPricesToDefault();

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
  const queryStringParsed = queryString.parse(location.search);

  let isActive = false;

  if (
    queryStringParsed[SORT_BY_FILTERS_KEY] ||
    queryStringParsed[CATEGORY_FILTERS_KEY] ||
    queryStringParsed[MIN_PRICE_FILTER_KEY] ||
    queryStringParsed[MAX_PRICE_FILTER_KEY]
  ) {
    isActive = true;
  }

  Object.keys(queryStringParsed).forEach((key) => {
    if (queryStringParsed[key] === '1' && key !== 'page') {
      isActive = true;
    }
  });
  
  return isActive;
}

function removeAllFromQueryString() {
  const newQueryString = queryString.stringify({});

  addQueryString(newQueryString);
}

export default initRemoveAllFilters;
