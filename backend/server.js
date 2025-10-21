import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Bible API - Using API.Bible (free tier available)
const BIBLE_API_KEY = process.env.BIBLE_API_KEY;
const BIBLE_API_URL = 'https://api.scripture.api.bible/v1';

// Function to search for Bible verses
async function searchBibleVerses(query) {
  try {
    if (!BIBLE_API_KEY) {
      // Return sample verses if API key is not configured
      return [
        {
          reference: 'John 3:16',
          text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
        },
      ];
    }

    // Use KJV Bible ID: de4e12af7f28f599-02
    const response = await axios.get(
      `${BIBLE_API_URL}/bibles/de4e12af7f28f599-02/search`,
      {
        params: { query, limit: 3 },
        headers: { 'api-key': BIBLE_API_KEY },
      }
    );

    const verses = response.data.data.verses.map((verse) => ({
      reference: verse.reference,
      text: verse.text.replace(/<[^>]*>/g, ''), // Remove HTML tags
    }));

    return verses;
  } catch (error) {
    console.error('Bible API error:', error.message);
    return [];
  }
}

// Main chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create a prompt that instructs the AI to act as a Bible-based assistant
    const systemPrompt = `You are a knowledgeable and compassionate Christian assistant that helps people understand the Bible and grow in their faith.

Your role is to:
1. Answer questions about God, the Bible, Christianity, and faith
2. Provide biblically-sound guidance and encouragement
3. Help users understand scripture in context
4. Suggest relevant Bible verses for their questions
5. Generate prayer points when requested or when appropriate

Guidelines:
- Be warm, encouraging, and non-judgmental
- Base your answers on biblical teachings
- When discussing theological topics, acknowledge different Christian perspectives when relevant
- If asked about topics outside Christianity, politely redirect to biblical wisdom on the subject
- Keep responses clear, concise, and accessible
- Always point back to Scripture as the ultimate authority

When providing your response, structure it with:
1. A direct, helpful answer to their question
2. Biblical context and relevant verses
3. Practical application or prayer points when appropriate`;

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const aiResponse = completion.choices[0].message.content;

    // Extract keywords from the message to search for relevant verses
    const verseKeywords = extractBibleKeywords(message);
    let verses = [];

    if (verseKeywords) {
      verses = await searchBibleVerses(verseKeywords);
    }

    // Generate prayer points if the message is about prayer or challenges
    const prayerPoints = generatePrayerPoints(message, aiResponse);

    res.json({
      answer: aiResponse,
      verses: verses,
      prayerPoints: prayerPoints,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({
      error: 'Failed to process your message. Please try again.',
    });
  }
});

// Helper function to extract Bible-related keywords
function extractBibleKeywords(message) {
  const lowerMessage = message.toLowerCase();

  // Common biblical themes and keywords
  const keywords = {
    faith: 'faith hope',
    love: 'love charity',
    prayer: 'prayer pray',
    peace: 'peace comfort',
    strength: 'strength courage',
    wisdom: 'wisdom knowledge',
    forgiveness: 'forgiveness mercy',
    guidance: 'guidance direction path',
    salvation: 'salvation saved grace',
    joy: 'joy rejoice',
    hope: 'hope trust',
    fear: 'fear worry anxiety',
  };

  for (const [key, searchTerms] of Object.entries(keywords)) {
    if (lowerMessage.includes(key)) {
      return searchTerms;
    }
  }

  return null;
}

// Helper function to generate prayer points
function generatePrayerPoints(message, aiResponse) {
  const lowerMessage = message.toLowerCase();
  const prayerKeywords = ['pray', 'prayer', 'help', 'struggle', 'difficult', 'challenge', 'need'];

  const needsPrayer = prayerKeywords.some(keyword => lowerMessage.includes(keyword));

  if (!needsPrayer) {
    return [];
  }

  // Generate contextual prayer points based on the message
  const points = [];

  if (lowerMessage.includes('strength') || lowerMessage.includes('difficult')) {
    points.push('Pray for divine strength and courage to face your challenges');
    points.push('Ask God to renew your mind and spirit each day');
  }

  if (lowerMessage.includes('guidance') || lowerMessage.includes('decision')) {
    points.push('Seek God\'s wisdom and direction for your path');
    points.push('Pray for discernment to recognize God\'s will');
  }

  if (lowerMessage.includes('peace') || lowerMessage.includes('anxiety') || lowerMessage.includes('worry')) {
    points.push('Ask God for His perfect peace that surpasses understanding');
    points.push('Surrender your worries and anxieties to the Lord');
  }

  if (lowerMessage.includes('faith') || lowerMessage.includes('believe')) {
    points.push('Pray for increased faith and trust in God\'s promises');
    points.push('Ask the Holy Spirit to strengthen your spiritual walk');
  }

  // Default prayer points if none matched
  if (points.length === 0) {
    points.push('Thank God for His presence in your life');
    points.push('Ask for wisdom and understanding of His Word');
    points.push('Pray for strength to live according to His will');
  }

  return points.slice(0, 4); // Return max 4 prayer points
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Bible Chat API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
