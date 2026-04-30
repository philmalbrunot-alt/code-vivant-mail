'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BRAND, ENERGY_OPTIONS, FOCUS_OPTIONS, STRESS_OPTIONS } from '@/lib/constants';
import type { QuizAnswers } from '@/lib/types';
import { FREE_STORAGE_KEY } from '@/lib/storage';
import {
  BadgeRow,
  BrandHeader,
  Container,
  Label,
  Panel,
  PrimaryButton,
  ProgressBar,
  SecondaryButton,
  Shell,
} from './ui';

const initialAnswers: QuizAnswers = {
  firstName: '',
  birthDate: '',
  birthPlace: '',
  currentFocus: '',
  energyState: '',
  stressResponse: '',
};

const steps = [
  { key: 'firstName', title: 'Votre prénom', type: 'text', placeholder: 'Ex. Martin' },
  { key: 'birthDate', title: 'Votre date de naissance', type: 'text', placeholder: 'JJ/MM/AAAA' },
  { key: 'birthPlace', title: 'Votre lieu de naissance', type: 'text', placeholder: 'Ex. Aix-les-Bains' },
  { key: 'currentFocus', title: 'Qu’est-ce qui vous amène ici ?', type: 'choice', options: FOCUS_OPTIONS },
  { key: 'energyState', title: 'En ce moment, votre niveau d’énergie ressemble à…', type: 'choice', options: ENERGY_OPTIONS },
  { key: 'stressResponse', title: 'Quand ça ne va pas, vous faites quoi le plus souvent ?', type: 'choice', options: STRESS_OPTIONS },
] as const;

function formatBirthDate(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  const parts: string[] = [];

  if (digits.length > 0) parts.push(digits.slice(0, 2));
  if (digits.length > 2) parts.push(digits.slice(2, 4));
  if (digits.length > 4) parts.push(digits.slice(4, 8));

  return parts.join('/');
}

function isValidBirthDate(value: string) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;

  const [dayStr, monthStr, yearStr] = value.split('/');
  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);

  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) return false;
  if (year < 1900 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;

  const lastDayOfMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > lastDayOfMonth) return false;

  return true;
}

export function HomeClient() {
  const router = useRouter();
  const actionsRef = useRef<HTMLDivElement | null>(null);

  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const step = steps[index];
  const progress = ((index + 1) / steps.length) * 100;
  const value = answers[step.key];

  const canContinue =
    step.key === 'birthDate'
      ? isValidBirthDate(String(value))
      : typeof value === 'string' && value.trim().length > 0;

  function updateValue(v: string) {
    if (step.key === 'birthDate') {
      const formatted = formatBirthDate(v);
      setAnswers((prev) => ({ ...prev, birthDate: formatted }));
      return;
    }

    setAnswers((prev) => ({ ...prev, [step.key]: v }));
  }

  function selectChoice(option: string) {
    updateValue(option);

    window.setTimeout(() => {
      actionsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 120);
  }

  async function submit() {
    try {
      setIsSubmitting(true);
      setError(null);

      const res = await fetch('/api/analyze/free', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(answers),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Impossible de générer le portrait.');

      localStorage.setItem(
        FREE_STORAGE_KEY,
        JSON.stringify({
          answers,
          reading: data.reading,
        })
      );

      router.push('/resultat');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Impossible de générer le portrait.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function next() {
    if (!canContinue) return;

    if (index === steps.length - 1) {
      void submit();
      return;
    }

    setIndex((prev) => prev + 1);
  }

  const showBirthDateHint =
    step.key === 'birthDate' && value.length > 0 && !isValidBirthDate(String(value));

  return (
    <Shell>
      <Container>
        <BrandHeader />

        {!started ? (
          <Panel className="py-12 md:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <Label>{BRAND.label}</Label>

              <h1 className="mt-4 font-serif text-4xl leading-tight text-cv-text md:text-7xl">
                {BRAND.title}
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-cv-text/90 md:text-2xl">
                {BRAND.subtitle}
              </p>

              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-cv-muted md:text-base">
                {BRAND.body}
              </p>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-cv-muted md:text-base">
                {BRAND.method}
              </p>

              <BadgeRow items={BRAND.badges} />

              <div className="mt-10 flex justify-center">
                <PrimaryButton onClick={() => setStarted(true)}>
                  Voir mon portrait
                </PrimaryButton>
              </div>
            </div>
          </Panel>
        ) : (
          <Panel className="mt-8">
            <ProgressBar value={progress} />

            <div className="mx-auto max-w-3xl">
              <h2 className="text-center font-serif text-[2.05rem] leading-tight text-cv-text md:text-[2.75rem]">
                {step.title}
              </h2>

              <div className="mt-8">
                {step.type === 'text' ? (
                  <>
                    <input
                      value={value}
                      onChange={(e) => updateValue(e.target.value)}
                      placeholder={step.placeholder}
                      inputMode={step.key === 'birthDate' ? 'numeric' : 'text'}
                      maxLength={step.key === 'birthDate' ? 10 : undefined}
                      className="w-full rounded-2xl border border-cv-line bg-cv-panelAlt px-5 py-4 text-base text-cv-text outline-none placeholder:text-cv-faint"
                    />

                    {showBirthDateHint ? (
                      <p className="mt-3 text-sm text-cv-faint">
                        Format attendu : JJ/MM/AAAA
                      </p>
                    ) : null}
                  </>
                ) : (
                  <div className="space-y-3">
                    {step.options.map((option) => {
                      const selected = value === option;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => selectChoice(option)}
                          className={`w-full rounded-2xl border px-5 py-4 text-left text-sm leading-7 transition ${
                            selected
                              ? 'border-cv-gold/30 bg-cv-gold/10 text-cv-text'
                              : 'border-cv-line bg-cv-panelAlt text-cv-muted hover:border-cv-gold/15'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}

              <div
                ref={actionsRef}
                className="mt-8 flex items-center justify-between gap-4 scroll-mt-8"
              >
                <SecondaryButton
                  onClick={() => setIndex((prev) => (prev === 0 ? 0 : prev - 1))}
                >
                  Retour
                </SecondaryButton>

                <PrimaryButton onClick={next} disabled={!canContinue || isSubmitting}>
                  {index === steps.length - 1 ? (
                    isSubmitting ? (
                      <span className="inline-flex items-center gap-1">
                        Préparation
                        <span className="animate-pulse">.</span>
                        <span className="animate-pulse delay-150">.</span>
                        <span className="animate-pulse delay-300">.</span>
                      </span>
                    ) : (
                      'Voir mon portrait'
                    )
                  ) : (
                    'Continuer'
                  )}
                </PrimaryButton>
              </div>
            </div>
          </Panel>
        )}
      </Container>
    </Shell>
  );
}
