const ESC_KEY_CODE = 27;
const TAB_KEY_CODE = 9;

export const isEscEvent = (evt) => evt.which === ESC_KEY_CODE;

export const isTabEvent = (evt) => evt.which  === TAB_KEY_CODE;
