const router = require('express').Router();
const { User, Basket, Product } = require('../models');
const withAuth = require('../utils/auth');
const Op = require('sequelize').Op;

router.get('/', async (req, res) => {
  try {
    console.log('Grabbing listings');
    // const basketData = await Basket.findAll({
    //   //   include: [
    //   //     {
    //   //       model: Product,
    //   //     },
    //   //   ],
    // });

    // const listings = basketData.map((basket) => basket.get({ plain: true }));

    res.render('listing');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
