'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FreeReading, QuizAnswers } from '@/lib/types';
import { FREE_STORAGE_KEY } from '@/lib/storage';
import { BrandHeader, Container, Label, Panel, PrimaryButton, Shell } from './ui';

export function ResultClient() {
  const router = useRouter();
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const [reading, setReading] = useState<FreeReading | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(FREE_STORAGE_KEY);
    if (!raw) {
      router.replace('/');
      return;
    }

    try {
      const parsed = JSON.parse(raw) as { answers: QuizAnswers; reading: FreeReading };
      setAnswers(parsed.answers);
      setReading(parsed.reading);
    } catch {
      router.replace('/');
    } finally {
      setLoading(false);
    }
  }, [router]);

  async function checkout() {
    if (!answers) return;

    try {
      setCheckoutLoading(true);
      setError(null);

      const res = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(answers),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data?.error || 'Paiement indisponible.');
      }

      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Paiement indisponible.');
      setCheckoutLoading(false);
    }
  }

  if (loading || !reading) {
    return (
      <Shell>
        <Container>
          <BrandHeader />
          <Panel className="py-12 text-center">Préparation du résultat…</Panel>
        </Container>
      </Shell>
    );
  }

  return (
    <Shell>
      <Container>
        <BrandHeader />

        <Panel>
          <Label>APERÇU GRATUIT</Label>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-cv-text md:text-6xl">
            Ce que votre portrait révèle
          </h1>
          <p className="mt-5 text-lg leading-8 text-cv-text/90">{reading.hero}</p>
          <p className="mt-4 text-sm leading-7 text-cv-muted md:text-base">{reading.reveal}</p>
        </Panel>

        <div className="mt-6 space-y-4">
          {reading.sections.map((section) => (
            <Panel key={section.title} className="bg-cv-panelAlt">
              <h2 className="font-serif text-2xl text-cv-text">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-cv-muted md:text-base">{section.body}</p>
            </Panel>
          ))}
        </div>

        <Panel className="mt-6">
          <Label>{reading.locked.label}</Label>
          <h2 className="mt-3 font-serif text-3xl text-cv-text">{reading.locked.title}</h2>
          <p className="mt-4 text-sm leading-7 text-cv-muted md:text-base">{reading.locked.body}</p>
          <p className="mt-4 text-sm leading-7 text-cv-muted md:text-base">{reading.locked.body2}</p>
          <p className="mt-4 text-sm leading-7 text-cv-text/90">{reading.locked.line}</p>
            <h3 className="mt-8 text-center font-serif text-2xl leading-tight text-cv-text md:text-3xl">Vous pouvez soit approfondir ce portrait à votre rythme, soit réserver une séance pour clarifier directement ce qui vous retient encore.</h3>


          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-cv-gold/20 bg-cv-panelAlt p-5">
              <h3 className="font-serif text-2xl text-cv-text">Profil complet</h3>
              <p className="mt-2 text-3xl text-cv-gold">7 €</p>
              <p className="mt-4 text-sm leading-7 text-cv-muted">
                Recevez la lecture complète de votre profil :
              </p>
               <p className="mt-4 text-sm leading-7 text-cv-muted">
                le verrou principal, l’héritage invisible, le rapport à la légitimité, l’élan retenu et la bascule la plus juste pour vous.
              </p>
              <p className="mt-4 text-sm leading-7 text-cv-muted">
               Idéal si vous voulez déjà comprendre plus clairement ce qui se joue en vous, à votre rythme.
              </p>
              <p className="mt-4 text-sm leading-7 text-cv-muted">
                Vous recevrez l’analyse complète par mail quelques minutes après paiement. 
              </p>
              <div className="mt-6">
                <PrimaryButton onClick={checkout} disabled={checkoutLoading} className="w-full">
                  {checkoutLoading ? 'Ouverture du paiement…' : 'Recevoir mon portrait complet'}
                </PrimaryButton>
              </div>
            </div>

            <div className="relative rounded-[24px] border border-cv-gold/30 bg-cv-panelAlt p-5 shadow-[0_0_0_1px_rgba(200,155,90,0.06)]">
              <div className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full border border-cv-gold/30 bg-cv-gold/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-cv-gold">
                <span aria-hidden="true">★</span>
                <span>Recommandé</span>
              </div>

              <h3 className="pr-28 font-serif text-2xl text-cv-text">Séance de clarification</h3>
              <p className="mt-2 text-3xl text-cv-gold">97 €</p>

              <p className="mt-4 text-sm leading-7 text-cv-muted">
                1 h en visio pour clarifier ce qui vous retient encore et amorcer une première bascule concrète.
              </p>

              <p className="mt-4 text-sm leading-7 text-cv-muted">
                Nous partons de votre lecture complète pour voir clair dans ce qui vous retient encore, remettre en
                mouvement ce qui s’est figé, et clarifier un prochain cap plus juste, plus vivant, plus incarné.
              </p>

              <p className="mt-4 text-sm leading-7 text-cv-muted">
                Ce n’est pas seulement un décryptage. C’est une première traversée accompagnée.
              </p>

              <p className="mt-4 text-sm leading-7 text-cv-text/90">La lecture complète est incluse.</p>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      'https://koalendar.com/e/echange-avec-philippe-malbrunot',
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-cv-gold/35 bg-cv-gold/12 px-5 py-4 text-sm font-medium text-cv-text transition hover:bg-cv-gold/20"
                >
                  Réserver ma séance
                </button>
              </div>
            </div>
          </div>

          {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
        </Panel>
      </Container>
    </Shell>
  );
}
