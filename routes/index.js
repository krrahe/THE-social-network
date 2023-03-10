const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes).use('*', (req, res) => res.status(404).send('404 Error from /api/index.js'));

module.exports = router;