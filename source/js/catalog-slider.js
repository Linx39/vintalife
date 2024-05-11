import { Width } from "./const.js";

const CATALOG_CLASS = 'catalog';
const CATALOG_SLIDER_CLASS = 'catalog__slider';
const CATALOG_NO_JS_CLASS = 'catalog--no-js';

const catalogElement = document.querySelector(`.${CATALOG_CLASS}`);

if (catalogElement.classList.contains(CATALOG_NO_JS_CLASS)) {
  catalogElement.classList.remove(CATALOG_NO_JS_CLASS);
}

const catalogSlider = new Swiper(`.${CATALOG_SLIDER_CLASS}`, {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 30,
  slidesOffsetBefore: 30,
  slidesOffsetAfter: 30,

  // autoplay: {
  //   delay: 3000,
  //   pauseOnMouseEnter: true,
  // },

  breakpoints: {
    [Width.MD]: {
      slidesPerView: 'auto',
      spaceBetween: 30,
      slidesOffsetBefore: 30,
      slidesOffsetAfter: 30,
    },
    [Width.LG]: {
      slidesPerView: 'auto',
      spaceBetween: 40,
      slidesOffsetBefore: 30,
      slidesOffsetAfter: 30,
    },
    [Width.XXL]: {
      slidesPerView: 3,
      spaceBetween: 40,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
    },
    [Width.XXXL]: {
      slidesPerView: 3,
      spaceBetween: 60,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
    },
  },

  navigation: {
    prevEl: '.catalog__slider-navigation-btn--prev',
    nextEl: '.catalog__slider-navigation-btn--next',
  },
});
