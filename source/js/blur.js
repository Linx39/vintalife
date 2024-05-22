const BLUR_CLASS = 'blur';
const BLUR_HIDE_SCROLL_CLASS = 'blur--hide-scroll'

const body = document.querySelector('.page__body');

export const hideScroll = () => {
  const scrollWidth = window.innerWidth - document.documentElement.clientWidth;

  if (!body.classList.contains(BLUR_HIDE_SCROLL_CLASS)) {
    body.classList.add(BLUR_HIDE_SCROLL_CLASS);
    body.style.marginRight = `${scrollWidth}px`;
  }
}

export const showScroll = () => {
  if (body.classList.contains(BLUR_HIDE_SCROLL_CLASS)) {
    body.classList.remove(BLUR_HIDE_SCROLL_CLASS);
    body.removeAttribute('style');
  }
}

export const activateBlur = () => {
  if (!body.classList.contains(BLUR_CLASS)) {
    body.classList.add(BLUR_CLASS);
  }
}

export const deactivateBlur = () => {
  if (body.classList.contains(BLUR_CLASS)) {
    body.classList.remove(BLUR_CLASS);
  }
}

export const isOnBlurClick = (evt) => evt.target.classList.contains(BLUR_CLASS);
