const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const profileRoutes = require('./profile-routes.js');
const basketRoutes = require('./basket-routes');

router.use('/', homeRoutes);
router.use('/profile', profileRoutes);
router.use('/api', apiRoutes);
router.use('/baskets', basketRoutes);

module.exports = router;
