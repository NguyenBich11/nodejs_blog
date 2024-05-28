const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const methodOverride = require('method-override');
const morgan = require('morgan');
const { log } = require('console');
const engine = require('express-handlebars').engine;

const route = require('./routes');
const db = require('./config/db');

// Connect to db
db.connect()

// Define path img
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

// midle-ware
app.use(methodOverride('_method'));

// Template engine
app.engine('.hbs', engine({
  extname: '.hbs',
  helpers: {
    incrementedIndex: function(index) {
      return index+1;
    }
  }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});