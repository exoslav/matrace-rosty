const errorMessage = $(`
  <div class="listing-page-loader__error">
    <p class="listing-page-loader__error-text">Nepodařilo se načíst nové produkty. Nastala neočekávaná chyba na serveru.</p>
  </div>
`);

export const showErrorMessage = () => {
  $('.products-listing-wrapper').prepend(errorMessage);
}

export const hideErrorMessage = () => {
  errorMessage.remove();
}

