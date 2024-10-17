import { Width } from "./const.js";

const CATALOG_SLIDER_CLASS = 'catalog__slider';

const catalogSlider = new Swiper(`.${CATALOG_SLIDER_CLASS}`, {
  slidesPerView: 'auto',
  spaceBetween: 20,
  slidesOffsetBefore: 27.5,
  slidesOffsetAfter: 27.5,

  navigation: {
    prevEl: '.catalog__slider-navigation-btn--prev',
    nextEl: '.catalog__slider-navigation-btn--next',
    disabledClass: 'navigation-btn--disabled',
  },

  breakpoints: {
    [Width.LG]: {
      slidesPerView: 'auto',
      spaceBetween: 20,
      slidesOffsetBefore: 27.5,
      slidesOffsetAfter: 27.5,
    },
    [Width.XL]: {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
    },
    [Width.XXL]: {
      spaceBetween: 40,
    },
    [Width.MAX]: {
      slidesPerView: 3,
      spaceBetween: 60,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
    },
  },
});
