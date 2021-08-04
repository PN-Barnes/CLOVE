const router = require('express').Router();
const { User, Product, Basket, Rating, Message } = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const dbUserData = await User.findByPk(req.session.userId, {
            attributes: { exclude: ['password'] },
            include: [
                { 
                    model: Basket 
                },
                {
                    model: Product
                }
            ],
        });

        const user = dbUserData.get({ plain: true });
        // res.status(200).json(user);

        // display profile page with data of the user logged in
        res.render('profile', {
            ...user,
            loggedIn: req.session.loggedIn,
            profilePage: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// create new blog only when logged in
router.get('/newbasket', withAuth, async (req, res) => {
    try {        
        res.render('newbasket', {
            loggedIn: req.session.loggedIn,
            profilePage: true
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// when user want to edit an existing blog
// response with the blog data with id === req.params.id when logged in
router.get('/edit/:id', withAuth, async (req, res) => {
    try {  
        const dbUserData = await User.findByPk(req.session.userId, {
            attributes: { exclude: ['password'] },
            include: [
                { 
                    model: Basket,
                    where: { id: req.params.id },
                },
                { 
                    model: Product,
                },
            ],
        });

        const user = dbUserData.get({ plain: true });

        res.render('updatebasket', {
            ...user,
            loggedIn: req.session.loggedIn,
            profilePage: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;