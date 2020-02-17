const { Router } = require('express');
const Item = require('../models/Item');

module.exports = Router()
  .post('/', (req, res, next) => {
    Item
      .create(req.body)
      .then(item => res.send(item))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Item
      .find()
      .then(items => res.send(items))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Item
      .findById(req.params.id)
      .then(item => res.send(item))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Item
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(item => res.send(item))
      .catch(next);
  });
