const mongoose = require('mongoose');

const learnSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck', required: true },
  mode: { type: String, enum: ['learn', 'quiz'], required: true },
  cardsReviewed: { type: Number, default: 0 },
  correctAnswers: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  duration: { type: Number, default: 0 }, // in seconds
  completedAt: { type: Date },
  cardProgress: [
    {
      cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
      status: { type: String, enum: ['new', 'learning', 'review', 'mastered'], default: 'new' },
      lastReviewed: { type: Date },
      nextReview: { type: Date },
      interval: { type: Number, default: 1 }, // in days
      easeFactor: { type: Number, default: 2.5 }
    }
  ]
});

const LearnSession = mongoose.model('LearnSession', learnSessionSchema);

module.exports = LearnSession;
