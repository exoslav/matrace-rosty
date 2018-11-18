import $ from 'jquery';

const getProducts = (
  onSuccess = () => {},
  onError = () => {}
) => {
  // TODO: AJAX request for new products
  setTimeout(() => {
    if (Math.ceil(Math.random() * 10) > 5) {
      onSuccess();
    } else {
      onError();
    }
  }, 500);
}

export default getProducts;
