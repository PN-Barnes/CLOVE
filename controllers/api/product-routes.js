const router = require('express').Router();
const { User, Basket, Product, Rating } = require('../../models');
// const withAuth = require('../../utils/auth');
// const { formatString } = require('../../utils/helpers');
// const { Op } = require("sequelize");

// GET info of product
router.get('/', async (req, res) => {
  try {
    // assume user can provide product_id
    const dbProductData = await Product.findAll();
    res.status(200).json(dbProductData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET info of product id === req.params.id
router.get('/:id', async (req, res) => {
  try {
    const dbProductData = await Product.findByPk(req.params.id);
    res.status(200).json(dbProductData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/name/:productName', async (req, res) => {
  try {
    const dbProductData = await Product.findOne({
      where: { name: req.params.productName },
    });

    if (!dbProductData) {
      res
        .status(400)
        .json({ message: 'No product found with this product name!' });
    } else {
      const product = dbProductData.get({ plain: true });
      res.status(200).json(product);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
