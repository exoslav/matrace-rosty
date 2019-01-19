import queryString from 'query-string';

import getProducts from './getProducts';
import addQueryString from '../utils/addQueryString'

export const normalizePagination = (pagination) => {
  const { page, pageCount } = pagination;
  const pages = createPages(pageCount);

  if (!pageCount || page < 0 || page > pageCount || !pages ) {
    return [];
  }

  return pages.reduce((prev, curr) => {
    if (curr === 1) {
      if (prev[0].active) {
        return prev;
      }

      return [
        {
          label: '« Předchozí',
          typeAttr: 'button',
          pageAttr: page - 1,
          active: null
        },
        ...prev
      ];
    }

    if (curr === pageCount) {
      if (curr === page) {
        return [
          ...prev,
          {
            label: curr,
            typeAttr: 'page',
            pageAttr: curr,
            active: true
          }
        ]
      }

      return [
        ...prev,
        {
          label: curr,
          typeAttr: 'page',
          pageAttr: curr,
          active: false
        },
        {
          label: 'Další »',
          typeAttr: 'button',
          pageAttr: page + 1,
          active: null
        }
      ]
    }

    if (
      curr < page - 2 &&
      !prev.find(i => i.typeAttr === 'dots-left')
    ) {
      return [
        ...prev,
        {
          label: '...',
          typeAttr: 'dots-left',
          pageAttr: null,
          active: null
        }
      ]
    }

    if (
      curr > page - 3 &&
      curr < page + 3
    ) {
      return [
        ...prev,
        {
          label: curr,
          typeAttr: 'page',
          pageAttr: curr,
          active: page === curr
        }
      ]
    }

    if (
      curr > page + 2 &&
      curr !== pageCount &&
      !prev.find(i => i.typeAttr === 'dots-right')
    ) {
      return [
        ...prev,
        {
          label: '...',
          typeAttr: 'dots-right',
          pageAttr: null,
          active: null
        }
      ]
    }

    return prev;
  }, [{ label: 1, typeAttr: 'page', pageAttr: 1, active: page === 1 }]);
}

function createPages(total) {
  const pages = [];

  for(let i = 1; i <= total; i++) {
    pages.push(i);
  }

  return pages;
}

const paginationItem = (label, typeAttr, pageAttr, active = false) => (`
  <li class="${active ? 'active' : ''}">
    <a href="#" data-pagination-type="${typeAttr}" data-pagination-page="${pageAttr}">${label}</a>
  </li>
`);

const bindPaginationActions = () => {
  $('.pagination')
    .find('a')
    .on('click', function(e) {
      e.preventDefault();

      const page = $(this).attr('data-pagination-page');
      const active = $(this).closest('li').hasClass('active');

      if (!page || active) {
        return;
      }

      // scroll only when clicked on bottom pagination
      const shouldScroll = !!$(this).closest('.pagination-bottom').length > 0;

      addPaginationToQueryString(page);

      getProducts(
        queryString.parse(location.search),
        () => {},
        () => {},
        shouldScroll
      );
    })
}

export const emptyPagination = () => {
  $('.pagination').empty();
}

export const renderPagination = (pagination = []) => {
  emptyPagination();

  if (pagination.length === 0) {
    return;
  }

  let paginationList = `<ol>`;

  pagination.map((page) => {
    const { label, typeAttr, pageAttr, active } = page;
    paginationList += paginationItem(label, typeAttr, pageAttr, active);
  });

  paginationList += '</ol>';

  $(paginationList).appendTo($('.pagination'));

  bindPaginationActions();
}

function addPaginationToQueryString(val) {
  const newQueryString = queryString.stringify({
    ...queryString.parse(location.search),
    page: val
  }, { encode: false });

  addQueryString(newQueryString);
}
