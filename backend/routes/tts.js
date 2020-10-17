var express = require('express');
var router = express.Router();
const https = require('https');

router.get('/', (req, res, next) => {
    res.send("TTS")
})

module.exports = router;
