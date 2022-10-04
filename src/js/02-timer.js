import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let value = document.querySelectorAll('.value');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
    options.selectedDate = selectedDates[0];
  },
};

flatpickr('input#datetime-picker', options);

startBtn.addEventListener('click', onTimerDown);

function onTimerDown() {
  startBtn.disabled = true;

  const timerId = setInterval(() => {
    const timeToCount = options.selectedDate.getTime() - Date.now();
    const countedTime = convertMs(timeToCount);
    const values = Object.values(countedTime);

    if (timeToCount < 1000) {
      clearInterval(timerId);
    }

    for (let i = 0; i < value.length; i++) {
      value[i].textContent = values[i];
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
