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
- Return strictly JSON in this format:
{
  "roadmap": [
    {
      "week": <number>,
      "focus": "<string>",
      "suggestedDecks": ["<string>", ...],
      "dailyGoal": <number>
    }
  ]
}
Do NOT include explanations or markdown.
`;

    const result = await model.generateContent(prompt);
    let aiText = (await result.response).text();

    // Remove potential ```json or markdown wrappers
    aiText = aiText.trim().replace(/^```json/, '').replace(/```$/, '');

    let roadmapData;
    try {
      roadmapData = JSON.parse(aiText);
    } catch (err) {
      console.error('Failed to parse AI JSON:', err, aiText);
      // fallback roadmap
      roadmapData = {
        roadmap: [
          { week: 1, focus: 'Basics', suggestedDecks: [], dailyGoal: timePerDay },
          { week: 2, focus: 'Vocabulary', suggestedDecks: [], dailyGoal: timePerDay },
        ],
      };
    }

    // Return preview only, do not save to DB
    res.json({
      userId,
      level,
      goal,
      timePerDay,
      roadmap: roadmapData.roadmap,
      aiText
    });
  } catch (error) {
    console.error('Error generating AI suggestion:', error);
    res.status(500).json({ error: 'Failed to generate AI suggestion' });
  }
});

// @desc    Generate new deck using AI (preview only)
// @route   POST /api/v1/ai/generate-deck
// @access  Private
const generateDeckWithAi = asyncHandler(async (req, res) => {
  const { prompt, level, topic, language } = req.body;
  const userId = req.user._id;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const formattedPrompt = `
Generate a JSON array of flashcards based on this prompt:
"${prompt}"
Format strictly as:
[
  {
    "front": "<question text>",
    "back": "<answer text>",
    "example": "<optional example>",
    "image": "<optional image URL>"
  }
]
Do NOT include explanations or markdown.
`;

    const result = await model.generateContent(formattedPrompt);
    let aiText = (await result.response).text();

    aiText = aiText.trim().replace(/^```json/, '').replace(/```$/, '');

    let cards;
    try {
      cards = JSON.parse(aiText);
    } catch (err) {
      console.error('Failed to parse AI JSON for deck:', err, aiText);
      cards = [];
    }

    // Return preview only, do not save to DB
    res.json({
      requestId: uuidv4(),
      userId,
      prompt,
      level,
      topic,
      language,
      generatedCards: cards,
      aiText
    });
  } catch (error) {
    console.error('Error generating AI deck:', error);
    res.status(500).json({ error: 'Failed to generate AI deck' });
  }
});

module.exports = { getAiSuggestion, generateDeckWithAi };
