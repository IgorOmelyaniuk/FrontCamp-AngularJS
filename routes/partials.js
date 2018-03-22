const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/:name', (req, res) => {
  fs.readFile(`public/views/partials/${req.params.name}.html`, 'utf8', (err, text) => {
    res.send(text);
  });
});

module.exports = router;