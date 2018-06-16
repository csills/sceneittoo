const express = require('express');
const router = express.Router();
const models = require('../models');


// GET all of the Users "Ain't Scene It" movies
router.get('/', function(req, res, next) {
    models.Usermovie.findAll({
        where: {
            UserId: req.user,
            aintsceneit: true,
        },
        include: [
            models.Movie,
            models.User,
        ]
    })

// RENDER the Users "Ain't Scene It" movies to aintsceneit webpage
    .then(usermovies => {
        res.render('aintsceneit', {
            title: 'Ain\'t Scene It List',
            usermovies: usermovies,
        });
    })
});

module.exports = router;