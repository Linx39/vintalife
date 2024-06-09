export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const handleEscKeyDown = (evt, cb) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    cb();
  }
}
