import axios from 'axios';

const trailerCarousel = document.querySelector('.modal-video_wrapper');

export async function getTrailerVideos(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=d60997a7e23cda835c1c23368c69f903`
    );
    const arr = response.data.results;
    return arr;
  } catch (error) {
    console.error(error);
  }
}

export function createMainTrailerLink(data) {
  const singleTrailerContainer = document.querySelector(
    '.single-trailer-wrapper'
  );
  const trailerArr = data[0];
  const markup = `<a class="single-trailer-video-link" href="https://www.youtube.com/embed/${trailerArr.key}">
                      
                      Watch trailer on YouTube!
                  </a>`;
  singleTrailerContainer.insertAdjacentHTML('beforeend', markup);
}

export function createTrailerModalMarkup(data) {
  trailerCarousel.innerHTML = '';

  let trailerObj = data.slice(1, 3);

  const markup = trailerObj
    .map(data => {
      if (data.site === 'YouTube') {
        return `<a href="#youtube">

  </a> <iframe
          class="modal-video_link"

          width="100%"
          id="youtube"
          src="https://www.youtube.com/embed/${data.key}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>`;
      }
    })
    .join();

  trailerCarousel.insertAdjacentHTML('beforeend', markup);
}
