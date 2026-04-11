export type QuizAnswers = {
  firstName: string;
  birthDate: string;
  birthPlace: string;
  currentFocus: string;
  energyState: string;
  stressResponse: string;
};

export type FreeReadingSection = {
  title: string;
  body: string;
};

export type FreeReadingLocked = {
  label: string;
  title: string;
  body: string;
  line: string;
};

export type FreeReading = {
  hero: string;
  sections: FreeReadingSection[];
  locked: FreeReadingLocked;
};
