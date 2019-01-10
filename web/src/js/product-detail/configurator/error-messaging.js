import $ from 'jquery';
import { oneLineTrim } from 'common-tags/es';
import { getArrowDirection } from './configurator-helpers';

const ERROR_MESSAGE_UNEXPECTED_ERROR = 'Nastala neočekávaná chyba, nebylo možné načíst položky. Zkuste to prosím znovu.';

export const errorMessages = [];

export const addMsgToErrorMessages = (msg) => errorMessages.push(msg);

export const renderErrorMessage = (optionItem, optionItemPosition) => {
  const rowElement = $(optionItem).closest('.configurator__row');

  const message = $(oneLineTrim`<div 
      class="
        configurator__error-message 
        configurator__error-message--position-${optionItemPosition} 
        configurator__error-message__arrow 
        configurator__error-message__arrow--${getArrowDirection(optionItemPosition)}"
    >
      ${ERROR_MESSAGE_UNEXPECTED_ERROR}
    </div>`);

  message.appendTo(rowElement);

  addMsgToErrorMessages(message);
}

export const removeErrorMessages = () => {
  errorMessages.map(errorMessage => errorMessage.remove());

  errorMessages.splice(0, 1);
}
