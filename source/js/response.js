import { handleModal } from "./modal.js";
import { closeCall } from "./call-btn.js";

const responseSuccess = document.querySelector('#success').content.querySelector('.response');
const responseError = document.querySelector('#error').content.querySelector('.response');

const openResponse = (response) => {
  // const closeResponse = (response) => {
  //   deactivateModal(response);
  //   document.removeEventListener('keydown', onEscKeyDown);
  //   document.removeEventListener('click', onDocumentClick);
  //   response.remove();

  //   if (response === responseSuccess) {
  //     closeCall();
  //   }
  // }

  const handleOpenResponse = () => document.body.append(response);
  const handleCloseResponse = () => response.remove();

  const closeBtns = response.querySelectorAll('.response__close-btn, .response-btn');

  handleModal(response, closeBtns, handleCloseResponse, handleOpenResponse);
}

const openResponseSuccess = () => {
  openResponse(responseSuccess);
}

const openResponseError = () => {
  openResponse(responseError);
}

export {openResponseError, openResponseSuccess};
