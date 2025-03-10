const express = require('express');
const router = express.Router();

// NOTE: there are no routes here yet

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
});
// the router object is similar to the app object in server js
// however, it only has router functionality

module.exports = router;