import { controlModal } from "./modal.js";
import { resetForm } from "./feedback.js";

// const call = document.querySelector('.call');
const callBtns = document.querySelectorAll('.call-btn');

callBtns.forEach(btn => {
  const href = btn.getAttribute('href');
  const modal = document.querySelector(href);

  const form = modal.querySelector('.feedback__form');
  const {closeModal: closeCall, handleModal: handleCall} = controlModal(modal, null, () => resetForm(form));

  btn.addEventListener('click', () => {
    handleCall();
  })
})

// export {closeCall};
