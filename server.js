const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Helper function to clean markdown from response
function cleanJsonResponse(text) {
  // Remove markdown code blocks
  text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  // Remove any leading/trailing whitespace
  text = text.trim();
  return text;
}

// Recommendation endpoint
app.post('/api/recommend', async (req, res) => {
  try {
    // Check if Google API key is configured
    if (!process.env.GOOGLE_API_KEY) {
      console.error('Google API key is not configured');
      return res.status(500).json({ error: 'Google API key is not configured' });
    }

    const { artists } = req.body;
    
    if (!artists || !Array.isArray(artists) || artists.length === 0) {
      return res.status(400).json({ error: 'Please provide at least one artist' });
    }

    console.log('Received artists:', artists);

    // Get the Gemini Pro model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    });

    // Create a prompt for the AI
    const prompt = `Given these artists: ${artists.join(', ')}, recommend 1-5 similar artists.
    Return a JSON array of objects with these exact property names:
    {
      "artistName": "Name of the artist",
      "genre": "Main genre",
      "era": "e.g., 90s, 2000s, current",
      "artistType": "solo, duo, or band",
      "explanation": "Brief explanation of why they're similar",
      "spotifyUrl": "Spotify search URL (format: https://open.spotify.com/search/[artist-name])"
    }
    
    Important: 
    1. Return ONLY valid JSON data, no markdown formatting or other text.
    2. For spotifyUrl, use the search URL format: https://open.spotify.com/search/[artist name with spaces replaced by %20]
    3. Make sure artist names are accurate and currently existing artists.`;

    console.log('Sending request to Gemini...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('Received response from Gemini');
    console.log('Raw response:', text); // Debug log

    // Clean and parse the response
    const cleanedText = cleanJsonResponse(text);
    console.log('Cleaned response:', cleanedText); // Debug log
    const recommendations = JSON.parse(cleanedText);
    
    console.log('Parsed recommendations:', recommendations);
    res.json(recommendations);
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ 
      error: 'Failed to generate recommendations',
      details: error.message
    });
  }
});

// Add a test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend server is running correctly' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Google API key ${process.env.GOOGLE_API_KEY ? 'is' : 'is NOT'} configured`);
}); 