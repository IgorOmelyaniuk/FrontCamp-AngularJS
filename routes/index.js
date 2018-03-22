const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  fs.readFile('public/views/index.html', 'utf8', (err, text) => {
    res.send(text);
  });
});

module.exports = router;