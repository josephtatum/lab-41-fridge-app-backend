const { Router } = require('express');
const Item = require('../models/Item');

module.exports = Router()
  .post('/', (req, res, next) => {
    console.log(req.body);
    console.log(req.body.items);
    const parsedBody = JSON.parse(req.body.items);
    req.body.items.forEach(item => {
      Item
        .create(item)
        .then(item => res.send(item))
        .catch(next);
    });
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
  })
  .delete('/:id', (req, res, next) => {
    Item
      .findByIdAndDelete(req.params.id)
      .then(item => res.send(item))
      .catch(next);
  });
