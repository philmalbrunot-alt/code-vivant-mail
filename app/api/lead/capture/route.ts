import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email || '').trim().toLowerCase();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Adresse e-mail invalide.' },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.MAKE_LEAD_WEBHOOK_URL;

    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: body.source || 'resultat_email_gate',
          firstName: body.firstName || '',
          birthDate: body.birthDate || '',
          birthPlace: body.birthPlace || '',
          currentFocus: body.currentFocus || '',
          energyState: body.energyState || '',
          stressResponse: body.stressResponse || '',
          createdAt: new Date().toISOString(),
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'Capture email impossible.' },
      { status: 500 }
    );
  }
}
