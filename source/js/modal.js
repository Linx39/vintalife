import { isEscEvent } from "./utils.js";

const MODAL_CLASS = 'modal';

const body = document.querySelector('.page__body');
const documentWidth = document.documentElement.clientWidth;
const scrollYWidth = window.innerWidth - documentWidth;

const handleModal = (element, closeBtns, onCloseModal, onOpenModal) => {
  const activateModal = () => {
    if (!element.classList.contains(MODAL_CLASS)) {
      body.style.overflowY = 'hidden';
      body.style.marginRight = `${scrollYWidth}px`;
      element.style.width = `${documentWidth}px`;
      element.classList.add(MODAL_CLASS);
      document.addEventListener(`keydown`, onEscKeyDown);
      document.addEventListener('click', onDocumentClick);
      if (onOpenModal) {
        onOpenModal();
      }
    }
  }

  const deactivateModal = () => {
    if (element.classList.contains(MODAL_CLASS)) {
      body.removeAttribute('style');
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
    console.log(evt.target);
    console.log(element);
    if (isEscEvent(evt)) {
      evt.preventDefault();
      deactivateModal();
    }
  };

  const onDocumentClick = (evt) => {
    const isOutModalClick = (evt, element) => evt.target === element && evt.target.classList.contains(MODAL_CLASS);

    if (isOutModalClick(evt, element)) {
      deactivateModal();
    }
  };

  activateModal();

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      deactivateModal();;
    })
  })
}

export {handleModal};
