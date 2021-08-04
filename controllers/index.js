const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const userRoutes = require('./user-routes.js');

router.use('/', homeRoutes);
router.use('/userRoutes', userRoutes);
router.use('/api', apiRoutes);

module.exports = router;
