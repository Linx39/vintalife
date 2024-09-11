import { initModal } from "./modal.js";

const products = document.querySelectorAll('.product');

products.forEach(element => {
  const productModal = initModal(element);
})
