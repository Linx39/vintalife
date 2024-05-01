import { Width } from "./const.js";

const CATALOG_SLIDER_CLASS = 'catalog__slider';
// const CATALOG_SLIDER_NO_JS_CLASS = 'catalog__slider--no-js';

const catalogSliderElement = document.querySelector(`.${CATALOG_SLIDER_CLASS}`);

// catalogSliderElement.classList.remove(CATALOG_SLIDER_NO_JS_CLASS);

const catalogSlider = new Swiper(`.${CATALOG_SLIDER_CLASS}`, {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 'auto',
  slidesPerGroup: 1,
  spaceBetween: 10,

  breakpoints: {
    [Width.MD]: {
      slidesPerView: 'auto',
      slidesPerGroup: 2,
      spaceBetween: 20,
    },
    [Width.LG]: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
    },
    [Width.XL]: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
    },
    [Width.XXL]: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 60,
    },
  },

  navigation: {
    prevEl: '.catalog__slider-navigation-btn--prev',
    nextEl: '.catalog__slider-navigation-btn--next',
    // disabledClass: 'needle-btn--disabled'
  },
});
