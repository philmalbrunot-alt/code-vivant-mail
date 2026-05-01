 'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { QuizAnswers } from '@/lib/types';
import { FREE_STORAGE_KEY } from '@/lib/storage';
import { BrandHeader, Container, Label, Panel, PrimaryButton, Shell } from './ui';

type ResultSection = {
  title: string;
  body: string;
};

type ResultLocked = {
  label: string;
  title: string;
  body: string;
  line: string;
};

type ResultReading = {
  hero: string;
  sections: ResultSection[];
  locked: ResultLocked;
};

const RESULT_UNLOCKED_KEY = 'codevivant_result_unlocked';
const LEAD_EMAIL_KEY = 'codevivant_lead_email';

function isResultReading(value: unknown): value is ResultReading {
  if (!value || typeof value !== 'object') return false;

  const v = value as Record<string, unknown>;

  return (
    typeof v.hero === 'string' &&
    Array.isArray(v.sections) &&
    v.sections.every((section) => {
      if (!section || typeof section !== 'object') return false;
      const s = section as Record<string, unknown>;
      return typeof s.title === 'string' && typeof s.body === 'string';
    }) &&
    !!v.locked &&
    typeof v.locked === 'object' &&
    typeof (v.locked as Record<string, unknown>).label === 'string' &&
    typeof (v.locked as Record<string, unknown>).title === 'string' &&
    typeof (v.locked as Record<string, unknown>).body === 'string' &&
    typeof (v.locked as Record<string, unknown>).line === 'string'
  );
}

