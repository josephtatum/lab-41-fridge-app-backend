const { Router } = require('express');
const Item = require('../models/Item');

module.exports = Router()
  .post('/', (req, res, next) => {
    Item
      .create(req.body)
      .then(item => res.send(item))
      .catch(next);
  });