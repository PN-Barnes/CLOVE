const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Product, Basket, Rating, Message } = require('../models');
const { Op } = require("sequelize");

router.get('/', withAuth, async (req, res) => {
    try {
      // get all rating of user logged in
      const dbRatingData = await Rating.findAll({
        where: {
            [Op.or]: [
                { recipient_id: req.session.userId },
                { poster_id: req.session.userId }
            ]
        },
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['password'],
                },
                as: "poster"
            },
            {
                model: User,
                attributes: {
                    exclude: ['password'],
                },
                as: "recipient"
            }
        ],
        order: [['date_created', 'DESC']],
    });
  
      const ratingRelated = dbRatingData.map(rating => rating.get({ plain: true }));
      const ratingReceived = [];
      const ratingPosted = [];
      for (const rating of ratingRelated) {
        if (rating.recipient_id === req.session.userId) {
          rating.isRecipient = true;
          ratingReceived.push(rating);
        } else {
          rating.isRecipient = false;
          ratingPosted.push(rating);
        }
      }
      const ratings = { ratingReceived, ratingPosted }

      res.status(200).json(ratings);
      // display rating page with data of the user logged in
      console.log(ratings);
      // res.render('rating', {
      //   ...ratings,
      //   loggedIn: req.session.loggedIn,
      //   profilePage: true,
      // });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;
