let app = new Vue({
  el: "#app",
  data: {
    quote: "",
    author: "",
  },
  methods: {
    getQuote() {
      fetch("https://programming-quotes-api.herokuapp.com/quotes/random")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.quote = '"' + data.en + '"';
          this.author = " - " + data.author;
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    },
  },
  computed: {
    tweetQuote() {
      return (
        "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        this.quote +
        this.author
      );
    },
    getHeight() {
      return document.getElementById("quote-box").style.padding;
    },
  },
  mounted: function () {
    this.getQuote();
  },
});
