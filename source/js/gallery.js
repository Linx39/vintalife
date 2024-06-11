import { handleEscKeyDown } from "./utils.js";
import { activateModal, deactivateModal, handleOutModalClick } from "./modal.js";

const PRODUCT_ACTIVE_CLASS = 'product--active';

const cards = document.querySelectorAll('.card');
const gallery = document.querySelector('.gallery');
const closeBtn = gallery.querySelector('.gallery__close-btn');

cards.forEach(card => {
  card.addEventListener('click', (evt) => {
    const href = card.querySelector('.card__link').getAttribute('href');
    const product = gallery.querySelector(href);

    const openGallery = (product) => {
      product.classList.add(PRODUCT_ACTIVE_CLASS);
      activateModal(gallery);
      document.addEventListener(`keydown`, onEscKeyDown);
      document.addEventListener('click', onDocumentClick);
    }

    const closeGallery = (product) => {
      product.classList.remove(PRODUCT_ACTIVE_CLASS);
      deactivateModal(gallery);
      document.removeEventListener('keydown', onEscKeyDown);
      document.removeEventListener('click', onDocumentClick);
    }

    const onEscKeyDown = (evt) => handleEscKeyDown(evt, () => closeGallery(product));
    const onDocumentClick = (evt) => handleOutModalClick(evt, gallery, () => closeGallery(product));

    evt.preventDefault();
    openGallery(product);

    closeBtn.addEventListener('click', () => {
      closeGallery(product);
    })
  })
})