function splitHero(text: string) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function ResultClient() {
  const router = useRouter();

  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const [reading, setReading] = useState<ResultReading | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailLoading, setEmailLoading] = useState(false);
  const [resultUnlocked, setResultUnlocked] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(FREE_STORAGE_KEY);

    if (!raw) {
      router.replace('/');
      return;
    }

    try {
      const parsed = JSON.parse(raw) as {
        answers?: QuizAnswers;
        reading?: unknown;
      };

      if (!parsed.answers || !isResultReading(parsed.reading)) {
        router.replace('/');
        return;
      }

      const savedEmail = localStorage.getItem(LEAD_EMAIL_KEY);
      const unlocked = localStorage.getItem(RESULT_UNLOCKED_KEY);

      if (savedEmail) {
        setEmail(savedEmail);
      }

      if (savedEmail && unlocked === 'true') {
        setResultUnlocked(true);
      }

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

  async function unlockResult(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmailError(null);

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setEmailError('Entrez une adresse e-mail valide.');
      return;
    }

    try {
      setEmailLoading(true);

      await fetch('/api/lead/capture', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: cleanEmail,
          source: 'resultat_email_gate',
          firstName: answers?.firstName || '',
          birthDate: answers?.birthDate || '',
          birthPlace: answers?.birthPlace || '',
          currentFocus: answers?.currentFocus || '',
          energyState: answers?.energyState || '',
          stressResponse: answers?.stressResponse || '',
        }),
      });

      localStorage.setItem(LEAD_EMAIL_KEY, cleanEmail);
      localStorage.setItem(RESULT_UNLOCKED_KEY, 'true');

      setEmail(cleanEmail);
      setResultUnlocked(true);
    } catch {
      setEmailError('Impossible de débloquer la lecture. Réessayez.');
    } finally {
      setEmailLoading(false);
    }
  }

  const heroParagraphs = useMemo(() => {
    if (!reading) return [];
    return splitHero(reading.hero);
  }, [reading]);

  const previewSection = reading?.sections[0] ?? null;
  const remainingSections = reading?.sections.slice(1) ?? [];

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

          <div className="mt-4 space-y-4">
            {heroParagraphs.map((paragraph, index) => (
              <h1
                key={`hero-${index}`}
                className="font-serif text-2xl leading-tight text-cv-text"
              >
                {paragraph}
              </h1>
            ))}
          </div>
        </Panel>

        {previewSection ? (
          <div className="mt-6">
            <Panel className="bg-cv-panelAlt">
              <h2 className="font-serif text-2xl text-cv-text">
                {previewSection.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-cv-muted md:text-base">
                {previewSection.body}
              </p>
            </Panel>
          </div>
        ) : null}

        {!resultUnlocked ? (
          <Panel className="mt-6 border-cv-gold/25 bg-cv-panel">
            <Label>LECTURE GRATUITE</Label>

            <h2 className="mt-3 font-serif text-3xl leading-tight text-cv-text md:text-4xl">
              Votre portrait est prêt.
            </h2>

            <p className="mt-4 text-sm leading-7 text-cv-muted md:text-base">
              Entrez votre e-mail pour débloquer la suite de votre lecture
              gratuite : héritage invisible, rapport à la valeur, tension
              intérieure et direction de bascule.
            </p>

            <form onSubmit={unlockResult} className="mt-6 space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full rounded-[18px] border border-cv-gold/20 bg-cv-bg px-4 py-3 text-sm text-cv-text outline-none placeholder:text-cv-muted"
              />

              {emailError ? (
                <p className="text-sm text-red-300">{emailError}</p>
              ) : null}

              <PrimaryButton
                type="submit"
                disabled={emailLoading}
                className="w-full"
              >
                {emailLoading
                  ? 'Déblocage de votre lecture…'
                  : 'Débloquer ma lecture gratuite'}
              </PrimaryButton>
            </form>

            <p className="mt-4 text-xs leading-6 text-cv-muted">
              Aucun spam. Votre e-mail sert uniquement à retrouver votre lecture
              CODE VIVANT.
            </p>
          </Panel>
        ) : (
          <>
            {remainingSections.length > 0 ? (
              <div className="mt-6 space-y-4">
                {remainingSections.map((section) => (
                  <Panel key={section.title} className="bg-cv-panelAlt">
                    <h2 className="font-serif text-2xl text-cv-text">
                      {section.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-cv-muted md:text-base">
                      {section.body}
                    </p>
                  </Panel>
                ))}
              </div>
            ) : null}

            <Panel className="mt-6">
              <Label>{reading.locked.label}</Label>

              <h2 className="mt-3 font-serif text-3xl text-cv-text">
                {reading.locked.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-cv-muted md:text-base">
                {reading.locked.body}
              </p>

              <p className="mt-4 text-sm leading-7 text-cv-text/90">
                {reading.locked.line}
              </p>

              <h3 className="mt-8 text-center font-serif text-2xl leading-tight text-cv-text md:text-3xl">
                La suite est déjà écrite pour vous.
                <br />
                Recevez votre portrait intégral et le livret de bascule, par
                e-mail, maintenant.
              </h3>

              <div className="mx-auto mt-8 max-w-4xl">
                <div className="grid gap-6 rounded-[28px] border border-cv-gold/25 bg-cv-panelAlt p-5 md:grid-cols-[0.9fr_1.1fr] md:p-6">
                  <div className="flex items-center justify-center">
                    <img
                      src="/pack-reprendre-les-commandes.png"
                      alt="Livret Reprendre les commandes"
                      className="w-full max-w-[280px] rounded-[20px] border border-cv-gold/15 bg-cv-bg shadow-2xl md:max-w-[320px]"
                    />
                  </div>

                  <div>
                    <Label>PACK COMPLET — ACCÈS IMMÉDIAT</Label>

                    <h3 className="mt-3 font-serif text-3xl leading-tight text-cv-text md:text-4xl">
                      Votre portrait intégral
                      <br />
                      + le livret de bascule
                    </h3>

                    <div className="mt-4 flex flex-wrap items-baseline gap-3">
                      <p className="text-4xl text-cv-gold">7 €</p>
                      <p className="text-lg text-cv-muted line-through">27 €</p>
                      <p className="text-sm uppercase tracking-[0.16em] text-cv-gold">
                        Prix de lancement
                      </p>
                    </div>

                    <div className="mt-6 space-y-4 text-sm leading-7 text-cv-muted md:text-base">
                      <p>
                        ✓ Votre portrait intégral : le verrou principal,
                        l&apos;héritage invisible, votre rapport à la légitimité
                        et votre direction de bascule.
                      </p>

                      <p>
                        ✓ Le livret « Reprendre les commandes » : 6 exercices
                        concrets et complets pour décompresser et retrouver de
                        l&apos;espace intérieur.
                      </p>

                      <p>
                        ✓ 6 leviers pour relâcher la pression dès ce soir et
                        être prêt.e à faire un premier pas.
                      </p>

                      <p>
                        ✓ Reçu par e-mail en moins de 5 minutes, à relire à
                        votre rythme.
                      </p>
                    </div>
                    <div className="mt-6">
                    <PrimaryButton
    onClick={checkout}
    disabled={checkoutLoading}
    className="w-full"
  >
    {checkoutLoading ? (
      'Ouverture du paiement…'
    ) : (
      <span className="flex flex-col items-center justify-center leading-tight">
        <span>Recevoir mon portrait complet</span>
        <span className="mt-1">7 €</span>
      </span>
    )}
  </PrimaryButton>
</div>
            

                    <div className="mt-5 rounded-[20px] border border-cv-gold/15 bg-cv-bg p-4">
                      <p className="text-sm leading-7 text-cv-muted">
                        « J&apos;ai eu l&apos;impression qu&apos;on me montrait
                        le vrai point de tension, sans détour. »
                      </p>
                      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-cv-gold">
                        — Marianne
                      </p>
                    </div>

                    <p className="mt-4 text-center text-xs leading-6 text-cv-muted">
                      Paiement sécurisé Stripe · Accès immédiat par e-mail ·
                      Livret à garder
                    </p>
                  </div>
                </div>
              </div>

              {error ? (
                <p className="mt-4 text-sm text-red-300">{error}</p>
              ) : null}

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-[24px] border border-cv-gold/15 bg-cv-panelAlt p-5">
                  <p className="text-sm leading-7 text-cv-muted">
                    “Je pensais recevoir quelque chose d’assez général. En
                    réalité, certains passages ont mis des mots très précis sur
                    ce que je vivais sans réussir à le formuler.”
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.18em] text-cv-gold">
                    Claire
                  </p>
                </div>

                <div className="rounded-[24px] border border-cv-gold/15 bg-cv-panelAlt p-5">
                  <p className="text-sm leading-7 text-cv-muted">
                    “Ce n’est pas flatteur, et c’est justement ce que j’ai aimé.
                    J’ai eu l’impression qu’on me montrait le vrai point de
                    tension, sans détour.”
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.18em] text-cv-gold">
                    Marianne
                  </p>
                </div>

                <div className="rounded-[24px] border border-cv-gold/15 bg-cv-panelAlt p-5">
                  <p className="text-sm leading-7 text-cv-muted">
                    “La lecture m’a aidé à comprendre pourquoi je restais bloqué
                    dans certaines décisions. C’était sobre, dense, et beaucoup
                    plus concret que prévu.”
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.18em] text-cv-gold">
                    Thomas
                  </p>
                </div>
              </div>
            </Panel>
          </>
        )}
      </Container>
    </Shell>
  );
}
