// references
const express = require('express');
const router = express.Router();
const Car = require('../models/car');

// GET: /cars
router.get('/', (req, res, next) => {
    // get car documents fom db
    Car.find((err, cars) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('cars/index', {
                title: 'Car List',
                cars: cars,
                user: req.user
            });
        }
    });
});

// GET: /cars/add
router.get('/add', (req, res, next) => {
    res.render('cars/add', {
        title: 'Add a New Car',
        user: req.user
    });
});

// POST: /cars/add
router.post('/add', (req, res, next) => {
    // use the Car model to save the new car
    Car.create({
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        colour: req.body.colour
    }, (err, car) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/cars');
        }
    });
});

// GET: /cars/delete/abc123
router.get('/delete/:_id', (req, res, next) => {    
    // get the _id parameter from the url and store in a local variable
    let _id = req.params._id;

    // use the Car model to delete the document with this id
    Car.remove({ _id: _id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/cars');
        }
    });
});

// GET: /cars/edit/abc123
router.get('/edit/:_id', (req, res, next) => {
    // get the _id parameter from the url and store in a local variable
    let _id = req.params._id;

    // use the Car model to find the selected document
    Car.findById(_id, (err, car) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('cars/edit', {
                title: 'Car Details',
                car: car,
                user: req.user
            });
        }
    });
});

// POST: /cars/edit/abc123
router.post('/edit/:_id', (req, res, next) => {
    // get the _id from the url
    let _id = req.params._id;

    // use the Mongoose update method to set all the new values 
    Car.update({ _id: _id},
        { $set: {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            colour: req.body.colour            
        }}, null, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect('/cars');
            }
        });

});

// make public
module.exports = router;