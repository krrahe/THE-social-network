const router = require('express').Router();
const hmmRoutes = require('./hmm-routes');
const userRoutes = require('./user-routes');

// route names
router.use('/hmms', hmmRoutes);
router.use('/users', userRoutes);

// export routes
module.exports = router;