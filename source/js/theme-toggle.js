import { addDecorDarkClass, removeDecorDarkClass } from "./decor.js";

const THEME_DARK_CLASS = 'dark-theme';

const themeToggle = document.querySelector('.theme-toggle');
const page = document.querySelector('.page');

const setLightTheme = () => {
  page.classList.remove(THEME_DARK_CLASS);
  removeDecorDarkClass();
}

const setDarkTheme = () => {
  page.classList.add(THEME_DARK_CLASS);
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
