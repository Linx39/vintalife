import { isEscEvent } from "./utils.js";

const SCROLL_HEIGHT = 100;
const SITE_MENU_OPENED_CLASS = 'main-nav__site-menu--opened';

const mainNav = document.querySelector('.main-nav');
const siteMenu = mainNav.querySelector('.main-nav__site-menu');
const openBtn = mainNav.querySelector('.main-nav__site-menu-open-btn');
const closeBtn = mainNav.querySelector('.main-nav__site-menu-close-btn');

let isOpenedSiteMenu = false;

const openSiteMenu = () => {
  siteMenu.classList.add(SITE_MENU_OPENED_CLASS);
  siteMenu.setAttribute('aria-hidden', 'false');

  document.addEventListener(`keydown`, onEscKeyDown);
  document.addEventListener('click', onDocumentClick);

  isOpenedSiteMenu = true;
};

const closeSiteMenu = () => {
  siteMenu.classList.remove(SITE_MENU_OPENED_CLASS);
  siteMenu.setAttribute('aria-hidden', 'true');

  document.removeEventListener('keydown', onEscKeyDown);
  document.removeEventListener('click', onDocumentClick);

  isOpenedSiteMenu = false;
};

const onEscKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSiteMenu();
  }
};

const onDocumentClick = (evt) => {
  if (document.contains(evt.target) && !siteMenu.contains(evt.target) &&!openBtn.contains(evt.target)) {
    closeSiteMenu();
  }
}

openBtn.addEventListener('click', openSiteMenu);

closeBtn.addEventListener('click', closeSiteMenu);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > SCROLL_HEIGHT && isOpenedSiteMenu) {
    closeSiteMenu();
    isOpenedSiteMenu = true;
  }

  if (window.pageYOffset <= SCROLL_HEIGHT && isOpenedSiteMenu) {
    openSiteMenu();
  }
});


const siteList = document.querySelectorAll('.site-list');

siteList.forEach(list => {
  const links = list.querySelectorAll('.site-list__link');

  links.forEach(link => {
    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      const element = document.querySelector(link.getAttribute('href'));
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      closeSiteMenu();
    });
  })
})
