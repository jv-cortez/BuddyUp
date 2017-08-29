require('dotenv').config();

const express = require('express');
const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
let router = express.Router();

function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isEmpty(data.email ? data.email : '')) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email ? data.email : '')) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}

router.post('/', (req, res) => {
  const { errors, isValid } = validateInput(req.body);

  if (isValid) {
    const { username, email, password } = req.body;
    const password_digest = bcrypt.hashSync(password, 10);

    User.forge({
      username, email, password_digest
    }, { hasTimestamps: true }).save()
    .then(user => {
      const token = jwt.sign({
        id: user.attributes.id,
        username: user.attributes.username
      }, process.env.JWT_SECRET);
      res.json({ token });
    })
    .catch(err => res.status(500).json({ error: err }));

  } else {
    res.status(400).json(errors);
  }
});

module.exports = router;