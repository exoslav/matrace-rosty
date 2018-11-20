import $ from 'jquery';

const loader = $(`
  <div class="listing-page-loader__wrapper">
    <div class="listing-page-loader"></div>
    <img class="listing-page-loader__image" src="/src/assets/img/logo.png" alt="logo matrace a rosty">
    <strong class="listing-page-loader__text">Načítají se produkty</strong>
  </div>
`);
//const listingWrapper = $('.products-listing-wrapper');
const loadingClassName = 'products-listing-wrapper--loading';

export const showLoader = () => {
  $('.products-listing-wrapper').addClass(loadingClassName);
  $('.products-listing-wrapper').append(loader);
}

export const hideLoader = () => {
  $('.products-listing-wrapper').removeClass(loadingClassName);
  loader.remove();
}

