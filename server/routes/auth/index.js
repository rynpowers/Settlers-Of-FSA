const express = require('express');
const router = express.Router();

router.use('/', require('./login'));
process.env.GOOGLE_CALLBACK && router.use('/google', require('./google'));

module.exports = router;
