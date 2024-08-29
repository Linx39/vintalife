import { Width } from "./const.js";

const CATALOG_SLIDER_CLASS = 'catalog__slider';

const catalogSlider = new Swiper(`.${CATALOG_SLIDER_CLASS}`, {
  direction: 'horizontal',
  slidesPerView: 'auto',
  spaceBetween: 20,
  slidesOffsetBefore: 20,
  slidesOffsetAfter: 20,

  // autoplay: {
  //   delay: 3000,
  //   pauseOnMouseEnter: true,
  // },

  navigation: {
    prevEl: '.catalog__slider-navigation-btn--prev',
    nextEl: '.catalog__slider-navigation-btn--next',
    disabledClass: 'navigation-btn--disabled',
  },

  breakpoints: {
    [Width.LG]: {
      slidesPerView: 'auto',
      spaceBetween: 20,
      slidesOffsetBefore: 20,
      slidesOffsetAfter: 20,
    },
    [Width.XL]: {
      slidesPerView: 'auto',
      spaceBetween: 30,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
    },
    [Width.XXL]: {
      slidesPerView: 'auto',
      spaceBetween: 60,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
    },
  },
});
