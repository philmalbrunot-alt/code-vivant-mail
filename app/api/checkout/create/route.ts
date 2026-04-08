import { NextResponse } from 'next/server';
import { quizAnswersSchema } from '@/lib/schema';
import { compactAnswers, signPayload } from '@/lib/signing';
import { getStripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const answers = quizAnswersSchema.parse(json);

    const price = process.env.STRIPE_PRICE_ID_PROFILE;
    if (!price) {
      return NextResponse.json({ error: 'STRIPE_PRICE_ID_PROFILE manquant.' }, { status: 500 });
    }

    const stripe = getStripe();
    const baseUrl = process.env.APP_BASE_URL || new URL(req.url).origin;
    const compact = compactAnswers(answers);
    const { sig } = signPayload(compact);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price, quantity: 1 }],
      success_url: `${baseUrl}/merci?paid=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/resultat`,
      metadata: {
        fn: compact.fn,
        bd: compact.bd,
        bp: compact.bp,
        cf: compact.cf,
        es: compact.es,
        sr: compact.sr,
        sig,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('checkout/create', error);
    return NextResponse.json({ error: 'Impossible de créer la session de paiement.' }, { status: 400 });
  }
}
