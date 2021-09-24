'use strict';
const axios = require('axios');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
const PORT = process.env.PORT;
server.use(cors());

server.get('/', homeRouteHandler);
server.get('/getWeather', getWeatherHandler);
server.get('/getMovie', getMovieHandler);
server.get('*', notFoundHandler);

function homeRouteHandler(req, res) {
  res.send('home route')
}
function getWeatherHandler(req, res){
// res.send(weatherData)
let searchQuery= req.query.city;
let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery},&key=${process.env.WEATHER_KEY}&days=4`;
console.log(req.query);
console.log(weatherURL)
// console.log(req.query.DataOfWeather)

axios.get(weatherURL).then(weatherData => {
  console.log(weatherData)
  console.log(weatherData.data)
let array =  weatherData.data.data.map(item =>{ 
return new Forecast(`${item.weather.description}, ${item.datetime}`)

})
res.send(array)
}).catch(error => { res.send(error)
});
}
function getMovieHandler(req, res){
  // res.send(weatherData)
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


class Forecast{
  constructor(description , date){
    this.description =description
    this.date=date
  
  }
}
class Movie{
  constructor(title ,poster_path,overview){
    this.title = title
    this.poster_path= 'https://image.tmdb.org/t/p/w500' + poster_path
    this.overview = overview
  

}
}

// let weatherInfo = DataOfWeather.weather.find((item)=>{
//if(item.description === DataOfWeather && item.date === DataOfWeather){
//return item

// console.log('weatherInfo', weatherInfo)
// console.log('dateInfo', dateInfo )
// res.send(description)
// res.send(date)
// })
function notFoundHandler(req, res) {
  res.status(404).send('route is not found')
}



server.listen(PORT, () => {
  console.log(`listeneing on PORT ${PORT}`);
});