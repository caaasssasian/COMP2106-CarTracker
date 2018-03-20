let express = require('express');
let router = express.Router();

// auth references
let passport = require('passport');
let User = require('../models/user');


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Car Tracker',
    message: 'COMP2106 In-Class Node Application',
    user: req.user
  });
});

/* GET about page */
router.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'About Us',
    message: 'This app is built with the MEAN Stack.',
    user: req.user
  });
});

/* GET contact page */
router.get('/contact', (req, res, next) => {
  res.render('about', {
    title: 'Contact Us',
    message: 'This is the Contact Us Page.',
    user: req.user
  });
});

/* GET register page */
router.get('/register', (req, res, next) => {
  res.render('register', {
    title: 'Register',
    user: req.user
  });
});

/* POST: /register */
router.post('/register', (req, res, next) => {
  // create the new User with our model
  User.register(new User({
    username: req.body.username,
    phone: req.body.phone    
  }), req.body.password, (err, user) => {
    if (err) {
      console.log(err);
    }
    else {
      // auto log the user in and direct to /cars
      /*req.login(user, (err) => {
        res.redirect('/cars');
      });*/
      res.redirect('/login');
    }
  });
});

/* GET login page */
router.get('/login', (req, res, next) => {
  // check for invalid login message in the session object
  let messages = req.session.messages || [];

  // clear the session messages
  req.session.messages = [];

  res.render('login', {
    title: 'Login',
    messages: messages,
    user: req.user
  });
});

/* POST: /login */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/cars',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'
}));

/* GET: /logout */
router.get('/logout', (req, res, next) => {
  // clear out any session messages
  req.session.messages = [];
  // end the user's session 
  req.logout();
  // redirect to login or home
  res.redirect('/');
});

module.exports = router;
