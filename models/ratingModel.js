const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    deck: {
      type: mongoose.Schema.ObjectId,
      ref: 'Deck',
      required: true,
    },
  },
  {
    timestamps: true,
    // Ensure that a user can only rate a deck once
    index: { unique: true, fields: ['user', 'deck'] },
  }
);

module.exports = mongoose.model('Rating', ratingSchema);
