import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { apiRequest } from './js/pixabay-api';
import { render } from './js/render-functions';
const form = document.querySelector('form');
const gallery = document.querySelector('.gallery-list');
function submitHandler(event) {
  event.preventDefault();
  gallery.innerHTML = '<span class="loader"></span>';

  apiRequest(form[0].value)
    .then(data => {
      gallery.innerHTML = '';
      const dataJson = data.hits;
      gallery.insertAdjacentHTML('beforeend', render(dataJson));
      const simpleGallery = new simpleLightbox('.simple-gal', {
        captionsData: 'alt',
      });
      return simpleGallery;
    })
    .then(simpleGallery => {
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
