const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/product', require('./product'));
router.use('/categories', require('./categories'));

module.exports = router;