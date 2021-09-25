
'use strict';
const axios = require('axios');
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();
const PORT = process.env.PORT;
server.use(cors());

server.get("/", (req, res) => {
  res.send("home route");
});

server.get("/getWeather", getWeatherHandler);
server.get("/getMovie", getMovieHandler);

server.get("*", (request, response) => {
  response.status(404).send("not found");
});

server.listen(PORT, () => {
  console.log(`listeneing on PORT ${PORT}`);
});

