import { controlModal } from "./modal.js";

const responseSuccess = document.querySelector('#success').content.querySelector('.response');
const responseError = document.querySelector('#error').content.querySelector('.response');

const openResponse = (response) => {
  const handleOpenResponse = () => document.body.append(response);
  const handleCloseResponse = () => response.remove();

  const {handleModal: handleResponse} = controlModal(response, handleOpenResponse, handleCloseResponse);

  handleResponse();
}

const openResponseSuccess = () => {
  openResponse(responseSuccess);
}

const openResponseError = () => {
  openResponse(responseError);
}

export {openResponseError, openResponseSuccess};
