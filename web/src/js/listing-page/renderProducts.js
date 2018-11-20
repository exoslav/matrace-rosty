import $ from 'jquery';
import productDataMock from './productsMock';

//const productsContainer = $('.products-listing-wrapper .best-sellers-hp__wrapper');

const renderProducts = (products = getRandomProducts(productDataMock)) => {
  let newContent = '';

  products.map((product) => {
    newContent += `
      <div class="product-item">
        <a class="product-item__link" href="${product.link}" title="${product.title}">
          <strong class="product-item__header">${product.title}</strong>
          <img class="product-item__img" alt="${product.title}" src="${product.imgSrc}">
          <p class="product-item__description">${product.description}</p>
          <div class="product-item__footer">
            <div class="product-item__price">
              <span class="product-item__current-price">
                  <span>od</span>
                  <strong>${product.price}&nbsp;Kč</strong>
                </span>
              </div>
              <span class="product-item__detail" tabindex="0">
              <span>DETAIL</span>
              <i class="icon icon-zoom"></i>
            </span>
          </div>
        </a>
      </div>
    `;
  });

  $('.products-listing-wrapper .best-sellers-hp__wrapper').empty();
  $(newContent).appendTo($('.products-listing-wrapper .best-sellers-hp__wrapper'));
}

function getRandomProducts(products = []) {
  return products.filter(i => Math.ceil(Math.random() * 10) % 2 === 0);
}

export default renderProducts;
