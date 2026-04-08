import crypto from 'crypto';
import type { QuizAnswers } from './types';

export function compactAnswers(answers: QuizAnswers) {
  return {
    fn: answers.firstName,
    bd: answers.birthDate,
    bp: answers.birthPlace,
    cf: answers.currentFocus,
    es: answers.energyState,
    sr: answers.stressResponse,
  };
}

export function signPayload(payload: ReturnType<typeof compactAnswers>) {
  const secret = process.env.APP_SIGNING_SECRET || 'change-me';
  const serialized = JSON.stringify(payload);
  const sig = crypto.createHmac('sha256', secret).update(serialized).digest('hex');
  return { serialized, sig };
}
