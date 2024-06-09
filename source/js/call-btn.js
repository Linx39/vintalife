import { handleEscKeyDown } from "./utils.js";
import { activateBlur, deactivateBlur, handleOnBlurClick } from "./blur.js";

const MODAL_CLASS = 'modal';

const call = document.querySelector('.call');
const callBtns = document.querySelectorAll('.call-btn');
const closeBtn = call.querySelector('.call__close-btn');
const form = call.querySelector('.feedback__form');

const openCall = () => {
  call.classList.add(MODAL_CLASS);
  activateBlur();
  document.addEventListener(`keydown`, onEscKeyDown);
  document.addEventListener('click', onDocumentClick);
}

const closeCall = () => {
  if(call) {
    call.classList.remove(MODAL_CLASS);
    deactivateBlur();
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onDocumentClick);
    form.reset();
  }
}

const onEscKeyDown = (evt) => handleEscKeyDown(evt, () => closeCall());

const onDocumentClick = (evt) => handleOnBlurClick(evt, () => closeCall());

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
