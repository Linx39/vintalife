import { addDecorDarkClass, removeDecorDarkClass } from "./decor.js";

const THEME_DARK_CLASS = 'dark';

const themeToggle = document.querySelector('.theme-toggle');
const page = document.querySelector('.page');
const logo = document.querySelector('.main-nav__logo img');

document.addEventListener('DOMContentLoaded', () => {
  if (page.classList.contains(THEME_DARK_CLASS)) {
    logo.src = './img/logo-light.svg';
  }
})

themeToggle.addEventListener('click', () => {
  if (page.classList.contains(THEME_DARK_CLASS)) {
    page.classList.remove(THEME_DARK_CLASS);
    logo.src = './img/logo-dark.svg';
    removeDecorDarkClass();
  } else {
    page.classList.add(THEME_DARK_CLASS);
    logo.src = './img/logo-light.svg';
    addDecorDarkClass();
  }
})
