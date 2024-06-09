const BLUR_CLASS = 'blur';

const body = document.querySelector('.page__body');
const scrollWidth = window.innerWidth - document.documentElement.clientWidth;

const hideScroll = () => {
  body.style.marginRight = `${scrollWidth}px`;
}

const showScroll = () => {
  body.removeAttribute('style');
}

const activateBlur = () => {
  if (!body.classList.contains(BLUR_CLASS)) {
    body.classList.add(BLUR_CLASS);
    hideScroll();
  }
}

const deactivateBlur = () => {
  if (body.classList.contains(BLUR_CLASS)) {
    body.classList.remove(BLUR_CLASS);
    showScroll();
  }
}

const isOnBlurClick = (evt) => evt.target.classList.contains(BLUR_CLASS);

const handleOnBlurClick = (evt, cb) => {
  if (isOnBlurClick(evt)) {
    cb();
  }
}

export {activateBlur, deactivateBlur, handleOnBlurClick};
