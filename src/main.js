import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { apiRequest } from './js/pixabay-api';
import { render } from './js/render-functions';
const form = document.querySelector('form');
const gallery = document.querySelector('.gallery-list');
const loader = document.querySelector('.loader');
const simpleGallery = new simpleLightbox('.simple-gal', {
  captionsData: 'alt',
});
function showLoader() {
  loader.classList.remove('is-hidden');
}
function hideLoader() {
  loader.classList.add('is-hidden');
}
function submitHandler(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  showLoader();
  apiRequest(form[0].value)
    .then(data => {
      hideLoader();
      const dataJson = data.hits;
      gallery.insertAdjacentHTML('beforeend', render(dataJson));
    })
    .then(() => {
      simpleGallery.refresh();
    })
    .catch(error => {
      // Error handling
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    });

  form.reset();
}
form.addEventListener('submit', submitHandler);
