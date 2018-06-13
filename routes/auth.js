const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser')

const setupAuth = (app) => {
    // 1 set up cookie middleware
    app.use(cookieParser());

    // 2 set up session middleware
    // ASK LACLAN ABOUT THIS SECURITY !ELEVEN!
    app.use(session({
        secret: 'ilywamh4p'
        resave: true,
        saveUninitialized: true,
    }));

    passport.use(new GitHubStrategy({
        clientID: "75e98565fb885d842b56",
        clientSecret: "7424e30131cb46de420fc3dbfb49df6375e80257",
        callbackURL: "http://localhost:3000/github/auth"
        }, (accessToken, refreshToken, profile, done) => {
            // Will be filled in later
            // POSSIBLE REDIRECT TO HOME PAGE HERE !ELEVEN!
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

        //
        app.get('/login', passport.authenticate('github'));
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
                res.redirect('/');
            }
        )

}

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}


module.exports = setupAuth;
module.exports.ensureAuthenticated = ensureAuthenticated;