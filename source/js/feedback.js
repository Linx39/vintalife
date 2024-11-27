import { setResponseSuccess, setResponseError } from "./response-modal.js";

const MASK_OPTIONS = {
  mask: '+{7} (000) 000-00-00',
};

const NAME_PATTERN_MESAGE = 'Некорректное имя ;-)';
const NAME_REQUIRED_MESAGE = 'Пожалуйста, заполните имя ;-)';
const PHONE_PATTERN_MESAGE = 'Некорректный номер телефона ;)';
const PHONE_REQUIRED_MESAGE = 'Пожалуйста, заполните номер телефона ;-)';

const feedbackForms = document.querySelectorAll('.feedback__form');

const resetAllForms = () => {
  feedbackForms.forEach(form => form.reset());
}

feedbackForms.forEach(form => {
  const inputName = form.querySelector('.feedback__input--name');
  const inputPhone = form.querySelector('.feedback__input--phone');

  inputName.setAttribute('data-pristine-pattern-message', NAME_PATTERN_MESAGE);
  inputName.setAttribute('data-pristine-required-message', NAME_REQUIRED_MESAGE);

  inputPhone.setAttribute('data-pristine-pattern-message', PHONE_PATTERN_MESAGE);
  inputPhone.setAttribute('data-pristine-required-message', PHONE_REQUIRED_MESAGE);

  let pristineConfig = {
    classTo: 'feedback__label',
    errorClass: 'has-danger',
    successClass: 'has-success',
    errorTextParent: 'feedback__label',
    errorTextTag: 'span',
    errorTextClass: 'feedback__warning'
};

  const pristine = new Pristine(form, pristineConfig);

  const mask = IMask(inputPhone, MASK_OPTIONS);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    let isFormValid = pristine.validate();

    if(isFormValid) {
      setResponseSuccess();
    }

    if(!isFormValid) {
      setResponseError();
    }

    resetAllForms();
    pristine.reset();
  })
})
