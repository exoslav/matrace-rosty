import $ from 'jquery';
import { showLoader, hideLoader} from './loader';
import { showErrorMessage, hideErrorMessage} from './errorMessage';
import { showNoProductsFoundMessage, hideNoProductsFoundMessage} from './noProductsFoundMessage';
import { normalizePagination, renderPagination } from './pagination';
import renderProducts from './renderProducts';

const API_URL = '/api/product/get-list';

const defaultFormData = {
  category: $('[data-category]').attr('data-category')
};

const getProducts = (
  formData,
  onSuccess = () => {},
  onError = () => {},
  scroll = false
) => {
  showLoader();
  hideErrorMessage();
  hideNoProductsFoundMessage();

  $.ajax({
    method: 'GET',
    url: API_URL,
    dataType: 'json',
    data: {
      ...defaultFormData,
      ...formData
    }
  })
    .done((data) => {
      renderProducts(data.products);
      renderPagination(normalizePagination(data.pagination));

      if (data.products.length === 0) {
        showNoProductsFoundMessage();

        return;
      }

      if (scroll) {
        scrollToWhenLoaded();
      }

      onSuccess();
    })
    .fail((err) => {
      console.log(err);

      showErrorMessage();

      onError();
    })
    .always(() => {
      hideLoader();
    })
}

function scrollToWhenLoaded() {
  $([document.documentElement, document.body]).animate({
    scrollTop: $(".products-listing-wrapper").offset().top - 15
  }, 500);
}

export default getProducts;
