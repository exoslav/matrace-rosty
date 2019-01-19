import { oneLineTrim } from 'common-tags';
import productDataMock from './productsMock';
import formatePrice from '../utils/formatePrice';

const productsContainer = $('.products-listing-wrapper .best-sellers-hp__wrapper');

const renderProducts = (products = getRandomProducts(productDataMock)) => {
  emptyProducts();

  if (!products || !products.length) {
    return;
  }

  let newContent = '';

  products.map((product) => {
    /*
    product.icons = [
      { type: 'akce', text: 'Akce' },
      { type: 'doprava_zdarma', text: 'Doprava zdarama' },
      { type: 'skladem', text: 'Skladem' },
      { type: 'vyprodej', text: 'Výprodej' },
      { type: 'novinka', text: 'Novinka' }
    ];
    */

    newContent += `
      <div class="product-item">
        <a class="product-item__link" href="${product.url}" title="${product.name}">
          <div class="product-item__header-wrapper">
            <strong class="product-item__header">${product.name}</strong>
            <div class="product-item__action-icons">
              ${renderActionIcons(product.icons)}
            </div>
          </div>
          <img class="product-item__img" alt="${product.name}" src="${product.image}">
          <p class="product-item__description">${product.annotation}</p>
          <div class="product-item__footer">
            <div class="product-item__price">
              ${product.wasPrice ? '<span class="product-item__discount">' + formatePrice(product.wasPrice) + '&nbsp;Kč</span>' : ''}
              <span class="product-item__current-price">
                  <span>od</span>
                  <strong>${formatePrice(product.currentPrice)}&nbsp;Kč</strong>
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

  productsContainer.empty();
  $(newContent).appendTo(productsContainer);
}

function getRandomProducts(products = []) {
  return products.filter(i => Math.ceil(Math.random() * 10) % 2 === 0);
}

function emptyProducts() {
  productsContainer.empty();
}

function renderActionIcons(icons = []) {
  let actionIcons = '<ul class="product-item__action-icons__list">';

  actionIcons += icons.map(icon => (
    oneLineTrim`
      <li class="product-item__action-icons-item">
        <img class="product-item__action-icons__icon" src="./public/data/product-icons/${icon.type}.png" alt="${icon.text}" />
        <span class="product-item__action-icons__text">${icon.text}</span>
      </li>
    `
  )).join('');

  return actionIcons + '</ul>';
}

export default renderProducts;
