import { isEscEvent, isTabEvent } from "./utils.js";
import { activateBlur, deactivateBlur } from "./blur.js";
import { scrollUp } from "./scroll-up.js";

// const MODAL_CLASS = 'modal';

const FOCUS_ELEMENTS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])'
];
const MODAL_WRAPPER_CLASS ='modal__wrapper';
const MODAL_OPENED_CLASS = 'modal--opened';
const MODAL_CLOSE_BTN = 'modal__close-btn';

const body = document.querySelector('.page__body');
const fixedElements = [scrollUp];
let prevModal;
let lastFocusElement;

const initModal = (modalElement, beforeOpen, afterClose) => {
  const modalWrapper = modalElement.querySelector(`.${MODAL_WRAPPER_CLASS}`);
  const modalCloseBtns = modalElement.querySelectorAll(`.${MODAL_CLOSE_BTN}`);
  const id = modalElement.getAttribute('id');
  const modalOpenBtns = document.querySelectorAll(`[data-modal="#${id}"]`);
  const nodes = modalElement.querySelectorAll(FOCUS_ELEMENTS);
  const nodesArray = [...nodes];

  const openModal = () => {
    if (beforeOpen) {
      beforeOpen();
    }

    const scrollYWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflowY = 'hidden';
    body.style.marginRight = `${scrollYWidth}px`;

    if (fixedElements) {
      fixedElements.forEach(element => {
        element.style.marginRight = `${scrollYWidth}px`;
      })
    }

    modalElement.classList.add(MODAL_OPENED_CLASS);
    modalElement.setAttribute('aria-hidden', 'false');
    modalElement.style.marginRight = `${scrollYWidth}px`;

    activateBlur();

    document.addEventListener(`keydown`, onEscKeyDown);
    document.addEventListener(`keydown`, onTabKeyDown);
    document.addEventListener('click', onDocumentClick);

    // nodesArray[0].focus();
  }

  const closeModal = () => {
    body.removeAttribute('style');

    if (fixedElements) {
      fixedElements.forEach(element => {
        element.style.marginRight = ``;
      })
    }

    modalElement.classList.remove(MODAL_OPENED_CLASS);
    modalElement.setAttribute('aria-hidden', 'true');

    deactivateBlur();

    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('keydown', onTabKeyDown);
    document.removeEventListener('click', onDocumentClick);

    if (afterClose) {
      afterClose();
    }
  }

  const loopFocus = (evt) => {
    if (!modalElement.contains(document.activeElement)) {
      evt.preventDefault();
      nodesArray[0].focus();
    } else {
      const focusedItemIndex = nodesArray.indexOf(document.activeElement)

      if (evt.shiftKey && focusedItemIndex === 0) {
        evt.preventDefault();
        nodesArray[nodesArray.length - 1].focus();
      }
      if (!evt.shiftKey && focusedItemIndex === nodesArray.length - 1) {
        evt.preventDefault();
        nodesArray[0].focus();
      }
    }
  }

  const onTabKeyDown = (evt) => {
    if (isTabEvent(evt)) {
      loopFocus(evt);
    }
  };

  const onEscKeyDown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal();
    }
  };

  const onDocumentClick = (evt) => {
    if (modalElement.contains(evt.target) && !modalWrapper.contains(evt.target)) {
      closeModal();
    }
  }

  const modal = {
    element: modalElement,
    close() {closeModal()},
    open() {openModal()},
  }

  modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if(!prevModal) {
        lastFocusElement = btn;
      }

      if (prevModal) {
        prevModal.close();
      }

      modal.open();

      prevModal = modal;
    });
  })

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.close();

      prevModal = null;

      lastFocusElement.focus();
    })
  })

  // return modal;
}

export {initModal};
