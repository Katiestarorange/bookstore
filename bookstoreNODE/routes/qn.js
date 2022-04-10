var express = require('express');
var router = express.Router();
var qiniuToken = require('../config/qnconfig')


router.get('/qiniuToken', function(req, res, next) {
  res.status(200).send(qiniuToken.uploadToken)
});

module.exports = router;
