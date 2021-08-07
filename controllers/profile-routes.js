const router = require('express').Router();
const { User, Product, Basket, Rating, Message } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require("sequelize");
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
            include: [
              {
                model: Product,
              },
            ]
          },
          {
            model: Rating,
            on: {
              [Op.or]: [
                {
                  recipient_id: req.session.userId
                }, 
                {
                  poster_id: req.session.userId
                }
              ]
            },
            include: [
              {
                model: User,
                attributes: {
                  exclude: ['password'],
                },
                as: "poster",
              },
              {
                model: User,
                attributes: {
                  exclude: ['password'],
                },
                as: "recipient",
              }
            ]
          },
          {
            model: Message,
            on: {
              [Op.or]: [
                {
                  recipient_id: req.session.userId
                }, 
                {
                  sender_id: req.session.userId
                }
              ]
            },
            include: [
              {
                model: User,
                attributes: {
                  exclude: ['password'],
                },
                as: "sender",
              },
              {
                model: User,
                attributes: {
                  exclude: ['password'],
                },
                as: "recipient",
              }
            ]
          },
        ],
        order: [[Message, 'date_created', 'DESC'], [Rating, 'date_created', 'DESC']],
    });

    const user = dbUserData.get({ plain: true });
    let totalScore = 0;
    let countRatingReceived = 0;
    for (const rating of user.ratings) {
      if (rating.recipient_id === req.session.userId) {
        rating.isRecipient = true;
        totalScore += rating.score;
        countRatingReceived++;
      }
      else {
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
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/newbasket', withAuth, async (req, res) => {
  try {
    res.render('new-basket', {
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
            }
          ]
        }
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
    res.render('profile-edit');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
