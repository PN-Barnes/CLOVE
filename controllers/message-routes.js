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
  
      const messages = dbMessageData.map(message => message.get({ plain: true }));
      for (const message of messages) {
        message.isRecipient = message.recipient_id === req.session.userId;
      }
    //   res.status(200).json(messages);
      // display message page with data of the user logged in
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
  
//   router.get('/newbasket', withAuth, async (req, res) => {
//     try {
//       res.render('new-basket', {
//         loggedIn: req.session.loggedIn,
//         profilePage: true,
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   });
  
//   router.get('/edit/:id', withAuth, async (req, res) => {
//     try {
//       const dbUserData = await User.findByPk(req.session.userId, {
//         attributes: { exclude: ['password'] },
//         include: [
//           {
//             model: Basket,
//             where: { id: req.params.id },
//             include: [
//               {
//                 model: Product,
//               }
//             ]
//           }
//         ],
//       });
  
//       const user = dbUserData.get({ plain: true });
//       res.render('update-basket', {
//         ...user,
//         loggedIn: req.session.loggedIn,
//         profilePage: true,
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   });

module.exports = router;
