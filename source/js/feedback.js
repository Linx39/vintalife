import { isEscEvent } from "./utils.js";
import { activateBlur, deactivateBlur, hideScroll, showScroll } from "./blur.js";

const MODAL_CLASS = 'modal';

const feedbackForms = document.querySelectorAll('.feedback__form');
const responseSuccess = document.querySelector('#success').content.querySelector('.response');
const responseError = document.querySelector('#error').content.querySelector('.response');

feedbackForms.forEach(form => {
  const inputs = form.querySelectorAll('.feedback__input');
  const submitBtn = form.querySelector('.feedback__submit-btn');

  let isFormValid = true;
  let response = responseSuccess;
  if(!isFormValid) {
    response = responseError;
  }

  const closeBtn = response.querySelector('.response__close-btn');
  const responsBtn = response.querySelector('.response-btn');

  form.addEventListener('submit', (evt) => {
    const openResponse = () => {
      document.body.append(response);
      response.classList.add(MODAL_CLASS);
      activateBlur();
      document.addEventListener(`keydown`, onEscKeydown);
    }

    const closeResponse = () => {
      response.classList.remove(MODAL_CLASS);
      deactivateBlur();
      document.removeEventListener('keydown', onEscKeydown);
      response.remove();
      if (isFormValid) {
        form.reset();
      }
    }

    const onEscKeydown = (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        closeResponse();
      }
    }

    evt.preventDefault();
    openResponse();

    closeBtn.addEventListener('click', () => {
      closeResponse();
    })

    responsBtn.addEventListener('click', () => {
      closeResponse();
    })
  })
})

