import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const posterGallery = document.querySelector('.gallery');

export async function getMoviePosters(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=d60997a7e23cda835c1c23368c69f903`
    );

    const arr = response.data.posters;
    return arr;
  } catch (error) {
    console.error(error);
  }
}

export function createMoviePostersGallery(response) {
  posterGallery.innerHTML = '';
  const posterArr = response.slice(0, 14);
  const markup = posterArr
    .map(response => {
      return `<a class="gallery__link" href="https://image.tmdb.org/t/p/w500/${response.file_path}"><img class="gallery__image" src="https://image.tmdb.org/t/p/w500/${response.file_path}" alt="${response.id} loading="lazy" width="50" height="30""/></a>`;
    })
    .join();

  posterGallery.insertAdjacentHTML('beforeend', markup);
  var $gallery = new SimpleLightbox('.gallery a', {});
}
