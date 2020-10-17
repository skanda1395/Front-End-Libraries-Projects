const app = new Vue({
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
    sessionType: "Session",
    timerTab: true
  },
  methods: {
    reset() {
      clearInterval(this.timerId)
      this.sessionStarted = false;
      this.breakLength = 5;
      this.sessionLength = this.sessionLength === "25"? 25: "25";
      this.sessionType = "Session";
      this. $refs.alarm.currentTime = 0;
      this.$refs["progress-bar"].style["stroke-dashoffset"] = this.strokeLength();
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
        let counterTime = this.currentSessionLength;
        this.countdown = counterTime * 60;
        this.seconds = 60;
        this.timerId = setInterval(this.timer, 1000);
        this.$refs.alarm.currentTime = 0;
      }
    },
    timer() {
      if(!this.isPaused) {
        this.countdown--;
        this.seconds--;
        
        let minutes = Math.floor(this.countdown / 60);
        this.timeLeft = `${minutes}:${this.seconds}`;

        this.progress();
        
        if(!this.countdown) {
          // play beep sound
          this. $refs.alarm.currentTime = 0;
          this. $refs.alarm.play();
          clearInterval(this.timerId);
          this.sessionStarted = false;

          // break countdown
          if(this.sessionType == "Session") {
            this.sessionType = "Break";
          }
          else {
            this.sessionType = "Session";
          }
          this.startOrPause();
        }
      }
    },
    progress() {
      let progressPercent = this.countdown / (this.currentSessionLength * 60);
      let progressStrokeLength = progressPercent * (2 * Math.PI * 40);
      this.$refs["progress-bar"].style["stroke-dashoffset"] = progressStrokeLength;
    },
    strokeLength() {
      return (2 * (22 / 7) * this.$refs["progress-bar"].getAttribute("r"));
    },
    toggleTab(e) {
      if(e.target.classList.contains("tab")) {
        let activeTab = document.querySelector(".active-tab");
        if(e.target == activeTab) return;
        else {
          this.timerTab = e.target.textContent == "Timer";
        }
      }
    }
  },
  computed: {
    currentSessionLength() {
      return (this.sessionType == "Session")? this.sessionLength: this.breakLength;
    }
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
  },
  filters: {
    timeFormat(value) {
      let time = String(value).split(":", 2);
      let [minutes, seconds] = [time[0], time[1]];
      
      if(minutes.length == 1) minutes = "0" + minutes;
      if(seconds.length == 1) seconds = "0" + seconds;

      return `${minutes}:${seconds}`;
    }
  },
  });