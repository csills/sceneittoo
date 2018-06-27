const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser')

const models = require('./models')


const setupAuth = (app) => {
    app.use(cookieParser());

    app.use(session({

        secret: 'ilywamh4p',
        resave: true,
        saveUninitialized: true,
    }));

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: ${process.env.APP_URL}
            }, (accessToken, refreshToken, profile, done) => {
                console.log(profile);
                // Translate the github profile into a user
                models.User.findOrCreate({
                    where: {
                        github_id: profile.id
                    },
                    defaults: {
                        github_id: profile.id,
                        username: profile.username
                    }
                }).then(result => {
                    // `findOrCreate` returns an array
                    // The actual user instance is the 0th element in the array
                    let user = result[0];

                    // Pass that to the `done` callback as the 2nd arg.
                    // The 1st arg is reserved for any errors that occur.
                    return done(null, user);
                })
                    .catch(err => {
                        console.log('that did not work');

                        // If there was an error, pass that as 1st arg
                        // And null as the 2nd arg (because there was no user retrieved
                        // from the database);
                        done(err, null);
                    })

            }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
        });

        // This configures how passport checks what's in the
        // session to see if the login is still valid.
        passport.deserializeUser(function(id, done) {
        done(null, id);
        });

        app.use(passport.initialize());

        app.use(passport.session());



        // app.get('/login', (req, res) => {
        //     res.render ('login');
        // })
        app.get('/login/github', passport.authenticate('github'));
        app.get('/logout', (req, res, next) => {
            res.logout();
            res.redirect('/');
        })

        // STORE THE PAGE THEY WANTED AND REDIRECT...
        //RIGHT NOW- PLOPS THEM ON THE HOME PAGE
        app.get('/github/auth',
        passport.authenticate('github', {
                failureRedirect: '/login'
            }),
            (req, res) => {
                res.redirect('/search.html');
            }
        )
}
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/search.html');
}

module.exports = setupAuth;
module.exports.ensureAuthenticated = ensureAuthenticated;