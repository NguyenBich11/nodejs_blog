const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const morgan = require('morgan');
const { log } = require('console');
const engine = require('express-handlebars').engine;

const route = require('./routes');

// Define path img
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});