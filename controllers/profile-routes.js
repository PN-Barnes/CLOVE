const router = require('express').Router();
const { User, Product, Basket, Rating, Message } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');
const messageRoutes = require('./message-routes');
const ratingRoutes = require('./rating-routes');

router.use('/message', messageRoutes);
router.use('/rating', ratingRoutes);

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const dbUserData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Basket,
          include: [{ model: Product }],
        },
        {
          model: Rating,
          on: {
            [Op.or]: [
              {
                recipient_id: req.session.userId,
              },
              {
                poster_id: req.session.userId,
              },
            ],
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
          ],
        },
        {
          model: Message,
          on: {
            [Op.or]: [
              {
                recipient_id: req.session.userId,
              },
              {
                sender_id: req.session.userId,
              },
            ],
          },
          include: [
            {
              model: User,
              attributes: {
                exclude: ['password'],
              },
              as: 'sender',
            },
            {
              model: User,
              attributes: {
                exclude: ['password'],
              },
              as: 'recipient',
            },
          ],
        },
      ],
      order: [
        [Message, 'date_created', 'DESC'],
        [Rating, 'date_created', 'DESC'],
      ],
    });

    const user = dbUserData.get({ plain: true });
    let totalScore = 0;
    let countRatingReceived = 0;
    for (const rating of user.ratings) {
      if (rating.recipient_id === req.session.userId) {
        rating.isRecipient = true;
        totalScore += rating.score;
        countRatingReceived++;
      } else {
        rating.isRecipient = false;
      }
    }
    for (const obj of user.messages) {
      obj.isRecipient = obj.recipient_id === req.session.userId;
    }
    user.ratingAverage = Math.floor(totalScore / countRatingReceived);
    // res.status(200).json(user);
    console.log(user);
    // display profile page with data of the user logged in
    res.render('profile', {
      ...user,
      loggedIn: req.session.loggedIn,
      profilePage: true,
      owner: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get a certain user's profile page with id === req.params.id
router.get('/user/:id', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const dbUserData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Basket,
          include: [
            {
              model: Product,
            },
          ],
        },
        {
          model: Rating,
          on: {
            [Op.or]: [
              {
                recipient_id: req.params.id,
              },
              {
                poster_id: req.params.id,
              },
            ],
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
          ],
        },
      ],
      order: [[Rating, 'date_created', 'DESC']],
    });

    console.log(dbUserData);
    const user = dbUserData.get({ plain: true });
    console.log(user);
    let totalScore = 0;
    let countRatingReceived = 0;
    for (const rating of user.ratings) {
      if (rating.recipient_id === req.session.userId) {
        rating.isRecipient = true;
        totalScore += rating.score;
        countRatingReceived++;
      } else {
        rating.isRecipient = false;
      }
    }

    user.ratingAverage = Math.floor(totalScore / countRatingReceived + 0.5);
    // res.status(200).json(user);
    console.log('============');
    console.log('profile');
    console.log(user);
    console.log(req.params.id);
    console.log('req.session.userId');
    console.log(req.session.userId);
    console.log('============');
    // display profile page with data of the user logged in
    res.render('profile', {
      ...user,
      loggedIn: req.session.loggedIn,
      profilePage: true,
      // cannot use === since param.id is string while session.userId is integer
      owner: req.params.id == req.session.userId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/newbasket', withAuth, async (req, res) => {
  try {
    const dbProductData = await Product.findAll();
    const products = dbProductData.map((product) =>
      product.get({ plain: true })
    );
    // res.status(200).json({products, profilePage: true});
    res.render('new-basket', {
      products,
      loggedIn: req.session.loggedIn,
      profilePage: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Basket,
          where: { id: req.params.id },
          include: [
            {
              model: Product,
            },
          ],
        },
      ],
    });

    const user = dbUserData.get({ plain: true });
    res.render('update-basket', {
      ...user,
      loggedIn: req.session.loggedIn,
      profilePage: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/edit', withAuth, async (req, res) => {
  try {
    res.render('profile-edit', {
      loggedIn: req.session.loggedIn,
      profilePage: true,
    });
    // res.status(200).json("profile-edit");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

router.get('/changeLocation', withAuth, async (req, res) => {
  try {
    res.render('location-edit');
  } catch (error) {
    res.status(500).json(error);
  }
});
