const express = require('express');
const router = express.Router();
const models = require('../models');

// GET all of the Users "Scene It" movies
router.get('/', function(req, res, next) {
    models.Usermovie.findAll({
        where: {
            UserId: req.user,
            sceneitlist: true,
        },
        include: [
            models.Movie,
            models.User,
        ]
    })

// RENDER the Users "Scene It" movies to sceneItList webpage
    .then(usermovies => {
        res.render('sceneItList', {
            title: 'Scene It List',
            usermovies: usermovies,
        });
    })
});

module.exports = router;