const app = new Vue({
  el: "#drum-machine",
  data: {
    display: "",
    audio: clips
  },
  methods: {
    play(e) {
      // update the audio name
      this.display = e.target.id;

      // play the clip
      let clip = e.target.querySelector("audio");
      clip.currentTime = 0;
      clip.play();
      
    }
  },
  mounted() {
    window.addEventListener("keydown", (event) => {
      let keypressed = event.key.toUpperCase();
      let drumpad = document.querySelector(`button[data-key="${keypressed}"]`);
      
      // if no drumpad is associated with the key pressed, simply return, else play audio.
      if(!drumpad) return; 
      else {
        drumpad.click();
      }
    });
  }
});