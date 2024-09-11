import { initModal } from "./modal.js";

const RESPONSE_SUCCESS_CLASS = 'response--success';
const RESPONSE_ERROR_CLASS = 'response--error';

const response = document.querySelector('.response');

const setResponseSuccess = () => {
  response.classList.remove(RESPONSE_ERROR_CLASS);
  response.classList.add(RESPONSE_SUCCESS_CLASS);
};

const setResponseError = () => {
  response.classList.remove(RESPONSE_SUCCESS_CLASS);
  response.classList.add(RESPONSE_ERROR_CLASS);
};

const setResponseDefault = () => {
  response.classList.remove(RESPONSE_ERROR_CLASS);
  response.classList.remove(RESPONSE_SUCCESS_CLASS);
}

const responseModal = initModal(response, null, setResponseDefault);

export {setResponseError, setResponseSuccess};
