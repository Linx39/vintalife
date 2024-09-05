import { Width } from "./const.js";

const CATALOG_SLIDER_CLASS = 'catalog__slider';

const catalogSlider = new Swiper(`.${CATALOG_SLIDER_CLASS}`, {
  direction: 'horizontal',
  slidesPerView: 'auto',
  centeredSlides: true,
  loop: true,
  spaceBetween: 20,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,

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
    [Width.SM]: {
      centeredSlides: false,
      slidesOffsetBefore: 27.5,
      slidesOffsetAfter: 27.5,
    },
    [Width.LG]: {
      spaceBetween: 20,
      slidesOffsetBefore: 27.5,
      slidesOffsetAfter: 27.5,
    },
    [Width.XL]: {
      spaceBetween: 30,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
    },
    [Width.XXL]: {
      spaceBetween: 60,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
    },
  },
});
