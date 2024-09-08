export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const isTabEvent = (evt) => evt.which  === 9;

export const handleEscKeyDown = (evt, cb) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    cb();
  }
}
