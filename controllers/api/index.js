const router = require('express').Router();

const userRoutes = require('./user-routes');
const basketRoutes = require('./basket-routes');
const messageRoutes = require('./message-routes');
const ratingRoutes = require('./rating-routes');
const productRoutes = require('./product-routes');
const testRoutes = require('./test-routes');

router.use('/users', userRoutes);
router.use('/baskets', basketRoutes);
router.use('/ratings', ratingRoutes);
router.use('/messages', messageRoutes);
router.use('/products', productRoutes);
router.use('/tests', testRoutes);

module.exports = router;
