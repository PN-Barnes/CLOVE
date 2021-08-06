const router = require('express').Router();

const userRoutes = require('./user-routes');
const basketRoutes = require('./basket-routes');
const messageRoutes = require('./message-routes');
const ratingRoutes = require('./rating-routes');

router.use('/users', userRoutes);
router.use('/baskets', basketRoutes);
router.use('/ratings', ratingRoutes);
router.use('/messages', messageRoutes);

module.exports = router;
