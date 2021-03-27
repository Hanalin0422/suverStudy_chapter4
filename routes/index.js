const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/board', require('./board'));

module.exports = router;