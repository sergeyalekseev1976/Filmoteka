import { showConfetti } from './confetti';
import { shoot } from './confetti';

const popupTrigger = document.querySelector('.footer-authors');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');

popupTrigger.addEventListener('click', e => {
  setTimeout(showConfetti, 400);
  setTimeout(shoot, 1500);
  setTimeout(shoot, 2500);
  popup.classList.add('show');
  document.body.style.cssText = `overflow: hidden;`;
});

popupClose.addEventListener('click', e => {
  popup.classList.remove('show');
  document.body.style.cssText = '';
});

// close on click on overlay

popup.addEventListener('click', e => {
  if (e.target === popup) {
    popup.classList.remove('show');
    document.body.style.cssText = '';
  }
});

// close on press of escape button

document.addEventListener('keydown', e => {
  if (e.code === 'Escape' && popup.classList.contains('show')) {
    popup.classList.remove('show');
    document.body.style.cssText = '';
  }
});

// =============================================================================================
