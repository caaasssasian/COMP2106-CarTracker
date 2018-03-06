// references
const express = require('express');
const router = express.Router();
const Make = require('../models/make');

// GET: /makes
router.get('/', (req, res, next) => {
    Make.find((err, makes) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('makes/index', {
                title: 'Make List',
                makes: makes
            });
        }
    })
});