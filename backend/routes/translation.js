const express = require('express')
const router = express.Router();
const request = require('request');

router.get('/', (req, res, next) => {
  let lang = req.query.lang + '.json';
  let text = req.query.text;
  let uri = lang+'?text='+text;
  let response = request("https://api.funtranslations.com/translate/" + uri, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    res.send(body)
    }
  })
})

module.exports = router;
