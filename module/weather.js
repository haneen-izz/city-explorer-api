const axios = require('axios');
let cache = require('./cache.js');
function getWeatherHandler(req, res) {
  // res.send(weatherData)
  let searchQuery = req.query.city;
  let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery},&key=${process.env.WEATHER_KEY}&days=4`;
  if (cache[searchQuery] !== undefined) {
    console.log('the cashe contain data ');
    console.log(cache);
    res.send(cache[searchQuery]);
  } else {
    console.log('cache memory is empty hit the api');
    console.log(req.query);
    console.log(weatherURL);
    // console.log(req.query.DataOfWeather)

    axios
      .get(weatherURL)
      .then((weatherData) => {
        console.log(weatherData);
        console.log(weatherData.data);
        let array = weatherData.data.data.map((item) => {
          return new Forecast(`${item.weather.description}, ${item.datetime}`);
        });
        cache[searchQuery] = array;
        res.send(array);
      })
      .catch((error) => {
        res.send(error);
      });
  }

  class Forecast {
    constructor(description, date) {
      this.description = description;
      this.date = date;
    }
  }
}
module.exports = getWeatherHandler;
