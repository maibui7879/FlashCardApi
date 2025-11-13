const mongoose = require('mongoose');

const aiGeneratedDeckSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prompt: { type: String, required: true },
  level: { type: String, enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  topic: { type: String },
  language: { type: String },
  generatedDeck: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck' },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const AiGeneratedDeck = mongoose.model('AiGeneratedDeck', aiGeneratedDeckSchema);

module.exports = AiGeneratedDeck;
