import express from 'express';
import { CrustdataService } from '../services/crustdataService.js';
import { OpenAIService } from '../services/openaiService.js';

const router = express.Router();
const crustdataService = new CrustdataService(process.env.CRUSTDATA_API_TOKEN);
const openaiService = new OpenAIService(process.env.OPENAI_API_KEY);

// Initialize Crustdata service
crustdataService.initialize();

router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;
    
    // Generate response using OpenAI
    const response = await openaiService.generateResponse(message, conversationHistory);
    
    // If response contains curl command, validate it
    if (response.includes('curl')) {
      const validation = await crustdataService.validateApiCall(response);
      if (!validation.isValid) {
        return res.json({
          response: `${response}\n\nNote: This API call needs adjustment: ${validation.error}\n\nValid regions: ${validation.validRegions.join(', ')}`
        });
      }
    }
    
    res.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

router.get('/questions', async (req, res) => {
  try {
    const questions = [
      { question: 'How do I search for people by their current title?' },
      { question: 'What is the correct format for region values?' },
      { question: 'How can I search for people at a specific company?' },
      { question: 'How do I use the person search API?' }
    ];
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

export default router;