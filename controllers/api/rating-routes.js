const router = require('express').Router();
const { User, Basket, Product, Rating } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all rating
router.get('/', async (req, res) => {
  try {
    const dbRatingData = await Rating.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
          as: 'poster',
        },
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
          as: 'recipient',
        },
        {
          model: Product,
        },
      ],
    });
    res.status(200).json(dbRatingData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET rating with id === req.params.id
router.get('/:id', async (req, res) => {
  try {
    const dbRatingData = await Rating.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
          as: 'poster',
        },
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
          as: 'recipient',
        },
        {
          model: Product,
        },
      ],
    });
    res.status(200).json(dbRatingData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET info of rating of certain recipient with recipient_id === req.params.id
router.get('/recipient/:id', async (req, res) => {
  try {
    const dbRatingData = await Rating.findAll({
      where: {
        recipient_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
          as: 'poster',
        },
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
          as: 'recipient',
        },
        {
          model: Product,
        },
      ],
    });
    res.status(200).json(dbRatingData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET info of rating of certain poster with poster_id === req.params.id
router.get('/poster/:id', async (req, res) => {
  try {
    const dbRatingData = await Rating.findAll({
      where: {
        poster_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
          as: 'poster',
        },
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
          as: 'recipient',
        },
        {
          model: Product,
        },
      ],
    });
    res.status(200).json(dbRatingData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE a new rating
router.post('/', withAuth, async (req, res) => {
  try {
    // assume user can provide product_id and recipient_id
    const dbRatingData = await Rating.create({
      // req.body
      score: req.body.score,
      content: req.body.content,
      recipient_id: req.body.recipient_id, // need to update with User.find
      poster_id: req.session.userId,
      product_id: req.body.product_id, // need to update with Product.find
    });
    res.status(200).json(dbRatingData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// UPDATE an existing rating with id === req.params.id
router.put('/:id', withAuth, async (req, res) => {
  try {
    let dbRatingData = await Rating.findByPk(req.params.id);
    if (!dbRatingData) {
      res.status(400).json({ message: 'No rating found with that id!' });
      return;
    } else if (
      dbRatingData.get({ plain: true }).poster_id !== req.session.userId
    ) {
      res
        .status(400)
        .json({ message: 'Sorry you cannot edit the rating with that id!' });
    } else {
      dbRatingData = await Rating.update(
        {
          score: req.body.score,
          content: req.body.content,
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
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE an existing rating with id === req.params.id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    let dbRatingData = await Rating.findByPk(req.params.id);
    if (!dbRatingData) {
      res.status(400).json({ message: 'No rating found with that id!' });
      return;
    } else if (
      dbRatingData.get({ plain: true }).poster_id !== req.session.userId
    ) {
      res
        .status(400)
        .json({ message: 'Sorry you cannot delete the rating with that id!' });
    } else {
      dbRatingData = await Rating.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: 'Delete the rating successfully!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
