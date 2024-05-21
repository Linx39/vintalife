const BLUR_CLASS = 'blur';

const body = document.querySelector('.page__body');

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
