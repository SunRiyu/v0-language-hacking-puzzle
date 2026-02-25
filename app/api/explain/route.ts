import { streamText } from 'ai';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    const { puzzleType, question, answer, language, difficulty } = await request.json();

    if (!question || !answer) {
      return new Response('Missing required fields', { status: 400 });
    }

    const systemPrompt = `You are an expert linguist and language teacher specializing in ancient languages and linguistic patterns. 
Your role is to provide clear, engaging, and educational explanations about language puzzles.

When explaining puzzle answers:
1. Explain the linguistic principles involved
2. Provide historical or cultural context if relevant
3. Break down the answer step-by-step
4. Give examples of similar patterns in other languages
5. Make it engaging and understandable for learners

Keep explanations concise but comprehensive, typically 2-3 paragraphs.`;

    const userMessage = `Puzzle Type: ${puzzleType}
Language: ${language}
Difficulty Level: ${difficulty}/5

Question: ${question}
Answer: ${answer}

Please explain this puzzle solution in detail, covering:
- Why this is the correct answer
- The linguistic principles involved
- Any historical or cultural context
- Tips for solving similar puzzles`;

    const result = streamText({
      model: 'openai/gpt-4o-mini',
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('[v0] Error in explain endpoint:', error);
    return new Response('Failed to generate explanation', { status: 500 });
  }
};
