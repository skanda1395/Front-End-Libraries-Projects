let form = document.querySelector("form");
let timer = document.querySelector("#timer");
let cancel_btn = document.querySelector("#cancel");
let countdown = document.querySelector("#time-left");
let intervalId;
let countdownTime;

function toggleButtons() {
  form.classList.toggle("hide");
  timer.classList.toggle("hide");
}

function timeLeft() {
  let now = new Date().getTime();
  let distance = countdownTime - now;

  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.innerHTML = `${minutes}:${seconds}`;
  
  if(distance < 0) {
    clearInterval(intervalId);
    alert("Time's up! Take a break and come back.");
    toggleButtons();
    countdown.innerHTML = "";
  }
}

// When a time chunk is set
form.addEventListener("submit", function(event) {
  event.preventDefault();
  
  let timeChunk = event.target.elements["time"].value * 1000 * 60;
  countdownTime = Date.now() + timeChunk;
  
  // update the UI for time left in the counter
  intervalId = setInterval(timeLeft, 1000);
  toggleButtons();
});

// Cancel the timer
cancel_btn.addEventListener("click", function() {
  clearInterval(intervalId);
  toggleButtons();
  countdown.innerHTML = "";
});