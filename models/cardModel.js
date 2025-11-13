const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  front: { type: String, required: true },
  back: { type: String, required: true },
  example: { type: String },
  image: { type: String },
  audio: { type: String },
  deckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck', required: true }
}, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
