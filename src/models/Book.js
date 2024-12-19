const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    unique: true,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  popularity: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Book', BookSchema);