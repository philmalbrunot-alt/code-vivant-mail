import { NextResponse } from 'next/server';
import { quizAnswersSchema } from '@/lib/schema';
import { generateFreeReading } from '@/lib/openai';
import type { QuizAnswers, FreeReading } from '@/lib/types';
import { buildFallbackFree } from '@/lib/free';

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const answers = quizAnswersSchema.parse(json);
    const reading = await generateFreeReading(answers);

    return NextResponse.json({ reading });
  } catch (error) {
    console.error('analyze/free', error);

    try {
      const raw = await req.clone().json().catch(() => null);
      const answers = raw as QuizAnswers | null;

      if (
        answers &&
        typeof answers.firstName === 'string' &&
        typeof answers.birthDate === 'string' &&
        typeof answers.birthPlace === 'string' &&
        typeof answers.currentFocus === 'string' &&
        typeof answers.energyState === 'string' &&
        typeof answers.stressResponse === 'string'
      ) {
        const reading: FreeReading = buildFallbackFree(answers);
        return NextResponse.json({ reading });
      }
    } catch (fallbackError) {
      console.error('analyze/free fallback', fallbackError);
    }

    return NextResponse.json(
      { error: 'Impossible de générer l’aperçu gratuit.' },
      { status: 400 }
    );
  }
}
