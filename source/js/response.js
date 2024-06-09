import { handleEscKeyDown } from "./utils.js";
import { activateBlur, deactivateBlur, handleOnBlurClick } from "./blur.js";
import { closeCall } from "./call-btn.js";

const MODAL_CLASS = 'modal';

const responseSuccess = document.querySelector('#success').content.querySelector('.response');
const responseError = document.querySelector('#error').content.querySelector('.response');

const handleOpenResponse = (response) => {
  const openResponse = (response) => {
    document.body.append(response);
    response.classList.add(MODAL_CLASS);
    activateBlur();
    onResponseCloseBtnClick(response);
    document.addEventListener(`keydown`, onEscKeyDown);
  }

  const closeResponse = (response) => {
    response.classList.remove(MODAL_CLASS);
    deactivateBlur();
    document.removeEventListener('keydown', onEscKeyDown);
    response.remove();

    if (response === responseSuccess) {
      closeCall();
    }
  }

  const onEscKeyDown = (evt) => handleEscKeyDown(evt, () => closeResponse(response));

  const onResponseCloseBtnClick = (response) => {
    const closeBtns = response.querySelectorAll('.response__close-btn, .response-btn');

    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        closeResponse(response);
      })
    })
  }

  openResponse(response);
}

export const openResponseSuccess = () => {
  handleOpenResponse(responseSuccess);
}

export const openResponseError = () => {
  handleOpenResponse(responseError);
}
