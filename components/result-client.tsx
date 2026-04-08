'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FreeReading, QuizAnswers } from '@/lib/types';
import { FREE_STORAGE_KEY } from '@/lib/storage';
import { BrandHeader, Container, Label, Panel, PrimaryButton, SecondaryButton, Shell } from './ui';

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
      if (!res.ok || !data.url) throw new Error(data?.error || 'Paiement indisponible.');
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
          <h1 className="mt-4 font-serif text-4xl leading-tight text-cv-text md:text-6xl">Ce que votre portrait révèle</h1>
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

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-cv-gold/20 bg-cv-panelAlt p-5">
              <h3 className="font-serif text-2xl text-cv-text">Profil complet</h3>
              <p className="mt-2 text-3xl text-cv-gold">7 €</p>
              <p className="mt-4 text-sm leading-7 text-cv-muted">
                Déverrouillez la lecture complète : le verrou principal, l’héritage invisible, le rapport à la légitimité,
                l’élan retenu et la direction de bascule la plus juste. Vous le recevrez par mail après paiement.
              </p>
              <div className="mt-6">
                <PrimaryButton onClick={checkout} disabled={checkoutLoading} className="w-full">
                  {checkoutLoading ? 'Ouverture du paiement…' : 'Déverrouiller mon portrait complet'}
                </PrimaryButton>
              </div>
            </div>

            <div className="rounded-[24px] border border-cv-line bg-cv-panelAlt p-5">
              <h3 className="font-serif text-2xl text-cv-text">Séance avec Philippe</h3>
              <p className="mt-2 text-3xl text-cv-gold">97 €</p>
              <p className="mt-4 text-sm leading-7 text-cv-muted">
                1 h en visio pour sortir d’une logique de survie et retrouver une présence plus libre.
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
                <SecondaryButton
                  onClick={() => window.open('https://koalendar.com/e/echange-avec-philippe-malbrunot', '_blank', 'noopener,noreferrer')}
                  className="w-full"
                >
                  Réserver ma séance
                </SecondaryButton>
              </div>
            </div>
          </div>

          {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
        </Panel>
      </Container>
    </Shell>
  );
}
