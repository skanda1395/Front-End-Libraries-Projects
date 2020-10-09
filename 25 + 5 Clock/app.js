new Vue({
  el: "#app",
  data: {
    breakLength: 5,
    sessionLength: 25,
    countdown: null,
    timerId: null,
    timeLeft: "25:00",
    isPaused: false,
    sessionStarted: false,
    seconds: null,
    sessionType: "Session"
  },
  methods: {
    reset() {
      clearInterval(this.timerId)
      this.breakLength = 5;
      this.sessionLength = this.sessionLength === "25"? 25: "25";
      this.sessionType = "Session";
      this.sessionStarted = false;
    },
    increment(length) {
      if(this[length] < 60) {
        this[length]++;
      }
    },
    decrement(length) {
      if(this[length] > 1) {
        this[length]--;
      }
    },
    startOrPause() {
      if(this.sessionStarted) {
        this.isPaused = !this.isPaused;
      }
      else {
        this.sessionStarted = true;
        let counterTime = (this.sessionType == "Session")? this.sessionLength: this.breakLength;
        this.countdown = counterTime * 60;
        this.seconds = 60;
        this.timerId = setInterval(this.timer, 1000);
      }
    },
    timer() {
      console.log("Timer was called", this.isPaused, this.countdown);

      if(!this.isPaused) {
        this.countdown--;
        this.seconds--;
  
        let minutes = Math.floor(this.countdown / 60);
      
        this.timeLeft = `${minutes}:${this.seconds}`;
        
        if(!this.countdown) {
          // play beep sound
          clearInterval(this.timerId);
          alert("Time's up! Take a break and come back.");
          this.sessionStarted = false;
          // break countdown
          if(this.sessionType == "Session") {
            console.log("Break Time!");
            this.sessionType = "Break";
          }
          else {
            console.log("Session Time!");
            this.sessionType = "Session";
          }
          this.startOrPause();
        }
      }
    },
  },
  watch: {
    sessionLength(val) {
      this.timeLeft = `${val}:00`;
    },
    seconds(val) {
      if(val == 0) {
        this.seconds = 60;
      }
    }
  }
});