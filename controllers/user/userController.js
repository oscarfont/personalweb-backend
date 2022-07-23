// user-controller.js - User route module.

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('Users Controller! :)');
})

module.exports = router;