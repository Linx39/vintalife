import { controlModal } from "./modal.js";

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', (evt) => {
    const href = card.querySelector('.card__link').getAttribute('href');
    const modal = document.querySelector(href);

    evt.preventDefault();
    const {handleModal} = controlModal(modal);

    handleModal();
  })
})
