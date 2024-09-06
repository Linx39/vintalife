import { addDecorDarkClass, removeDecorDarkClass } from "./decor.js";

const THEME_DARK_CLASS = 'dark-theme';

const themeToggle = document.querySelector('.theme-toggle');
const page = document.querySelector('.page');
const logo = document.querySelector('.main-nav__logo img');

const setLightTheme = () => {
  page.classList.remove(THEME_DARK_CLASS);
  logo.src = './img/logo-dark.svg';
  removeDecorDarkClass();
}

const setDarkTheme = () => {
  page.classList.add(THEME_DARK_CLASS);
  logo.src = './img/logo-light.svg';
  addDecorDarkClass();
}

themeToggle.addEventListener('click', () => {
  if (page.classList.contains(THEME_DARK_CLASS)) {
    setLightTheme();
  } else {
    setDarkTheme();
  }

  localStorage.setItem(THEME_DARK_CLASS, page.classList.contains(THEME_DARK_CLASS));
})

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem(THEME_DARK_CLASS) === 'true') {
      setDarkTheme();
  }
});
