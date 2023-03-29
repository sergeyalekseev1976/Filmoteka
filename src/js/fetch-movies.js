import axios from 'axios';
import createMarkUp from './create-mark-up';
import pagination from './pagination';
import { failRequest } from './notifications';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const trendingGallery = document.querySelector('.js-movie-card');

const API_KEY = '687f60735406ee0172c31461de2476ff';

const TREND_URL = `/trending/movie/week`;
const GENRES_URL = `/genre/movie/list`;

// const navCurrentLink = document.querySelector('.js-library-page');

// localStorage.setItem('library-page', JSON.stringify(false));

// navCurrentLink.addEventListener('click', () => {
//   localStorage.setItem('library-page', JSON.stringify(true));
// });

localStorage.setItem('render-key', 'fetch-movies');
axios
  .get(`${GENRES_URL}?api_key=${API_KEY}&language=en-US`)
  .then(genres => localStorage.setItem('genres', JSON.stringify(genres.data)))
  .catch(error => console.error(error));

export async function movieTrending(page = 1) {
  try {
    const response = await axios.get(
      `${TREND_URL}?api_key=${API_KEY}&page=${page}`
    );

    const arr = response.data;

    return arr;
  } catch (error) {
    if (error.response) {
      // Запрос был сделан, и сервер ответил кодом состояния, который
      // выходит за пределы 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // Запрос был сделан, но ответ не получен
      // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
      // http.ClientRequest в node.js
      console.log(error.request);
    } else {
      // Произошло что-то при настройке запроса, вызвавшее ошибку
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
}

movieTrending()
  .then(data => {
    if (data === undefined) {
      failRequest();
      return trendingGallery.insertAdjacentHTML(
        'beforeend',
        `<h1 class="failRequest" >Why did you deliberately break the code?</h1>`
      );
    }
    createMarkUp(data);
    pagination(1, data.total_pages);
  })
  .catch(console.error());
