import axios from 'axios';
import createMarkUp from './create-mark-up';
import { movieTrending } from './fetch-movies';
import pagination from './pagination';
import {
  noMatchesNotification,
  emptyQueryNotification,
  errorNotification,
} from './notifications';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

Loading.init({
  svgSize: '120px',
  svgColor: '#c4c4c4',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
});

const trendingGallery = document.querySelector('.js-movie-card');

const searchInput = document.querySelector('.js-search-input');
const searchForm = document.querySelector('.js-search-form');
searchForm.addEventListener('submit', onSearchSubmit);

export function onSearchSubmit(evt) {
  Loading.circle();
  evt.preventDefault();
  clearMarkup();
  const searchQuery = searchInput.value.trim();

  if (searchQuery == '') {
    emptyQueryNotification();
    returnToMain();
  } else {
    goSearch(searchQuery, 1).then(function (response) {
      if (!response) {
        noMatchesNotification();
        returnToMain();
      } else {
        if (response.results.length === 0) {
          noMatchesNotification();
          returnToMain();
        } else {
          localStorage.setItem('film-name', searchQuery);
          createMarkUp(response);
          pagination(1, response.total_pages);
        }
      }
    });
  }

  localStorage.setItem('render-key', 'search-movies');
  evt.currentTarget.reset();
}

export default async function goSearch(query, page = 1) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=d60997a7e23cda835c1c23368c69f903&query=${query}&page=${page}`
    );
    const arr = response.data;
    return arr;
  } catch (error) {
    returnToMain();
    errorNotification();
    // console.error(error);
  }
}

export function clearMarkup() {
  trendingGallery.innerHTML = '';
}

function returnToMain() {
  movieTrending()
    .then(data => {
      createMarkUp(data);
      pagination(1, data.total_pages);
    })
    .catch(console.error());
}
