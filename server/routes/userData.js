require('dotenv').config();

const express = require('express');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
let router = express.Router();

router.get('/', (req, res) => {
  let token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: 'Failed to Authenticate' });
    } else {
      const identifier = decoded.username;
      User.query({
        where: { username: identifier }
      }).fetch({columns: ['username', 'email', 'blurb', 'tagline', 'imageurl']}).then(user => res.json(user))
    }
  })
});

module.exports = router;
