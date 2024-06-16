import { openResponseSuccess, openResponseError } from "./response.js";
import { closeCall } from "./call-btn.js";

const PHONE_MASK = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
const VALIDITY_MESSAGE_PHONE = `Введите корректный номер телефона.`;

const feedbackForms = document.querySelectorAll('.feedback__form');

const resetForm = (form) => form.reset();

feedbackForms.forEach(form => {
  const inputName = form.querySelector('.feedback__input--name');
  const inputPhone = form.querySelector('.feedback__input--phone');
  const submitBtn = form.querySelector('.feedback__submit-btn')

  inputPhone.addEventListener(`input`, () => {
    if (PHONE_MASK.test(inputPhone.value) || inputPhone.value === "") {
      inputPhone.setCustomValidity(``);
    } else {
      inputPhone.setCustomValidity(VALIDITY_MESSAGE_PHONE);
    }

    inputPhone.reportValidity();
  })

  submitBtn.addEventListener('click', (evt) => {
    if(inputName.value === '' && inputPhone.value === '') {
      evt.preventDefault();
      openResponseError();
    }
  })

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    openResponseSuccess();
    closeCall();
  })
})

export {resetForm}
