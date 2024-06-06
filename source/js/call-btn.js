import { isEscEvent } from "./utils.js";
import { activateBlur, deactivateBlur, hideScroll, showScroll } from "./blur.js";

const MODAL_CLASS = 'modal';
const CALL_OPENED_CLASS = 'call--opened';

const call = document.querySelector('.call');
const callBtns = document.querySelectorAll('.call-btn');
const closeBtn = call.querySelector('.call__close-btn');
const form = call.querySelector('.feedback__form');

const openCall = () => {
  call.classList.add(MODAL_CLASS);
  activateBlur();
  document.addEventListener(`keydown`, onEscKeydown);
}

const closeCall = () => {
  if(call) {
    call.classList.remove(MODAL_CLASS);
    deactivateBlur();
    document.removeEventListener('keydown', onEscKeydown);
    form.reset();
  }
}

const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeCall();
  }
}

callBtns.forEach(btn => {
  btn.addEventListener('click', (evt) => {

    evt.preventDefault();
    openCall();

    closeBtn.addEventListener('click', () => {
      closeCall();
    })
  })
})

export {closeCall};
