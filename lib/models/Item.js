const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  expirationDate: {
    type: Date,
    required: true
  }

});

module.exports = mongoose.model('Item', ItemSchema);
