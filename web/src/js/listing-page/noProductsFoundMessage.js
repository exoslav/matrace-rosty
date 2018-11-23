import $ from 'jquery';

const noProductsFoundMessage = $(`
  <div class="listing-page-loader__no-products">
    <p class="listing-page-loader__no-products-text">Pro daný výběr nebyly nalezeny žádné nabízené výrobky.</p>
  </div>
`);

export const showNoProductsFoundMessage = () => {
  noProductsFoundMessage.appendTo($('.products-listing-wrapper .best-sellers-hp__wrapper'));
}

export const hideNoProductsFoundMessage = () => {
  noProductsFoundMessage.remove();
}

