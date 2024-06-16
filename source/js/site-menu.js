import { controlModal } from "./modal.js";

const mainNav = document.querySelector('.main-nav');
const siteMenu = mainNav.querySelector('.main-nav__site-menu');
const openBtn = mainNav.querySelector('.main-nav__menu-open-btn');
const closeBtns = mainNav.querySelectorAll('.main-nav__menu-close-btn');

const {handleModal: handleSiteMenu} = controlModal(siteMenu, closeBtns);

openBtn.addEventListener('click', () => {
  handleSiteMenu();
})
