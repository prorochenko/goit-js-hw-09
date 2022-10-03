const refs = {
  startBtn: document.querySelector(`[data-start]`),
  stopBtn: document.querySelector(`[data-stop]`),
  body: document.querySelector('body'),
};

let timerId = null;

refs.startBtn.addEventListener(`click`, startChangeColor);
refs.stopBtn.addEventListener(`click`, stopChangeColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startChangeColor(evt) {
  timerId = setInterval(changeBodyBgColor, 1000);
  evt.currentTarget.disabled = true;
}

function changeBodyBgColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function stopChangeColor() {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
}
