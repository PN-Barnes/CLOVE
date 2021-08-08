const router = require('express').Router();
const { User, Basket, Product } = require('../models');
const withAuth = require('../utils/auth');
const Op = require('sequelize').Op;

// NEED to add data retrieval to page

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

router.get('/searchResults/:product_name', async (req, res) => {
  try {
    console.log('Now Work');
    const searchData = await Product.findOne({
      where: {
        name: req.params.product_name,
      },
    });
    console.log(searchData);
    if (!searchData) {
      res.status(400).json({ message: 'No Product with this name!' });
    }

    const searchResults = search.get({ plain: true });
    res.render('searchResults', { searchResults });
    console.log(searchResults);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
