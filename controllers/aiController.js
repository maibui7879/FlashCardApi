const asyncHandler = require('express-async-handler');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// @desc    Get a personalized learning roadmap from AI
// @route   POST /api/v1/ai/suggestion
// @access  Private
const getAiSuggestion = asyncHandler(async (req, res) => {
    // Implementation for AI suggestion
    res.status(501).json({ message: 'Not implemented' });
});

// @desc    Generate a new deck of flashcards using AI
// @route   POST /api/v1/ai/generate-deck
// @access  Private
const generateDeckWithAi = asyncHandler(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Initialize the Google AI client with the API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Send the generated text back to the client
    res.json({ generatedText: text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

module.exports = { 
    getAiSuggestion, 
    generateDeckWithAi 
};