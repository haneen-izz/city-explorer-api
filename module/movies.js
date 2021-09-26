const axios = require('axios');
let cache = require('./cache.js');
function getMovieHandler(req, res) {
  let searchQuery = req.query.searchQuery;
  let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;
  if (cache[searchQuery] !== undefined) {
    console.log('the cashe contain data ');
    console.log(cache);
    res.send(cache[searchQuery]);
  } else {
    console.log('cache memory is empty hit the api');
    console.log(req.query);
    console.log(movieURL);

    axios
      .get(movieURL)
      .then((movieData) => {
        console.log(movieData);
        console.log(movieData.results);
        let Moviearray = movieData.data.results.map((item) => {
          return new Movie(item.title, item.poster_path, item.overview);
        });
        cache[searchQuery] = Moviearray;
        res.send(Moviearray);
      })
      .catch((error) => {
        res.send(error);
      });
  }

  class Movie {
    constructor(title, poster_path, overview) {
      (this.title = title),
        (this.poster_path = 'https://image.tmdb.org/t/p/w500' + poster_path);
      this.overview = overview;
    }
  }
}

module.exports = getMovieHandler;
