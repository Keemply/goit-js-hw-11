import { apiRequest } from './js/pixabay-api';
import { render } from './js/render-functions';
const form = document.querySelector('form');
const gallery = document.querySelector('.gallery-list');
function submitHandler(event) {
  event.preventDefault();
  apiRequest(form[0].value)
    .then(data => {
      const dataJson = data.hits;
      gallery.insertAdjacentHTML('beforeend', render(dataJson));
    })
    .catch(error => {
      // Error handling
      console.log(error);
    });
  form.reset();
}
form.addEventListener('submit', submitHandler);
console.log(form);
