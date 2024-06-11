import { handleModal } from "./modal.js";

const call = document.querySelector('.call');
const callBtns = document.querySelectorAll('.call-btn');
const closeBtns = call.querySelectorAll('.call__close-btn');
const form = call.querySelector('.feedback__form');

const resetForm = () => form.reset();

callBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    handleModal(call, closeBtns, resetForm);
  })
})

// export {closeCall};
