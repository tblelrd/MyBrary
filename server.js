if(process.env.NODE_ENV !== 'production') { 
  require('dotenv').config();
}
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const express = require('express');
const { join } = require('path')

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => console.log('Mongoose >> Connected'));
const app = express();

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));
app.set('layout', 'layouts/layout')
app.use(expressLayouts);
app.use(express.static('public'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000); 