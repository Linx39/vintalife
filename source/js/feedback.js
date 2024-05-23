const RESPONSE_CLOSED_CLASS = 'call__response--closed';

const feedbackForms = document.querySelectorAll('.feedback__form');

feedbackForms.forEach(form => {
  const inputs = form.querySelectorAll('.feedback__input');
  const submitBtn = form.querySelector('.feedback__submit-btn');

  let isFormValid = true;

  submitBtn.addEventListener('click', () => {
    if(isFormValid) {

    }
  })
})

