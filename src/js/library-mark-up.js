import comingSoon from '../images/coming-soon.jpg';

const filmsBoxRef = document.querySelector('.js-library-movie-card');

export default function createLibraryMarkUp(arr) {
  filmsBoxRef.innerHTML = '';
  const arrData = arr;

  const murkUp = arrData
    .map(result => {
      let newArrGen = result.genres.map(obj => obj.name);

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
        newArrGen = 'info is being specified';
      } else {
        newArrGen = newArrGen.join(', ');
      }

      return `<li id="${result.id}" class="movie-card__list">
                <article>
                  <img class="movie-card__poster" src="${posterPath}" loading="lazy" alt="${
        result.title
      }">
                  <div class="js-genres">
                  <h2 class="movie-card__title" data-id="${result.id}">${
        result.title
      }</h2>
                       <p class="movie-card__geners">${newArrGen} | ${startDate} <span class="film-vote">${Number(
        result.vote_average
      ).toFixed(2)}</span></p>
                    
                    </div>
              </article>
            </li>`;
    })
    .join('');

  filmsBoxRef.insertAdjacentHTML('beforeend', murkUp);
}
