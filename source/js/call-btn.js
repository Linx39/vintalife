import { controlModal } from "./modal.js";
import { resetForm } from "./feedback.js";

const call = document.querySelector('.call');
const callBtns = document.querySelectorAll('.call-btn');
const closeBtns = call.querySelectorAll('.call__close-btn');
const form = call.querySelector('.feedback__form');

const {closeModal: closeCall, handleModal: handleCall} = controlModal(call, closeBtns, null, () => resetForm(form));

callBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    handleCall();
  })
})

export {closeCall};
