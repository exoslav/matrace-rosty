import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/slider';
import 'jquery-ui-touch-punch';
import queryString from 'query-string';

import getProducts from '../getProducts';
import formatePrice from '../../utils/formatePrice';
import addQueryString from '../../utils/addQueryString';

export const MIN_PRICE_FILTER_KEY = 'minPrice';
export const MAX_PRICE_FILTER_KEY = 'maxPrice';

export const getFilterPrices = () => {
  const { minPrice, maxPrice } = queryString.parse(location.search);

  return [minPrice, maxPrice];
}

export let setPricesToDefault = () => {};

const initPriceFilters = () => {
  // shouldMakeRequest - funkce setPricesToDefault totiz spusti slider change event dvakrat
  // to zpusobi dvakrat zbytecne provolani API
  let shouldMakeRequest = true;
  const [ minPriceFromQuery, maxPriceFromQuery ] = getFilterPrices();

  const sliderElement = $('.filters__range-element');
  const minInput = $('.filters__range-min');
  const maxInput = $('.filters__range-max');
  const minPrice = parseInt(minInput.data('min-price'));
  const minCurrentPrice = getInitialPriceValue(minPriceFromQuery, minPrice);
  const maxPrice = parseInt(maxInput.data('max-price'));
  const maxCurrentPrice = getInitialPriceValue(maxPriceFromQuery, maxPrice);

  setPricesToDefault = () => {
    shouldMakeRequest = false;
    sliderElement.slider('values', 0, minPrice);
    sliderElement.slider('values', 1, maxPrice);
    minInput.val(formatePrice(minPrice));
    maxInput.val(formatePrice(maxPrice));
    shouldMakeRequest = true;
  };

  minInput.val(formatePrice(minCurrentPrice));
  maxInput.val(formatePrice(maxCurrentPrice));

  sliderElement.slider({
    range: true,
    min: minPrice,
    max: maxPrice,
    values: [ minCurrentPrice, maxCurrentPrice ],
    change: function(event, ui) {
      const [ currMinPrice, currMaxPrice ] = ui.values;

      addFilterValueToQueryString(MIN_PRICE_FILTER_KEY, currMinPrice !== minPrice ? currMinPrice : undefined);
      addFilterValueToQueryString(MAX_PRICE_FILTER_KEY, currMaxPrice !== maxPrice ? currMaxPrice : undefined);

      if (shouldMakeRequest) {
        getProducts(queryString.parse(location.search), () => {});
      }
    },
    slide: function( event, ui ) {
      const { values } = ui;
      const minVal = values[0];
      const maxVal = values[1];

      minInput.val(formatePrice(minVal));
      maxInput.val(formatePrice(maxVal));
    }
  });

  minInput.on('change', function() {
    const self = $(this);
    const val = parseInt(self.val());

    setSliderValue(0, val, self);
    addFilterValueToQueryString(MIN_PRICE_FILTER_KEY, val !== minPrice ? val : undefined);
    getProducts(queryString.parse(location.search), () => {});
  })

  maxInput.on('change', function() {
    const self = $(this);
    const val = parseInt(self.val());

    setSliderValue(1, val, self);
    addFilterValueToQueryString(MAX_PRICE_FILTER_KEY, val !== maxPrice ? val : undefined);
    getProducts(queryString.parse(location.search), () => {});
  });

  function setSliderValue(index, value, input) {
    $('.filters__range-element').slider('values', index, value);
    input.val(formatePrice(value));
  }

  function getInitialPriceValue(priceFromQuery, priceFromInputData) {
    return parseInt(priceFromQuery || priceFromInputData);
  }
}

export default initPriceFilters;

function addFilterValueToQueryString(key, val) {
  const newQueryString = queryString.stringify({
    ...queryString.parse(location.search),
    [key]: val
  });

  addQueryString(newQueryString);
}