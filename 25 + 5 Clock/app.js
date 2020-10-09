new Vue({
  el: "#app",
  data: {
    breakLength: 5,
    sessionLength: 25,
    timeLeft: "25:00"
  },
  methods: {
    reset() {
      // timer should be stopped
      this.breakLength = 5;
      this.sessionLength = 25;
      this.timeLeft = "25:00";
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
  }
});