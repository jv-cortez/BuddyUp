require('dotenv').config();

const PORT        = process.env.PORT || 3000;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const http        = require("http");
const knexConfig  = require("./knexfile");
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const knex        = require("knex")(knexConfig[ENV]);
const socketio    = require('socket.io');
const helmet      = require('helmet');

// external files
const socketEvent = require('./sockets.js');

// server setup
const app         = express();
const server      = http.Server(app);
const io          = socketio(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(knexLogger(knex));
app.use(morgan('dev'));
app.use(helmet());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// routes setup
// homepage
app.get("/", (req, res) => {
  res.render("index");
});

// socket.io listener
socketEvent(io);

// server listener
server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
