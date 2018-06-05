import $ from 'jquery';

const modals = [];

const modalTemplate = $('<div class="modal"><div class="modal__content"></div></div>');

export const close = id => {
  $(`.modal-${id}`).remove();
  modals.slice(id, 0);
}

export const open = content => {
  if (!content) {
    console.warn(`Modal cannot be created, invalid data "content" of value ${content} were passed.`);
  }

  const modalId = modals.length++;

  const modal = {
    id: modalId,
    content: $(`
      <div class="modal modal-${modalId}">
        <div class="modal__content">${content}</div>
      </div>)
    `),
    close: (modalId) => close(modalId)
  };

  modals.push(modal);

  $(modal.content).appendTo($('body'));
  $(modal.content).find('.modal__close').on('click', () => modal.close(modalId));
}

