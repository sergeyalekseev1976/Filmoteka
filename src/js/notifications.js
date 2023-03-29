import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Для використання функцій виклику повідомлень зробіть собі імпорт потрібних функцій в файл.

const reportOptions = {
  svgSize: '50px',
  svgColor: '#ff6b01',
  buttonBackground: '#ff6b01',
  titleMaxLength: 80,
  backOverlayClickToClose: true,
  cssAnimationDuration: 500,
};

const notifyOptions = {
  clickToClose: true,
};

// Функція виводить повідомлення про помилку, коли щось не так із відповіддю сервера. Додавати в catch.
export function errorNotification() {
  Report.failure(
    'There are some problems! Try again later.',
    '',
    'Try again',
    reportOptions
  );
}

// Функція виводить повідомлення, що за даним запитом нічого не знайдено.
export function noMatchesNotification() {
  Report.failure(
    'Sorry, there are no movies matching your search query! Please try again.',
    '',
    'Try again',
    reportOptions
  );
}

// Функція виводить прохання ввести щось в інпут, якщо користувач натиснув submit без введення запиту.
export function emptyQueryNotification() {
  Report.failure('Please enter your search query!', '', 'OK', reportOptions);
}

// Функція виводить спливаюче повідомлення про успішне додавання фільму до переглянутих
export function successfulAddToWatchedNotification() {
  Notify.info('The movie was successfully added to Watched', notifyOptions);
}

// Функція виводить спливаюче повідомлення про успішне додавання фільму до черги
export function successfulAddToQueueNotification() {
  Notify.info('The movie was successfully added to Queue', notifyOptions);
}

// Функція виводить спливаюче повідомлення про видалення фільму з переглянутих
export function successfulDeleteFromWatchedNotification() {
  Notify.info('The movie was successfully removed from Watched', notifyOptions);
}

// Функція виводить спливаюче повідомлення про видалення фільму з черги
export function successfulDeleteFromQueueNotification() {
  Notify.info('The movie was successfully removed from Queue', notifyOptions);
}

// Функція виводить спливаюче повідомлення про те, що фільму немає у переглянутих
export function isNotInWatchedNotification() {
  Notify.warning('The movie is not found in Watched', notifyOptions);
}

// Функція виводить спливаюче повідомлення, про те, що фільму немає у черзі
export function isNotInQueueNotification() {
  Notify.warning('The movie is not found in Queue', notifyOptions);
}

export function failRequest() {
  Notify.warning('Why did you deliberately break the code?', notifyOptions);
}
