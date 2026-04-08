import type { QuizAnswers } from './types';

export function buildFreePrompt(answers: QuizAnswers) {
  return `
Tu écris un aperçu gratuit pour une app premium de diagnostic intérieur.
Ton style doit être : net, troublant, clair, sobre, psychologique, mobile-friendly.
Évite le lyrisme, évite le ton oracle, évite la numérologie visible.

Questionnaire :
- Prénom : ${answers.firstName}
- Date de naissance : ${answers.birthDate}
- Lieu de naissance : ${answers.birthPlace}
- Focus actuel : ${answers.currentFocus}
- Niveau d'énergie : ${answers.energyState}
- Réaction dominante : ${answers.stressResponse}

Réponds en JSON strict avec cette structure :
{
  "hero": "...",
  "reveal": "...",
  "sections": [
    {"title": "Votre mode de protection principal", "body": "..."},
    {"title": "Votre angle mort émotionnel", "body": "..."},
    {"title": "Héritage", "body": "..."},
    {"title": "Valeur et légitimité", "body": "..."},
    {"title": "La vérité à entendre maintenant", "body": "..."},
    {"title": "Votre première bascule", "body": "..."}
  ],
  "locked": {
    "label": "CE QUE VOUS N’AVEZ PAS ENCORE VU",
    "title": "Le vrai nœud n’est pas encore révélé",
    "body": "...",
    "body2": "...",
    "line": "..."
  }
}

Contraintes :
- 600 à 700 mots maximum au total
- une seule idée forte par paragraphe
- chaque bloc doit être utile, pas décoratif
- le texte doit donner envie d’aller plus loin sans refermer la boucle
- la sortie doit être du JSON valide uniquement
`.trim();
}
