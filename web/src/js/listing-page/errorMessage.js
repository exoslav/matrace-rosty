const errorMessage = $(`
  <div class="listing-page-loader__error">
    <p class="listing-page-loader__error-text">Nepodařilo se načíst produkty, zkuste to prosím znovu.</p>
  </div>
`);

export const showErrorMessage = () => {
  $('.products-listing-wrapper').prepend(errorMessage);
}

export const hideErrorMessage = () => {
  errorMessage.remove();
}

