import { z } from 'zod';

export const quizAnswersSchema = z.object({
  firstName: z.string().min(1),
  birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/),
birthPlace: z.string().optional().default(''),
  currentFocus: z.string().min(1),
  energyState: z.string().min(1),
  stressResponse: z.string().min(1),
});
