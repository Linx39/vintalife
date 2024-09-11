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

const initModal = (modalClass, beforeOpen, afterClose) => {
  const modal = {
    close: null,
    open: null,
  }

  const modalWrapper = modalClass.querySelector(`.${MODAL_WRAPPER_CLASS}`);
  const modalCloseBtns = modalClass.querySelectorAll(`.${MODAL_CLOSE_BTN}`);
  const id = modalClass.getAttribute('id');
  const modalOpenBtns = document.querySelectorAll(`[data-modal="#${id}"]`);
  const nodes = modalClass.querySelectorAll(FOCUS_ELEMENTS);
  // let isModalOpened = false;
  const nodesArray = [...nodes];

  const openModal = () => {
    if (prevModal) {
      prevModal.close();
    }

    if (beforeOpen) {
      beforeOpen();
    }

    lastFocusElement = document.activeElement;
    // isModalOpened = true;

    const scrollYWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflowY = 'hidden';
    body.style.marginRight = `${scrollYWidth}px`;

    if (fixedElements) {
      fixedElements.forEach(element => {
        element.style.marginRight = `${scrollYWidth}px`;
      })
    }

    modalClass.classList.add(MODAL_OPENED_CLASS);
    modalClass.setAttribute('aria-hidden', 'false');
    modalClass.style.marginRight = `${scrollYWidth}px`;

    activateBlur();

    document.addEventListener(`keydown`, onEscKeyDown);
    document.addEventListener(`keydown`, onTabKeyDown);
    document.addEventListener('click', onDocumentClick);

    prevModal = modal;

    nodesArray[0].focus();
    console.log(document.activeElement);
  }

  const closeModal = () => {
    body.removeAttribute('style');

    if (fixedElements) {
      fixedElements.forEach(element => {
        element.style.marginRight = ``;
      })
    }

    modalClass.classList.remove(MODAL_OPENED_CLASS);
    modalClass.setAttribute('aria-hidden', 'true');

    deactivateBlur();

    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('keydown', onTabKeyDown);
    document.removeEventListener('click', onDocumentClick);

    prevModal = null;
    // isModalOpened = false;

    if (afterClose) {
      afterClose();
    }

    lastFocusElement.focus();
  }

  const loopFocus = (evt) => {
    if (!modalClass.contains(document.activeElement)) {
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
    if (modalClass.contains(evt.target) && !modalWrapper.contains(evt.target)) {
      closeModal();
    }
  }

  modal.close = closeModal;
  modal.open = openModal;

  modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // openModal();
      modal.open();
    });
  })

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // closeModal();
      modal.close();
    })
  })

  // modal.close = closeModal;
  // modal.open = openModal;

  return {modal}
}

export {initModal};
