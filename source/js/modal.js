import { isEscEvent } from "./utils.js";
import { activateBlur, deactivateBlur } from "./blur.js";
import { scrollUp } from "./scroll-up.js";

// const MODAL_CLASS = 'modal';

const MODAL_WRAPPER_CLASS ='modal__wrapper';
const MODAL_OPENED_CLASS = 'modal--opened';
const MODAL_CLOSE_BTN = 'modal__close-btn';

const body = document.querySelector('.page__body');

const fixedElements = [scrollUp];

let prevModal = null;

const controlModal = (modal, beforeOpen, afterClose) => {
  const modalWrapper = modal.querySelector(`.${MODAL_WRAPPER_CLASS}`);
  const modalCloseBtns = modal.querySelectorAll(`.${MODAL_CLOSE_BTN}`);

  const id = modal.getAttribute('id');
  const modalOpenBtns = document.querySelectorAll(`[data-modal="#${id}"]`);

  const openModal = () => {
    if (prevModal) {
      closeModal(prevModal);
    }

    prevModal = modal;

    const scrollYWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflowY = 'hidden';
    body.style.marginRight = `${scrollYWidth}px`;

    if (fixedElements) {
      fixedElements.forEach(element => {
        element.style.marginRight = `${scrollYWidth}px`;
      })
    }

    modal.classList.add(MODAL_OPENED_CLASS);
    modal.setAttribute('aria-hidden', 'false');
    modal.style.marginRight = `${scrollYWidth}px`;

    activateBlur();

    document.addEventListener(`keydown`, onEscKeyDown);
    document.addEventListener('click', onDocumentClick);

    if (beforeOpen) {
      beforeOpen();
    }
  }

  const closeModal = (modal) => {
    body.removeAttribute('style');

    if (fixedElements) {
      fixedElements.forEach(element => {
        element.style.marginRight = ``;
      })
    }

    modal.classList.remove(MODAL_OPENED_CLASS);
    modal.setAttribute('aria-hidden', 'true'),

    deactivateBlur();

    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onDocumentClick);

    if (afterClose) {
      afterClose();
    }
  }

  const onEscKeyDown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal(modal);
    }
  };

  const onDocumentClick = (evt) => {
    if (modal.contains(evt.target) && !modalWrapper.contains(evt.target)) {
      closeModal(modal);
    }
  }

  const handleModal = () => {
    modalOpenBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        openModal();
      });
    })

    modalCloseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal(modal);
      })
    })

  }

  return {openModal, closeModal, handleModal}
}

export {controlModal};
