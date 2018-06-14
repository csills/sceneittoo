var express = require('express');
var router = express.Router();
const models = require('../models');

router.get('/', (req, res, next) => {
    res.json({});
});


/* POST data to Movies and Usermovies tables - Sceneitlist button*/
router.post('/save', (req, res) => {
    models.Movie.findOrCreate(
        {
            where: {
                imdbid: req.body.imdbid,
            },
            defaults: {
                title: req.body.title,
                imdbid: req.body.imdbid,
                mpaarating: req.body.mpaarating,
                released: req.body.released,
                runtime: req.body.runtime,
                genre: req.body.genre,
                director: req.body.director,
                writer: req.body.writer,
                actors: req.body.actors,
                plot: req.body.plot,
                poster: req.body.poster,
                imdbrating: req.body.imdbrating,
            }
        }
    )
    .then(movie => {
        console.log(movie[0].id);
        models.Usermovie.findOrCreate({
            where: { 
                UserId: req.user,
                MovieId: movie[0].id 
            },
            defaults: {
                sceneItlist: true,
                wishlist: false,
                UserId: req.user,
                MovieId: movie[0].id
            }
        })
        .then(usermovie => {
            usermovie[0].sceneItlist = true;
            usermovie[0].save().then( () => {
                res.json(usermovie);
            })
        });
    })
    .catch(err => {
        console.log('Could not find or create movie ' + err);
    });


    


});


/* POST data to Movies and Usermovies tables - Wishlist button*/
router.post('/save', (req, res) => {
    models.Movie.findOrCreate(
        {
            where: {
                imdbid: req.body.imdbid,
            },
            defaults: {
                title: req.body.title,
                imdbid: req.body.imdbid,
                mpaarating: req.body.mpaarating,
                released: req.body.released,
                runtime: req.body.runtime,
                genre: req.body.genre,
                director: req.body.director,
                writer: req.body.writer,
                actors: req.body.actors,
                plot: req.body.plot,
                poster: req.body.poster,
                imdbrating: req.body.imdbrating,
            }
        }
    )
    .then(movie => {
        console.log(movie[0].id);
        models.Usermovie.findOrCreate({
            where: { 
                UserId: req.user,
                MovieId: movie[0].id 
            },
            defaults: {
                wishlist: true,
                sceneItlist: false,
                UserId: req.user,
                MovieId: movie[0].id
            }
        })
        .then(usermovie => {
            usermovie[0].wishlist = true;
            usermovie[0].save().then( () => {
                res.json(usermovie);
            })
        });
    })
    .catch(err => {
        console.log('Could not find or create movie ' + err);
    });

});


module.exports = router;