const router = require('express').Router();
const { User, Basket, Product } = require('../models');
const withAuth = require('../utils/auth');
const Op = require('sequelize').Op;

// public information

// user can view all kinds of product on sale on the homepage
router.get('/', async (req, res) => {
  try {
    console.log('Yay');
    // const dbProductData = await Product.findAll({
    //   include: [
    //     {
    //       model: Basket,
    //       required: true,
    //     },
    //   ],
    // });

    // // Serialize data so the template can read it
    // const products = dbProductData.map((product) =>
    //   product.get({ plain: true })
    // );

    // Pass serialized data and session flag into template
    res.render(
      'homepage'
      //  {
      // //   products,
      // //   loggedIn: req.session.loggedIn,
      // }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Commented out code that was not needed to render the homepage

router.get('/product/:id', async (req, res) => {
  try {
    const dbBasketData = await Basket.findAll({
      where: {
        product_id: req.params.id,
      },
      include: [
        {
          model: Product,
        },
      ],
    });

    // if no one is selling product match the id
    if (!dbBasketData) {
      res
        .status(404)
        .json({ message: 'No product on sale found with that id!' });
      return;
    }

    const baskets = dbBasketData.map((basket) => basket.get({ plain: true }));

    res.render('baskets', {
      ...baskets,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

module.exports = router;
