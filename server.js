'use strict';

const express = require('express');
const server = express();
const PORT = 3000;
const weatherData = require('./assets/weather.json')

server.get('/', (req, res) => {

  res.status(200).send('home route');
});
server.get('/test', (request, response) => {
  response.send('api server is working');
});
server.get('*', (request, response) => {
    response.send('route is not found');
  });

let array=[];
server.get('/getWeather', (req, res) => {
res.send(weatherData)
let DataOfWeather=req.query.DataOfWeather;
console.log(req.query);
console.log(req.query.DataOfWeather)
let weatherInfo = DataOfWeather.weather.map((item)=>{
array.push(
new Forecast(`${item.weatherData.description}, ${item.weatherData.date}`)

)
});
// let weatherInfo = DataOfWeather.weather.find((item)=>{
//if(item.description === DataOfWeather && item.date === DataOfWeather){
//return item

class Forecast{
constructor(description , date){
  this.description =description
  this.date=date

}}

console.log('weatherInfo', weatherInfo)
// console.log('dateInfo', dateInfo )
res.send(description)
res.send(date)
})

server.listen(PORT, () => {
  console.log(`listeneing on PORT ${PORT}`);
});


