const SITE_MENU_OPENED_CLASS = 'main-nav__site-menu--opened'

const mainNav = document.querySelector('.main-nav');
const siteMenu = mainNav.querySelector('.main-nav__site-menu');
const menuOpenBtn = mainNav.querySelector('.main-nav__menu-open-btn');
const menuCloseBtn = mainNav.querySelector('.main-nav__menu-close-btn');

menuOpenBtn.addEventListener('click', () => {
  if (!siteMenu.classList.contains(SITE_MENU_OPENED_CLASS)) {
    siteMenu.classList.add(SITE_MENU_OPENED_CLASS);
  }
})

menuCloseBtn.addEventListener('click', () => {
  if (siteMenu.classList.contains(SITE_MENU_OPENED_CLASS)) {
    siteMenu.classList.remove(SITE_MENU_OPENED_CLASS);
  }
})
