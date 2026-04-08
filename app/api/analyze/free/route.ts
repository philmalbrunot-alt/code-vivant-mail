import { NextResponse } from 'next/server';
import { quizAnswersSchema } from '@/lib/schema';
import { generateFreeReading } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const answers = quizAnswersSchema.parse(json);
    const reading = await generateFreeReading(answers);
    return NextResponse.json({ reading });
  } catch (error) {
    console.error('analyze/free', error);
    return NextResponse.json({ error: 'Impossible de générer l’aperçu gratuit.' }, { status: 400 });
  }
}
