// dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const dotenv = require('dotenv');

// intialize express app
const app = express();

// configure settings
dotenv.config();
const port = process.env.PORT || "3000";
// const port = process.env.PORT ? process.env.PORT : "3000";

// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

// mount middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// mount routes

// tell the app the listen for HTTP requests
app.listen(port, () => {
    console.log(`The express app is ready on port: ${port}`);
});