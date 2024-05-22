import {isEscEvent} from "./utils.js";
import { activateBlur, deactivateBlur, isOnBlurClick, hideScroll, showScroll } from "./blur.js";

const SITE_MENU_OPENED_CLASS = 'main-nav__site-menu--opened'

const mainNav = document.querySelector('.main-nav');
const siteMenu = mainNav.querySelector('.main-nav__site-menu');
const openBtn = mainNav.querySelector('.main-nav__menu-open-btn');
const closeBtn = mainNav.querySelector('.main-nav__menu-close-btn');

const openSiteMenu = () => {
  siteMenu.classList.add(SITE_MENU_OPENED_CLASS);
  activateBlur();
  hideScroll();
  document.addEventListener(`keydown`, onEscKeydown);
  document.addEventListener('click', onDocumentClick);
}

const closeSiteMenu = () => {
  siteMenu.classList.remove(SITE_MENU_OPENED_CLASS);
  deactivateBlur();
  showScroll();
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onDocumentClick);
}

openBtn.addEventListener('click', () => {
  if (!siteMenu.classList.contains(SITE_MENU_OPENED_CLASS)) {
    openSiteMenu();
  }
})

closeBtn.addEventListener('click', () => {
  if (siteMenu.classList.contains(SITE_MENU_OPENED_CLASS)) {
    closeSiteMenu();
  }
})

const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSiteMenu();
  }
}

const onDocumentClick = (evt) => {
  if (isOnBlurClick(evt)) {
    closeSiteMenu();
  }
}
