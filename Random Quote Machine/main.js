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
          this.author = "- " + data.author;
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    },
  },
  mounted: function () {
    this.getQuote();
  },
});
