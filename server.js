// dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authController = require('./controllers/auth');
const session = require('express-session');

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
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// fun fact! router code is actually a type of middleware!
app.use('/auth', authController);
// any HTTP requests from the brower that come to /auth....
// will automatically be forward to the router code
// inside of the authController

// mount routes
app.get('/', (req, res) => {
    res.render('index.ejs', {
        user: req.session.user
    });
});

// tell the app the listen for HTTP requests
app.listen(port, () => {
    console.log(`The express app is ready on port: ${port}`);
});