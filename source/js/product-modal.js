import { controlModal } from "./modal.js";

const productsModal = document.querySelectorAll('.product');

productsModal.forEach(modal => {
  const {initModal} = controlModal(modal);
  initModal();
})
