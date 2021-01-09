let app = new Vue({
  el: "#app",
  data: {
    quote: "",
    author: "",
  },
  methods: {
    getQuote() {
      fetch("https://api.quotable.io/random?tags=science")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.tags);
          this.quote = '"' + data.content + '"';
          this.author = " - " + data.author;
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
          this.quote = "Oops, try again.";
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
