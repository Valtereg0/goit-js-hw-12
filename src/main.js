import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.btn');


let pageCurrent = 1;
let queryCurrent = '';


form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const query = input.value.trim();


  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  queryCurrent = query;
  pageCurrent = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

 try {
    const data = await getImagesByQuery(queryCurrent, pageCurrent);

    if (data.hits.length === 0) {
      iziToast.info({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        backgroundColor: '#ff4c4c',
        position: 'topRight',
      });
    } else {
      createGallery(data.hits);
      if (data.totalHits > pageCurrent * 20) {
        showLoadMoreButton();
      }
   }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});



loadMoreBtn.addEventListener('click', async function () {
  pageCurrent += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(queryCurrent, pageCurrent);
    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / 20);
    if (pageCurrent >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

