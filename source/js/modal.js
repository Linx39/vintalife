import { isEscEvent } from "./utils.js";

const MODAL_CLASS = 'modal';

const body = document.querySelector('.page__body');

const getModalElementsCount = () => document.querySelectorAll(`.${MODAL_CLASS}`).length;

const controlModal = (element, closeBtns, onOpenModal, onCloseModal) => {
  const openModal = () => {
    const documentWidth = document.documentElement.clientWidth;
    const scrollYWidth = window.innerWidth - documentWidth;

    if (!element.classList.contains(MODAL_CLASS)) {
      body.style.overflowY = 'hidden';

      if (getModalElementsCount() === 0) {
        body.style.marginRight = `${scrollYWidth}px`;
      }

      element.classList.add(MODAL_CLASS);

      document.addEventListener(`keydown`, onEscKeyDown);
      document.addEventListener('click', onDocumentClick);
      if (onOpenModal) {
        onOpenModal();
      }
    }
  }

  const closeModal = () => {
    if (element.classList.contains(MODAL_CLASS)) {
      if (getModalElementsCount() === 1) {
        body.removeAttribute('style');
      }

      element.removeAttribute('style');
      element.classList.remove(MODAL_CLASS);

      document.removeEventListener('keydown', onEscKeyDown);
      document.removeEventListener('click', onDocumentClick);
      if (onCloseModal) {
        onCloseModal();
      }
    }
  }

  const onEscKeyDown = (evt) => {
    if (isEscEvent(evt)) {
      console.log(evt);
      evt.preventDefault();
      closeModal();
    }
  };

  const onDocumentClick = (evt) => {
    const isOutModalClick = (evt, element) => evt.target === element && evt.target.classList.contains(MODAL_CLASS);

    if (isOutModalClick(evt, element)) {
      closeModal();
    }
  };

  const handleModal = () => {
    openModal();

    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal();;
      })
    })

  }

  return {openModal, closeModal, handleModal}
}

export {controlModal};
