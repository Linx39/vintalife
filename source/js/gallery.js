import { isEscEvent } from "./utils.js";
import { activateBlur, deactivateBlur, hideScroll, showScroll } from "./blur.js";

const MODAL_CLASS = 'modal';
const PRODUCT_ACTIVE_CLASS = 'product--active';

const cards = document.querySelectorAll('.card');
const gallery = document.querySelector('.gallery');
const closeBtn = gallery.querySelector('.gallery__close-btn');

cards.forEach(card => {
  card.addEventListener('click', (evt) => {
    const href = evt.currentTarget.getAttribute('href');
    const product = gallery.querySelector(href);

    const openGallery = (product) => {
      gallery.classList.add(MODAL_CLASS);
      product.classList.add(PRODUCT_ACTIVE_CLASS);
      activateBlur();
      hideScroll();
      document.addEventListener(`keydown`, onEscKeydown);
    }

    const closeGallery = (product) => {
      gallery.classList.remove(MODAL_CLASS);
      product.classList.remove(PRODUCT_ACTIVE_CLASS);
      deactivateBlur();
      showScroll();
      document.removeEventListener('keydown', onEscKeydown);
    }

    const onEscKeydown = (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        closeGallery(product);
      }
    }

    evt.preventDefault();
    openGallery(product);

    closeBtn.addEventListener('click', () => {
      closeGallery(product);
    })
  })
})
