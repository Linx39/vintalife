import { isEscEvent } from "./utils.js";
import { activateBlur, deactivateBlur, hideScroll, showScroll } from "./blur.js";

const MODAL_CLASS = 'modal';

const responseSuccess = document.querySelector('#success').content.querySelector('.response');
const responseError = document.querySelector('#error').content.querySelector('.response');

const openResponse = (response) => {
  document.body.append(response);
  response.classList.add(MODAL_CLASS);
  activateBlur();
  onResponseCloseBtnClick(response);
  document.addEventListener(`keydown`, onEscKeydown);
}

const closeResponse = (response) => {
  response.classList.remove(MODAL_CLASS);
  deactivateBlur();
  document.removeEventListener('keydown', onEscKeydown);
  response.remove();
}

const onEscKeydown = (response, evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeResponse(response);
  }
}

const onResponseCloseBtnClick = (response) => {
  const closeBtns = response.querySelectorAll('.response__close-btn, .response-btn');

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeResponse(response);
    })
  })
}

export const openResponseSuccess = () => {
  openResponse(responseSuccess);
}

export const openResponseError = () => {
  openResponse(responseError);
}
