/**
 * @file starting file of the project.
 * @this App
 * @exports app
 * 
 * @author Sanjay Sharma
 */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

const itemRouter = require('./routes/items');
const usersRouter = require('./routes/users');
const storeData = require('./seed/database');
const cartRouter = require("./routes/cart");

const app = express();
const db = require("./db/connect");
db.sequelize.sync();
storeData()
app.use(cors({ credentials: true, origin: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/items', itemRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
module.exports = app;
