import { setResponseSuccess, setResponseError } from "./response-modal.js";

const PHONE_MASK = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/;
const MASK_OPTIONS = {
  mask: '+{7} (000) 000-00-00',
};

const feedbackForms = document.querySelectorAll('.feedback__form');

const resetAllForms = () => {
  feedbackForms.forEach(form => form.reset());
}

feedbackForms.forEach(form => {
  const inputName = form.querySelector('.feedback__input--name');
  const inputPhone = form.querySelector('.feedback__input--phone');
  const submitBtn = form.querySelector('.feedback__submit-btn')

  const mask = IMask(inputPhone, MASK_OPTIONS);

  submitBtn.addEventListener('click', (evt) => {
    const isFormValid = inputName.value !== '' && PHONE_MASK.test(inputPhone.value);

    evt.preventDefault();

    if(!isFormValid) {
      setResponseError();
      return;
    }

    setResponseSuccess();
    resetAllForms();
  })

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
})
