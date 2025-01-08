import OpenAI from 'openai';

class OpenAIService {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });
  }

  async generateResponse(message, conversationHistory) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a Crustdata API expert. Provide accurate, concise answers about the API. 
                     When providing API examples, use proper curl commands and explain each parameter.
                     For location-based queries, remind users to use standardized region values from the regions list.`
          },
          ...conversationHistory,
          { role: "user", content: message }
        ]
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate response');
    }
  }
}