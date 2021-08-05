const router = require('express').Router();

const userRoutes = require('./user-routes');
const basketRoutes = require('./basket-routes');

router.use('/users', userRoutes);
router.use('/baskets', basketRoutes);

module.exports = router;
