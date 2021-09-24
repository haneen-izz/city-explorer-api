'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const PORT = process.env.PORT;
const server = express();
server.use(cors());
const getMovieHandler = require('./module/movies.js');
const getWeatherHandler = require('./module/weather.js');


server.get('/', (req, res) => {
  res.send('home route')
})


server.get('/getWeather', getWeatherHandler);
server.get('/getMovie', getMovieHandler);


server.get('*', (request, response) => {
  response.status(404).send('not found');
})

server.listen(PORT, () => {
  console.log(`listeneing on PORT ${PORT}`);
});

