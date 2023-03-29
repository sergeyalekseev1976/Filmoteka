import createLibraryMarkUp from './library-mark-up';
import chunk from './chunk-func';

const btnQueue = document.querySelector('.js-btn-queue');

const listRef = document.querySelector('.js-pagination-box');

let page = 0;
let globalCurrentPage = 0;
let childIndex = 0;

listRef.addEventListener('click', onPagBtnClick);

export default function pagination(currentPage, allPages) {
  let murkUp = '';
  let beforeTwoPage = currentPage - 2;
  let beforeOnePage = currentPage - 1;
  let afterTwoPage = currentPage + 2;
  let afterOnePage = currentPage + 1;
  globalCurrentPage = currentPage;

  if (currentPage > 1) {
    murkUp +=
      '<li class="item-pag"><button type="button" class="link-pag link-pag--btn btn-left btn-rotate"></button></li>';
  } else if (currentPage === 1) {
    murkUp +=
      '<li class="item-pag"><button type="button" class="link-pag link-pag--btn btn-rotate link-pag--hidden" ></button></li>';
  }

  if (currentPage > 1) {
    murkUp +=
      '<li class="item-pag item-none"><button type="button" class="link-pag" >1</button></li>';
  }
  if (currentPage > 4) {
    murkUp +=
      '<li class="item-pag item-none"><button type="button" class="link-pag btn-pointer-event" >...</button></li>';
  }
  if (currentPage > 3) {
    murkUp += `<li class="item-pag"><button type="button" class="link-pag" >${beforeTwoPage}</button></li>`;
  }
  if (currentPage > 2) {
    murkUp += `<li class="item-pag"><button type="button" class="link-pag" >${beforeOnePage}</button></li>`;
  }
  murkUp += `<li class="item-pag">
        <button type="button" class="link-pag" >${currentPage}</button>
      </li>`;
  if (allPages - 1 > currentPage) {
    murkUp += `<li class="item-pag"><button type="button" class="link-pag" >${afterOnePage}</button></li>`;
  }
  if (allPages - 2 > currentPage) {
    murkUp += `<li class="item-pag"><button type="button" class="link-pag" >${afterTwoPage}</button></li>`;
  }
  if (allPages - 3 > currentPage) {
    murkUp +=
      '<li class="item-pag item-none"><button type="button" class="link-pag btn-pointer-event" >...</button></li>';
  }
  if (allPages > currentPage) {
    murkUp += `<li class="item-pag item-none">
        <button type="button" class="link-pag" >${allPages}</button>
      </li>`;
  }

  if (allPages > currentPage) {
    murkUp +=
      '<li class="item-pag"><button type="button" class="link-pag link-pag--btn btn-right"></button></li>';
  } else if (allPages === currentPage) {
    murkUp +=
      '<li class="item-pag"><button type="button" class="link-pag link-pag--btn link-pag--hidden"></button></li>';
  }

  listRef.innerHTML = murkUp;

  createAccentCurrentPage(currentPage, allPages);

  const { height: cardHeight } = document
    .querySelector('.library-header')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: -(cardHeight * 13),
    behavior: 'smooth',
  });
}

function createAccentCurrentPage(page, allPages) {
  if (page < 5) {
    childIndex = page;
  } else if (page === allPages) {
    childIndex = 5;
  } else if (page <= 5) {
    childIndex = 0;
    childIndex = page;
  } else if (page === 6) {
    childIndex = 5;
  }
  const firstRef = listRef.children[childIndex].firstElementChild;
  firstRef.classList.add('current');
}

function onPagBtnClick(evt) {
  if (Boolean(evt.target.closest('.btn-right'))) {
    globalCurrentPage += 1;
    renderPaginationMurkUp(globalCurrentPage);

    return;
  }
  if (Boolean(evt.target.closest('.btn-left'))) {
    globalCurrentPage -= 1;
    renderPaginationMurkUp(globalCurrentPage);

    return;
  }

  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  if (evt.target.textContent === '...') {
    return;
  }

  page = Number(evt.target.textContent);
  renderPaginationMurkUp(page);
}

function renderPaginationMurkUp(page) {
  if (window.screen.width > 1280) {
    if (btnQueue.classList.contains('pag-queue')) {
      const parsedQueueMovies = JSON.parse(
        localStorage.getItem('queue-movies')
      );
      const chunkArrQueue = chunk(parsedQueueMovies, 9);

      createLibraryMarkUp(chunkArrQueue[page - 1]);
      pagination(page, chunkArrQueue.length);
    } else {
      const parseFilmData = JSON.parse(localStorage.getItem('watched-movies'));
      const chunkArr = chunk(parseFilmData, 9);

      createLibraryMarkUp(chunkArr[page - 1]);
      pagination(page, chunkArr.length);
    }
  } else if ((window.screen.width >= 768) & (window.screen.width < 1280)) {
    if (btnQueue.classList.contains('pag-queue')) {
      const parsedQueueMovies = JSON.parse(
        localStorage.getItem('queue-movies')
      );
      const chunkArrQueue = chunk(parsedQueueMovies, 8);

      createLibraryMarkUp(chunkArrQueue[page - 1]);
      pagination(page, chunkArrQueue.length);
    } else {
      const parseFilmData = JSON.parse(localStorage.getItem('watched-movies'));
      const chunkArr = chunk(parseFilmData, 8);

      createLibraryMarkUp(chunkArr[page - 1]);
      pagination(page, chunkArr.length);
    }
  } else if (window.screen.width < 768) {
    if (btnQueue.classList.contains('pag-queue')) {
      const parsedQueueMovies = JSON.parse(
        localStorage.getItem('queue-movies')
      );
      const chunkArrQueue = chunk(parsedQueueMovies, 4);

      createLibraryMarkUp(chunkArrQueue[page - 1]);
      pagination(page, chunkArrQueue.length);
    } else {
      const parseFilmData = JSON.parse(localStorage.getItem('watched-movies'));
      const chunkArr = chunk(parseFilmData, 4);

      createLibraryMarkUp(chunkArr[page - 1]);
      pagination(page, chunkArr.length);
    }
  }
}
