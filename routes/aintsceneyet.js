const express = require('express');
const router = express.Router();
const models = require('../models');


// GET all of the Users "Ain't Scene Yet" movies 
router.get('/', function(req, res, next) {
    models.Usermovie.findAll({
        where: {
            UserId: req.user,
            aintsceneyet: true,
        },
        include: [
            models.Movie,
            models.User,
        ]
    })

// RENDER the Users "Ain't Scene Yet" movies to aintsceneyet webpage
    .then(usermovies => {
        res.render('aintsceneyet', {
            title: 'Ain\'t Scene Yet List',
            usermovies: usermovies,
        });
    })
});

module.exports = router;