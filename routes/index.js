var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    isLoggedIn: req.isAuthenticated(),
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {
    user: User.findById()
  });
});

module.exports = router;