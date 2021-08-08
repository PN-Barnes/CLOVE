const router = require('express').Router();
const { User, Basket, Product } = require('../models');
const withAuth = require('../utils/auth');
const Op = require('sequelize').Op;

// Home Page: navbar + hero image + app introduction
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      profilePage: false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route for login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }

  res.render('login', {
    loggedIn: req.session.loggedIn,
    profilePage: false,
  });
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }

  res.render('signup', {
    loggedIn: req.session.loggedIn,
    profilePage: false,
  });
});

module.exports = router;
