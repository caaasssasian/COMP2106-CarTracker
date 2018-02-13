let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Car Tracker',
    message: 'COMP2106 In-Class Node Application'
  });
});

/* GET about page */
router.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'About Us',
    message: 'This app is built with the MEAN Stack.'
  });
});

/* GET contact page */
router.get('/contact', (req, res, next) => {
  res.render('about', {
    title: 'Contact Us',
    message: 'This is the Contact Us Page.'
  });
});

module.exports = router;
