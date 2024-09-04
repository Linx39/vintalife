import { isEscEvent } from "./utils.js";
import { activateBlur, deactivateBlur } from "./blur.js";

const MODAL_CLASS = 'modal';

const MODAL_WRAPPER_CLASS ='modal__wrapper';
const MODAL_OPENED_CLASS = 'modal--opened';
const MODAL_CLOSE_BTN = 'modal__close-btn';

const body = document.querySelector('.page__body');

const controlModal = (modal, onOpenModal, onCloseModal) => {
  const modalWrapper = modal.querySelector(`.${MODAL_WRAPPER_CLASS}`);
  const modalCloseBtns = modal.querySelectorAll(`.${MODAL_CLOSE_BTN}`);
  const id = modal.getAttribute('id');
  console.log(id);
  const modalOpenBtn = document.querySelector(`#${id}`);
  console.log(modalOpenBtn);

  const openModal = () => {
    const scrollYWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflowY = 'hidden';
    body.style.marginRight = `${scrollYWidth}px`;

    modal.classList.add(MODAL_OPENED_CLASS);
    modal.style.marginRight = `${scrollYWidth}px`;

    activateBlur();

    document.addEventListener(`keydown`, onEscKeyDown);
    document.addEventListener('click', onDocumentClick);

    if (onOpenModal) {
      onOpenModal();
    }
  }

  const closeModal = () => {
    body.removeAttribute('style');

    modal.classList.remove(MODAL_OPENED_CLASS);

    deactivateBlur();

    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onDocumentClick);

    if (onCloseModal) {
      onCloseModal();
    }
  }

  const onEscKeyDown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal();
    }
  };

  const onDocumentClick = (evt) => {
    if (modal.contains(evt.target) && !modalWrapper.contains(evt.target)) {
      closeModal();
    }
  }

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal();
    })
  })

  const handleModal = () => {
    openModal();

    modalCloseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal();
      })
    })

  }

  return {openModal, closeModal, handleModal}
}

export {controlModal};
