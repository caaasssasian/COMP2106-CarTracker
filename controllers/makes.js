// references
const express = require('express');
const router = express.Router();
const Make = require('../models/make');

const functions = require('../config/functions');

// GET: /makes
router.get('/', (req, res, next) => {
    Make.find((err, makes) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('makes/index', {
                title: 'Manufacturer List',
                makes: makes,
                user: req.user
            });
        }
    })
});

// GET: /makes/add 
router.get('/add', functions.isLoggedIn, (req, res, next) => {
    res.render('makes/add', {
        title: 'Add a New Manufacturer',
        user: req.user
    });
});

// POST: /makes/add
router.post('/add', functions.isLoggedIn, (req, res, next) => {
    // use the Car model to save the new car
    Make.create({
        name: req.body.name,
        country: req.body.country,
        year: req.body.year
    }, (err, car) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/makes');
        }
    });
});

// GET: /makes/delete/abc123
router.get('/delete/:_id', functions.isLoggedIn, (req, res, next) => {
    let _id = req.params._id;

    Make.remove({ _id: _id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/makes');
        }
    })
});

// GET: /makes/edit/abc123
router.get('/edit/:_id', functions.isLoggedIn, (req, res, next) => {
    let _id = req.params._id;

    Make.findById(_id, (err, make) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('makes/edit', {
                title: 'Manufacturer Details',
                make: make,
                user: req.user
            });
        }
    });
});

// POST: /makes/edit/abc123 
router.post('/edit/:_id', functions.isLoggedIn, (req, res, next) => {
    let _id = req.params._id;

    Make.update({ _id: _id }, 
        { $set: {
            name: req.body.name,
            country: req.body.country,
            year: req.body.year 

        }}, null, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect('/makes');
            }
        });
});

// make public 
module.exports = router;
