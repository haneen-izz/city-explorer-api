
const axios = require('axios'); 

function getMovieHandler(req, res){
    let searchQuery= req.query.searchQuery;
    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
    console.log(req.query);
    console.log(movieURL)
  
    axios.get(movieURL).then(movieData => {
      console.log(movieData)
      console.log(movieData.results)
      let moviesArray = results.data.results.map(movie => new Movie(movie));
      response.status(200).send(moviesArray);
    }).catch(error => { res.send(error)
    });
    }
    
    class Movie{
        constructor(movie){
            this.title = movie.title;
            this.overview = movie.overview;
            this.averageVotes = movie.vote_average;
            this.totalVotes = movie.vote_count;
            this.imageUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
            this.popularity = movie.popularity;
            this.releasedOn = movie.release_date;
      }
      }



    module.exports = getMovieHandler; 