export type QuizAnswers = {
  firstName: string;
  birthDate: string; // JJ/MM/AAAA
  birthPlace: string;
  currentFocus: string;
  energyState: string;
  stressResponse: string;
};

export type FreeSection = {
  title: string;
  body: string;
};

export type FreeReading = {
  hero: string;
  reveal: string;
  sections: FreeSection[];
  locked: {
    label: string;
    title: string;
    body: string;
    body2: string;
    line: string;
  };
};
