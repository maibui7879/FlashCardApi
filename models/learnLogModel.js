const mongoose = require('mongoose');

const learnLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  summary: {
    decksCreated: { type: Number, default: 0 },
    decksLearned: { type: Number, default: 0 },
    cardsLearned: { type: Number, default: 0 },
    quizzesTaken: { type: Number, default: 0 },
    avgAccuracy: { type: Number, default: 0 }
  },
  activities: [
    {
      type: { type: String, enum: ['create_deck', 'learn_deck', 'quiz_deck', 'edit_deck'], required: true },
      deckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck' },
      deckTitle: { type: String },
      timestamp: { type: Date, default: Date.now },
      details: { type: mongoose.Schema.Types.Mixed }
    }
  ]
});

// Create a compound index to ensure one log per user per day
learnLogSchema.index({ userId: 1, date: 1 }, { unique: true });

const LearnLog = mongoose.model('LearnLog', learnLogSchema);

module.exports = LearnLog;
