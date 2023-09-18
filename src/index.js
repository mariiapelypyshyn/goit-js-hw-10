import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { createMarkup, createMarkupCat } from './js/markup';

const refs =  {
    selectEl: document.querySelector('.breed-select'),
    loaderEl: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfoEl: document.querySelector('.cat-info'),
  };

refs.loaderEl.classList.add('visually-hidden');
refs.error.classList.add('visually-hidden');
refs.catInfoEl.classList.add('visually-hidden');

refs.selectEl.addEventListener('change', onValueId);

fetchBreeds()
  .then(arr => {
refs.catInfoEl.classList.remove('visually-hidden');
    return (refs.selectEl.innerHTML = createMarkup(arr.data));
    
  })
  .then(() => slim())
  .catch(fetchError);

function onValueId(e) {
  const id = e.target.value;
  fetchCatByBreed(id)
    .then(obj => {
    refs.catInfoEl.classList.remove('visually-hidden');
      return (refs.catInfoEl.innerHTML = createMarkupCat(obj.data));
    })
    .then(() => success())
    .catch(fetchError);
  refs.loaderEl.classList.remove('visually-hidden');
  refs.catInfoEl.classList.add('visually-hidden');
}

function fetchError() {
  Report.failure(refs.error.textContent, '');
}

function success() {
   refs.loaderEl.classList.add('visually-hidden');
  Notify.success('Search was successful!)', '');
}

function slim() {
  new SlimSelect({
    select: refs.selectEl,
  });
}