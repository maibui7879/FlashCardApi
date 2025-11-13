const mongoose = require('mongoose');

const deckRatingSchema = new mongoose.Schema({
  deckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String }
}, { timestamps: true });

// Ensure a user can only rate a deck once
deckRatingSchema.index({ deckId: 1, userId: 1 }, { unique: true });

const DeckRating = mongoose.model('DeckRating', deckRatingSchema);

module.exports = DeckRating;
