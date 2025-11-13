const asyncHandler = require('express-async-handler');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { v4: uuidv4 } = require('uuid');

// @desc    Generate personalized learning roadmap (preview only)
// @route   POST /api/v1/ai/suggestion
// @access  Private
const getAiSuggestion = asyncHandler(async (req, res) => {
  const { level, goal, timePerDay } = req.body;
  const userId = req.user._id;

  if (!level || !goal || !timePerDay) {
    return res.status(400).json({ error: 'level, goal, and timePerDay are required' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
Generate a JSON roadmap for a ${level} English learner.
Requirements:
- Goal: "${goal}"
- Study time: ${timePerDay} minutes per day
- Provide weekly focus, suggestedDecks, dailyGoal
- Return strictly JSON with a "roadmap" array
- Do NOT include explanations, markdown, or extra text
`;

    const result = await model.generateContent(prompt);
    let aiText = (await result.response).text();

    aiText = aiText.trim().replace(/^```json/, '').replace(/```$/, '');

    let roadmapData;
    try {
      roadmapData = JSON.parse(aiText);
    } catch (err) {
      console.error('Failed to parse AI JSON:', err, aiText);
      roadmapData = {
        roadmap: [
          { week: 1, focus: 'Basics', suggestedDecks: [], dailyGoal: timePerDay },
          { week: 2, focus: 'Vocabulary', suggestedDecks: [], dailyGoal: timePerDay },
        ],
      };
    }

    res.json({
      userId,
      level,
      goal,
      timePerDay,
      roadmap: roadmapData.roadmap
    });
  } catch (error) {
    console.error('Error generating AI suggestion:', error);
    res.status(500).json({ error: 'Failed to generate AI suggestion' });
  }
});

// @desc    Generate deck preview using AI (no DB save)
// @route   POST /api/v1/ai/generate-deck-preview
// @access  Private
const generateDeckPreview = asyncHandler(async (req, res) => {
  const { prompt, level, topic, language } = req.body;
  const userId = req.user._id;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const requestId = uuidv4();

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const deckPrompt = `
Generate a JSON array of flashcards for the following prompt:
"${prompt}"
Requirements:
- Each card should have "front" and "back" fields
- Include at least 5 cards
- Return strictly JSON array
- Do NOT include explanations, markdown, or extra text
`;

    const result = await model.generateContent(deckPrompt);
    let aiText = (await result.response).text();
    aiText = aiText.trim().replace(/^```json/, '').replace(/```$/, '');

    let cards;
    try {
      cards = JSON.parse(aiText);
    } catch (err) {
      console.error('Failed to parse AI JSON:', err, aiText);
      cards = [
        { front: 'Sample Card 1', back: 'Answer 1' },
        { front: 'Sample Card 2', back: 'Answer 2' },
      ];
    }

    res.json({
      requestId,
      userId,
      level,
      topic,
      language,
      cards
    });
  } catch (error) {
    console.error('Error generating deck preview:', error);
    res.status(500).json({ error: 'Failed to generate deck preview' });
  }
});

module.exports = { getAiSuggestion, generateDeckPreview };
