import { isEscEvent } from "./utils.js";
import { activateBlur, deactivateBlur, hideScroll, showScroll } from "./blur.js";

const MODAL_CLASS = 'modal';
const CALL_OPENED_CLASS = 'call--opened';

const call = document.querySelector('.call');
const callBtns = document.querySelectorAll('.call-btn');
const closeBtn = call.querySelector('.call__close-btn');

// callBtns.forEach(btn => {
//   btn.addEventListener('click', () => {
//     if(!call.classList.contains(CALL_OPENED_CLASS)) {
//       call.classList.add(CALL_OPENED_CLASS);
//       return;
//     }

//     call.classList.remove(CALL_OPENED_CLASS);
//   })
// })

callBtns.forEach(btn => {
  btn.addEventListener('click', (evt) => {
    const openCall = () => {
      call.classList.add(MODAL_CLASS);
      activateBlur();
      // hideScroll();
      document.addEventListener(`keydown`, onEscKeydown);
    }

    const closeCall = () => {
      call.classList.remove(MODAL_CLASS);
      deactivateBlur();
      // showScroll();
      document.removeEventListener('keydown', onEscKeydown);
    }

    const onEscKeydown = (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        closeCall();
      }
    }

    evt.preventDefault();
    openCall();

    closeBtn.addEventListener('click', () => {
      closeCall();
    })
  })
})

