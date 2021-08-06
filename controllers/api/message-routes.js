const router = require('express').Router();
const { Op } = require("sequelize");
const { User, Basket, Product, Rating, Message } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all message
router.get('/', withAuth, async (req, res) => {
    try {
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
            ]
        });
        res.status(200).json(dbMessageData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET message with id === req.params.id
router.get('/:id', withAuth, async (req, res) => {
    try {
        const dbMessageData = await Message.findByPk(req.params.id, {
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
            ]
        });
        res.status(200).json(dbMessageData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET info of message of certain user with 
//recipient_id === req.params.id && sender_id: req.session.userId
// || sender_id === req.params.id && recipient_id: req.session.userId
router.get('/with/:id', withAuth, async (req, res) => {
    try {
        const dbMessageData = await Message.findAll({
            where: {
                [Op.or]: {
                    [Op.and]: [
                        { recipient_id: req.session.userId },
                        { sender_id: req.params.id }
                    ], 
                    [Op.and]: [
                        { recipient_id: req.params.id },
                        { sender_id: req.session.userId }
                    ]
                },
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
            ]
        });
        res.status(200).json(dbMessageData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// CREATE a new message
router.post('/', withAuth, async (req, res) => {
    try {
        // assume user can provide recipient_id
        const dbMessageData = await Message.create({
            // req.body
            content: req.body.content,
            recipient_id: req.body.recipient_id, // need to update with User.find
            sender_id: req.session.userId
        });
        res.status(200).json(dbMessageData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// DELETE an existing message with id === req.params.id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        let dbMessageData = await Message.findByPk(req.params.id);
        if (!dbMessageData) {
            res.status(400).json({ message: 'No message found with that id!' });
            return;
        } else if (dbMessageData.get({plain: true}).sender_id !== req.session.userId) {
            res.status(400).json({ message: 'Sorry you cannot delete the message with that id!' });
        } else {
            dbMessageData = await Message.destroy(
                {
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json({ message: 'Delete the message successfully!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;