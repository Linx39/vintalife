import { openResponseSuccess, openResponseError } from "./response.js";
import { closeCall } from "./call-btn.js";

const PHONE_MASK = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
const VALIDITY_MESSAGE_PHONE = `Введите корректный номер телефона.`;

const feedbackForms = document.querySelectorAll('.feedback__form');

feedbackForms.forEach(form => {
  const inputName = form.querySelector('.feedback__input--name');
  const inputPhone = form.querySelector('.feedback__input--phone');
  const submitBtn = form.querySelector('.feedback__submit-btn')

  // inputName.addEventListener(`input`, (evt) => {
  //   evt.preventDefault();
  // })

  inputPhone.addEventListener(`input`, () => {
    if (PHONE_MASK.test(inputPhone.value) || inputPhone.value === "") {
      inputPhone.setCustomValidity(``);
    } else {
      inputPhone.setCustomValidity(VALIDITY_MESSAGE_PHONE);
    }

    inputPhone.reportValidity();
  })

  submitBtn.addEventListener('click', () => {
    if(inputName.value === '' && inputPhone.value === '') {
      openResponseError();
    }
  })

  form.addEventListener('submit', (evt) => {
    const isInputNameValid = inputName.value !== '';
    const isInputPnoneValid = PHONE_MASK.test(inputPhone.value);

    const isFormValid = isInputNameValid && isInputPnoneValid;

    evt.preventDefault();

    if(!isFormValid) {
      openResponseError();
      return;
    }

    openResponseSuccess();
    form.reset();
    closeCall();
  })
})

