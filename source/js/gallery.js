import {isEscEvent} from "./utils.js";
import { activateBlur, deactivateBlur, isOnBlurClick } from "./blur.js";

const GALLERY_ACTIVE_CLASS = 'gallery--active';
const PRODUCT_ACTIVE_CLASS = 'product--active';

const cardLinks = document.querySelectorAll('.card__link');
const gallery = document.querySelector('.gallery');
const closeBtn = gallery.querySelector('.gallery__close-btn');

cardLinks.forEach(link => {
  link.addEventListener('click', (evt) => {
    const href = evt.target.getAttribute('href');
    const product = gallery.querySelector(href);

    const openCatalogProducts = (product) => {
      gallery.classList.add(GALLERY_ACTIVE_CLASS);
      product.classList.add(PRODUCT_ACTIVE_CLASS);
      activateBlur();
      document.addEventListener(`keydown`, onEscKeydown);
      document.addEventListener('click', onDocumentClick);
    }

    const closeCatalogProducts = (product) => {
      gallery.classList.remove(GALLERY_ACTIVE_CLASS);
      product.classList.remove(PRODUCT_ACTIVE_CLASS);
      deactivateBlur();
      document.removeEventListener('keydown', onEscKeydown);
      document.removeEventListener('click', onDocumentClick);
    }

    const onEscKeydown = (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        closeCatalogProducts(product);
      }
    }

    const onDocumentClick = (evt) => {
      if (isOnBlurClick(evt)) {
        closeCatalogProducts(product);
      }
    }

    evt.preventDefault();
    openCatalogProducts(product);

    closeBtn.addEventListener('click', () => {
      closeCatalogProducts(product);
    })
  })
})
