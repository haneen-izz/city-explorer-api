
const axios = require('axios'); 

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
    class Forecast{
        constructor(forecast){
          this.description =forecast.description
          this.date=forecast.date
        
        }
      }
   module.exports = getWeatherHandler; 