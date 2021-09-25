
const axios = require('axios'); 
function getMovieHandler(req, res){
    let searchQuery= req.query.searchQuery;
    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
    console.log(req.query);
    console.log(movieURL)
  
    axios.get(movieURL).then(movieData => {
      console.log(movieData)
      console.log(movieData.results)
      let Moviearray =  movieData.data.results.map(item =>{ 
        return new Movie(item.title,item.poster_path, item.overview)
        
        })
        res.send(Moviearray)
        }).catch(error => { res.send(error)
        });
        }
    
    class Movie{
        constructor(title,poster_path, overview){
          this.title = title,
          this.poster_path= 'https://image.tmdb.org/t/p/w500' + poster_path
          this.overview = overview
      }
      }



    module.exports = getMovieHandler; 