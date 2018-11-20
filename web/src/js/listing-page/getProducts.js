import $ from 'jquery';
import { showLoader, hideLoader} from './loader';
import { showErrorMessage, hideErrorMessage} from './errorMessage';
import renderProducts from './renderProducts';

const API_URL = '/api/product/get-list';

const getProducts = (
  onSuccess = () => {},
  onError = () => {}
) => {
  showLoader();
  hideErrorMessage();

  if (Math.floor(Math.random() * 10) < 1) {
    setTimeout(() => {
      console.log('ERROR when getting products');

      hideLoader();
      showErrorMessage();
      onError();
    }, 500);

    return;
  }

  $.ajax({
    method: 'GET',
    url: API_URL
  })
    .done((data) => {
      renderProducts();

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

export default getProducts;
