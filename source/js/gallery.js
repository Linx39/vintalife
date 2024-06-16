import { controlModal } from "./modal.js";

const PRODUCT_ACTIVE_CLASS = 'product--active';

const cards = document.querySelectorAll('.card');
const gallery = document.querySelector('.gallery');
const closeBtns = gallery.querySelectorAll('.gallery__close-btn');

cards.forEach(card => {
  card.addEventListener('click', (evt) => {
    const href = card.querySelector('.card__link').getAttribute('href');
    const product = gallery.querySelector(href);

    evt.preventDefault();
    const handleOpenGallery = () => product.classList.add(PRODUCT_ACTIVE_CLASS);
    const handleCloseGallery = () => product.classList.remove(PRODUCT_ACTIVE_CLASS);

    const {handleModal: handleGallery} = controlModal(gallery, closeBtns, handleOpenGallery, handleCloseGallery);

    handleGallery();
  })
})
