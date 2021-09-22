'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
const PORT = process.env.PORT;
server.use(cors());
const getWeather = require('./assets/weather.json')


server.get('/', (req, res) => {

  res.status(200).send('home route');
});
server.get('/test', (request, response) => {
  response.send('api server is working');
});

server.get('/getWeather', (req, res) => {
// res.send(weatherData)
let searchQuery= req.query.searchQuery;
console.log(req.query);
// console.log(req.query.DataOfWeather)
let weatherData = getWeather.find((item)=>{
  if(item.city_name === searchQuery){
    // console.log("hi")
    return item
    
  }
})
console.log(weatherData)

let array = weatherData.data.map(item =>{ 
return new Forecast(`${item.weather.description}, ${item.datetime}`)

})
res.send(array)
})

class Forecast{
  constructor(description , date){
    this.description =description
    this.date=date
  
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

server.get('*',(req,res)=>{
  res.status(404).send('route is not found')
})



server.listen(PORT, () => {
  console.log(`listeneing on PORT ${PORT}`);
});


