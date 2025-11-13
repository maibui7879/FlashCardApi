const mongoose = require('mongoose');

const aiSuggestionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  level: { type: String, enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], required: true },
  goal: { type: String, required: true },
  timePerDay: { type: Number, required: true }, // in minutes
  generatedAt: { type: Date, default: Date.now },
  roadmap: [
    {
      week: { type: Number, required: true },
      focus: { type: String, required: true },
      decks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deck' }],
      dailyGoal: { type: Number } // cards per day
    }
  ]
});

const AiSuggestion = mongoose.model('AiSuggestion', aiSuggestionSchema);

module.exports = AiSuggestion;
