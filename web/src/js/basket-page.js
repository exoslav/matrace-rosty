const loadingClassName = 'basket-submit-button--loading';

export default () => {
  $(document).ready(function() {
    const submitBasketButton = $('#cartStepOneForm-submit');
  
    submitBasketButton.on('click', function() {
      if ($(this).hasClass(loadingClassName)) {
        return false;
      }
    });
  });
  
  window.onBasketSubmitStartsUpdating = function() {
    const submitButton =  $('#cartStepOneForm-submit');
    const loader = $(`<div class="basket-submit-button__loader"></div>`);
  
    $(loader).appendTo(submitButton);
    submitButton.addClass(loadingClassName);
  }
  
  window.onBasketSubmitStopsUpdating = function() {
    const submitButton = $('#cartStepOneForm-submit');
    
    submitButton.removeClass(loadingClassName);
    submitButton.find('.basket-submit-button__loader').remove();
  }
}
