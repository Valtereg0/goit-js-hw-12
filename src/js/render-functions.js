// js/render-functions.js
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const button = document.querySelector(".btn");

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(image => {
      return `
        <li class="gallery-item">
          <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </a>
          <div class="info">
            <p><span class="span-info">Likes<br></span>${image.likes}</p>
            <p><span class="span-info">Views<br></span>${image.views}</p>
            <p><span class="span-info">Comments<br></span>${image.comments}</p>
            <p><span class="span-info">Downloads<br></span>${image.downloads}</p>
          </div>
        </li>`;
    })
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
button.classList.remove('is-hidden')
};


export function hideLoadMoreButton() {
  button.classList.add('is-hidden')
};