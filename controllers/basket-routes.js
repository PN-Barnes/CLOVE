const router = require('express').Router();
const { User, Basket, Product } = require('../models');
const Op = require('sequelize').Op;

router.get('/', async (req, res) => {
  try {
    const dbBasketData = await Basket.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: Product,
        },
      ],
    });
    const baskets = dbBasketData.map((basket) => basket.get({ plain: true }));
    // res.status(200).json(baskets);
    console.log(baskets);
    res.render('search-page', {
      baskets,
      loggedIn: req.session.loggedIn,
      profilePage: false,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/product/:name', async (req, res) => {
  try {
    const dbBasketData = await Basket.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: Product,
          where: {
            name: req.params.name,
          },
        },
      ],
    });
    const baskets = dbBasketData.map((basket) => basket.get({ plain: true }));
    // res.status(200).json(baskets);
    console.log(baskets);
    res.render('search-page', {
      baskets,
      loggedIn: req.session.loggedIn,
      profilePage: false,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/zipcode/:zipcode', async (req, res) => {
  try {
    const dbBasketData = await Basket.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
          where: {
            zipcode: req.params.zipcode,
          },
        },
        {
          model: Product,
        },
      ],
    });
    const baskets = dbBasketData.map((basket) => basket.get({ plain: true }));
    console.log(baskets);
    res.render('search-page', {
      baskets,
      loggedIn: req.session.loggedIn,
      profilePage: false,
    });
    // res.status(200).json(baskets);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
