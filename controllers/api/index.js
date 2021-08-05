const router = require('express').Router();

const userRoutes = require('./user-routes');
const basketRoutes = require('./basket-routes');
const ratingRoutes = require('./rating-routes');

router.use('/users', userRoutes);
router.use('/baskets', basketRoutes);
router.use('/ratings', ratingRoutes);

module.exports = router;
