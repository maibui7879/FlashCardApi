const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPublic: { type: Boolean, default: false },
  tags: [{ type: String }],
  language: { type: String, required: true },
  level: { type: String, enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  subject: { type: String },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  stats: {
    totalLearns: { type: Number, default: 0 },
    totalQuizzes: { type: Number, default: 0 }
  }
}, { timestamps: true });

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;
