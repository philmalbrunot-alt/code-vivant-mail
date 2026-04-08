import { buildFallbackFree } from './free';
import { buildFreePrompt } from './prompts';
import type { FreeReading, QuizAnswers } from './types';

async function callOpenAI(prompt: string, model: string) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.8,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'Tu produis uniquement du JSON valide, sans markdown ni texte avant ou après.' },
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI error ${res.status}`);
  }

  const json = await res.json();
  const content = json?.choices?.[0]?.message?.content;
  if (!content || typeof content !== 'string') {
    throw new Error('Réponse OpenAI invalide');
  }
  return content;
}

export async function generateFreeReading(answers: QuizAnswers): Promise<FreeReading> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return buildFallbackFree(answers);
    }

    const model = process.env.OPENAI_FREE_MODEL || 'gpt-5.4-mini';
    const raw = await callOpenAI(buildFreePrompt(answers), model);
    return JSON.parse(raw) as FreeReading;
  } catch (error) {
    console.error('generateFreeReading fallback:', error);
    return buildFallbackFree(answers);
  }
}
