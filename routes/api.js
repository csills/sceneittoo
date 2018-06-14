var express = require('express');
var router = express.Router();
const models = require('../models');

router.get('/', (req, res, next) => {
    res.json({});
});


/* POST data to Movies and Usermovies tables */
router.post('/save', (req, res) => {
    models.Movies.findOrCreate(
        {
            where: {
                imdbID: currentMovie.imdbID,
            }
        },{
            defaults: {
                title: req.body.Title,
                imdbID: req.body.imdbID,
                mpaaRating: req.body.Rated,
                released: req.body.Released,
                runtime: req.body.Runtime,
                genre: req.body.Genre,
                director: req.body.Director,
                writer: req.body.Writer,
                actors: req.body.Actors,
                plot: req.body.Plot,
                poster: req.body.Poster,
                imdbRating: req.body.imdbRating,
            }
        }
    )
    .then(movie => {
        res.json(movie);
    })
    .then(movie => {
        models.Usermovies.create({
            sceneItlist: true,
            wishlist: false,
            UserId: req.user,
            MovieId: movie.id
        });
    })
    .catch(err => {
        console.log('Could not find or create movie ' + err);
    });
});

module.exports = router;