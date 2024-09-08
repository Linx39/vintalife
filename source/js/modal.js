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

let prevModal = null;

const controlModal = (modal, beforeOpen, afterClose) => {
  const modalWrapper = modal.querySelector(`.${MODAL_WRAPPER_CLASS}`);
  const modalCloseBtns = modal.querySelectorAll(`.${MODAL_CLOSE_BTN}`);

  const id = modal.getAttribute('id');
  const modalOpenBtns = document.querySelectorAll(`[data-modal="#${id}"]`);

  const nodes = modal.querySelectorAll(FOCUS_ELEMENTS);

  let lastFocusElement;
  let isModalOpened = false;

  const openModal = (btn) => {
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
    document.addEventListener(`keydown`, onTabKeyDown);
    document.addEventListener('click', onDocumentClick);

    if (beforeOpen) {
      beforeOpen();
    }

    // lastFocusElement = document.activeElement;
    lastFocusElement = btn;
    console.log(document.activeElement);
    isModalOpened = true;
    nodes[0].focus();
  }

  const closeModal = (modal) => {
    body.removeAttribute('style');

    if (fixedElements) {
      fixedElements.forEach(element => {
        element.style.marginRight = ``;
      })
    }

    modal.classList.remove(MODAL_OPENED_CLASS);
    modal.setAttribute('aria-hidden', 'true');

    deactivateBlur();

    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('keydown', onTabKeyDown);
    document.removeEventListener('click', onDocumentClick);

    if (afterClose) {
      afterClose();
    }

    isModalOpened = false;
    lastFocusElement.focus();
    // lastFocusElement = null;
  }

  // const focusRestrict = (evt) => {
  //   if ( isModalOpened && !modalWrapper.contains(evt.target) ) {
  //     evt.stopPropagation();
  //     modalWrapper.focus();
  //   }
  // }

  const focusCatcher = (evt) => {
    // const nodes = modal.querySelectorAll(FOCUS_ELEMENTS);
    const nodesArray = Array.prototype.slice.call(nodes);

    //если фокуса нет в окне, то вставляем фокус на первый элемент
    if (!modal.contains(document.activeElement)) {
      console.log(document.activeElement);
        nodesArray[0].focus();
        evt.preventDefault();
    } else {
        const focusedItemIndex = nodesArray.indexOf(document.activeElement)
        if (evt.shiftKey && focusedItemIndex === 0) {
            //перенос фокуса на последний элемент
            nodesArray[nodesArray.length - 1].focus();
            evt.preventDefault();
        }
        if (!evt.shiftKey && focusedItemIndex === nodesArray.length - 1) {
            //перерос фокуса на первый элемент
            nodesArray[0].focus();
            evt.preventDefault();
        }
    }
  }

  const onTabKeyDown = (evt) => {
    if (isTabEvent(evt) && isModalOpened) {
      evt.preventDefault();
      focusCatcher(evt);
    }
  };

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

  const initModal = () => {
    modalOpenBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        openModal(btn);
      });
    })

    modalCloseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal(modal);
      })
    })

  }

  return {initModal, openModal, closeModal}
}

export {controlModal};
