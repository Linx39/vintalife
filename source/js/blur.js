const BLUR_ACTIVE_CLASS = 'blur--active';

const blur = document.querySelector('.blur');

export const activateBlur = () => {
  if (!blur.classList.contains(BLUR_ACTIVE_CLASS)) {
    blur.classList.add(BLUR_ACTIVE_CLASS);
  }
}

export const deactivateBlur = () => {
  if (blur.classList.contains(BLUR_ACTIVE_CLASS)) {
    blur.classList.remove(BLUR_ACTIVE_CLASS);
  }
}
