import $ from 'jquery';
import queryString from 'query-string';

const FILTERS = 'filterValues';
const SORT_BY = 'sortBy';

const defaultFilters = {
  categoryFilters: [],
  checkboxFilters: [],
  sortByFilters: {
    value: 'price-asc'
  }
};

const getFilters = () => {
  const filters = {...defaultFilters};
  const query = queryString.parse(location.search);

  Object.keys(query).forEach((key) => {
    const currentKey = key;
    const currentValue = query[key];

    if (currentKey === FILTERS) {
      const activeFilters = currentValue
        .split(',')
        .map((i) => {
          const item = $(`[data-filter-value="${i}"]`);

          if (item.length > 0) {
            return {
              label: item.attr('data-label'),
              value: item.attr('data-filter-value')
            };
          }

          return null;
        })
        .filter(i => i ? i : false);

        filters.categoryFilters = [
          ...filters.categoryFilters,
          ...activeFilters
        ];
    } else if (currentKey === SORT_BY) {
      filters.sortByFilters = {
        ...filters.sortByFilters,
        value: currentValue
      };

    } else {
      filters.checkboxFilters = [
        ...filters.checkboxFilters,
        {
          value: currentKey,
          active: currentValue === 'true'
        }
      ];
    }
  });

  return filters;
}

export default getFilters;
