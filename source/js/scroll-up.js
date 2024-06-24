const SCROLL_UP_SHOW_CLASS = 'scroll-up--show';
const SCROLL_HEIGHT = 300;

const scrollUp = document.querySelector('#scroll-up').content.querySelector('.scroll-up');

document.addEventListener('DOMContentLoaded', () => {
  document.body.append(scrollUp);

  const btnUp = document.querySelector('.btn-up');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > SCROLL_HEIGHT) {
      scrollUp.classList.add(SCROLL_UP_SHOW_CLASS);
    } else {
      scrollUp.classList.remove(SCROLL_UP_SHOW_CLASS);
    }
  });


  btnUp.addEventListener('click', (evt) => {
    evt.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
})
