const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('hit the user get route');
});

module.exports = router;
