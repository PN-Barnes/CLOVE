const router = require('express').Router();
const { User, Basket, Product, Rating } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE a new basket
router.post('/', withAuth, async (req, res) => {
  try {
    // assume user can provide product_id
    const dbBasketData = await Basket.create({
      // req.body
      stock: req.body.stock,
      price: req.body.price,
      description: req.body.description,
      user_id: req.session.userId,
      product_id: req.body.product_id, // need to update with product.findAll
    });
    res.status(200).json(dbBasketData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET BASKET AND PRODUCTS BY SEARCH
router.get('/:product_name', async (req, res) => {
  try {
    console.log('Please work');
    const dbBasketData = await Product.findOne({
      where: {
        name: req.params.product_name,
      },
    });
    console.log(dbBasketData);
    if (!dbBasketData) {
      res.status(400).json({ message: 'No Product with this name!' });
    }

    res.status(200).json(dbBasketData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET info of basket
router.get('/', async (req, res) => {
  try {
    // assume user can provide product_id
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
    // NEEDS A RENDER FILE TO RENDER THESE FILES
    res.status(200).json(dbBasketData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET info of basket id === req.params.id
router.get('/id/:id', async (req, res) => {
  try {
    const dbBasketData = await Basket.findByPk(req.params.id, {
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
    res.status(200).json(dbBasketData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE an existing basket with id === req.params.id
router.put('/:id', withAuth, async (req, res) => {
  try {
    let dbBasketData = await Basket.findByPk(req.params.id);
    if (!dbBasketData) {
      res.status(400).json({ message: 'No basket found with that id!' });
      return;
    } else if (
      dbBasketData.get({ plain: true }).user_id !== req.session.userId
    ) {
      res
        .status(400)
        .json({ message: 'Sorry you cannot edit the basket with that id!' });
    } else {
      dbBasketData = await Basket.update(
        {
          stock: req.body.stock,
          price: req.body.price,
          description: req.body.description,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({ message: 'Updated successfully!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE an existing basket with id === req.params.id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    let dbBasketData = await Basket.findByPk(req.params.id);
    if (!dbBasketData) {
      res.status(400).json({ message: 'No basket found with that id!' });
      return;
    } else if (
      dbBasketData.get({ plain: true }).user_id !== req.session.userId
    ) {
      res
        .status(400)
        .json({ message: 'Sorry you cannot delete the basket with that id!' });
    } else {
      dbBasketData = await Basket.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: 'Delete the basket successfully!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
