import { Loading } from 'notiflix/build/notiflix-loading-aio';
import comingSoon from '../images/coming-soon.jpg';
const trendingGallery = document.querySelector('.js-movie-card');

Loading.init({
  svgSize: '120px',
  svgColor: '#c4c4c4',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
});

export default function createMarkUp(arr) {
  Loading.circle();

  trendingGallery.innerHTML = '';
  const arrData = arr.results;
  const arrGen = JSON.parse(localStorage.getItem('genres')).genres;

  const murkUp = arrData
    .map(result => {
      const gen = result.genre_ids.map(num => {
        const findGen = arrGen.find(item => item.id === num);
        return findGen;
      });

      let newArrGen = gen.map(obj => obj.name);

      let startDate = '';

      const posterBaseUrl = 'https://www.themoviedb.org/t/p/w500';

      const posterPath =
        result.poster_path === null
          ? `${comingSoon}`
          : `${posterBaseUrl}${result.poster_path}`;

      if (Object.keys(result).includes('release_date')) {
        if (result.release_date !== '') {
          startDate = result.release_date.split('').slice(0, 4).join('');
        }
        if (result.release_date === '') {
          startDate = ' . . . .';
        }
      }
      if (newArrGen.length > 2) {
        newArrGen = newArrGen.slice(0, 2).join(', ') + ', Other';
      } else if (newArrGen.length < 1) {
        newArrGen = 'Info is not specified';
      } else {
        newArrGen = newArrGen.join(', ');
      }

      return `<li id="${result.id}" class="movie-card__list">
                <article>
                  <img class="movie-card__poster" src="${posterPath}" loading="lazy" alt="${result.title}">
                  <div class="js-genres">
                  <h2 class="movie-card__title" data-id="${result.id}">${result.title}</h2>
                       <p class="movie-card__geners">${newArrGen} | ${startDate}</p>
                    
                    </div>
              </article>
            </li>`;
    })
    .join('');

  trendingGallery.insertAdjacentHTML('beforeend', murkUp);
  Loading.remove(1000);
}
