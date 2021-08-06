const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Product, Basket, Rating, Message } = require('../models');
const { Op } = require("sequelize");

router.get('/', withAuth, async (req, res) => {
    try {
      // get all message of user logged in
      const dbMessageData = await Message.findAll({
        where: {
            [Op.or]: [
                { recipient_id: req.session.userId },
                { sender_id: req.session.userId }
            ]
        },
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['password'],
                },
                as: "sender"
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
  
      const messageRelated = dbMessageData.map(message => message.get({ plain: true }));
      const messageReceived = [];
      const messageSent = [];
      for (const message of messageRelated) {
        if (message.recipient_id === req.session.userId) {
            messageReceived.push(message);
        } else {
            messageSent.push(message);
        }
      }
      const messages = { messageReceived, messageSent }

    //   res.status(200).json(messages);
      // display message page with data of the user logged in
      console.log(messages);
      res.render('message', {
        ...messages,
        loggedIn: req.session.loggedIn,
        profilePage: true,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
module.exports = router;
