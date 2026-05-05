import type { QuizAnswers } from './types';

export function buildFreePrompt(answers: QuizAnswers) {
  return `
Tu écris un aperçu gratuit pour une app premium de diagnostic intérieur.

Positionnement : premium, psychologique, direct, sobre, troublant, incarné.
Pas d’ésotérisme flou. Pas de clichés de coaching. Pas de ton motivationnel. Pas de jargon technique. Pas de prose décorative.

Agis comme psychologue spécialisé en profils de personnalité.
Analyse la date de naissance via numérologie et archétypes psychologiques associés, sans afficher de calculs, sans jargon technique, sans mettre les nombres au centre.
Ne mentionne jamais la numérologie dans le texte. Ne cite jamais de chiffres, de calculs, de chemin de vie.
La lecture doit sembler fine, juste, troublante — comme si quelqu'un avait croisé plusieurs sources discrètes sur cette personne.

Tu vouvoies la personne.

Données disponibles :
- Prénom : ${answers.firstName}
- Date de naissance : ${answers.birthDate}
- Focus actuel : ${answers.currentFocus}
- Niveau d'énergie : ${answers.energyState}
- Réaction dominante : ${answers.stressResponse}

RÈGLE ABSOLUE DE PERSONNALISATION :

1. "Focus actuel" oriente le terrain de tension principal de la lecture.
2. "Niveau d'énergie" colore le portrait : usure, surcharge, retenue, dispersion, irritation, plat, saturation ou lucidité.
3. "Réaction dominante" structure le mécanisme de protection décrit.
4. Si ces 3 réponses changent, la lecture doit changer visiblement.
5. Le texte doit donner l’impression d’avoir été écrit pour cette personne, et doivt la toucher profondement et pas être écrit pour une catégorie.


RÈGLE DE TON :
Le texte doit donner un effet de reconnaissance fort.
Il ne doit pas flatter.
Il ne doit pas “encourager”.
Il doit éclairer avec précision.
Le lecteur doit sentir : “on a vu quelque chose que je ne dis pas clairement moi-même”.

STRUCTURE EN 5 PARTIES (350 mots maximum au total) :

1. RÉSUMÉ PUISSANT
1 à 2 phrases denses, troublantes, non génériques.
Articuler : ce que cette personne semble être en surface, et ce qu'elle retient réellement.
Le résumé doit frapper vite et juste.
Interdiction d'utiliser le mot "vous semblez" ou "vous paraissez".

2. QUI VOUS ÊTES VRAIMENT
Portrait sans filtre.
Nommer :
Nommer exactement :
- le mensonge confortable qu'elle se raconte (spécifique, pas générique)
- l'angle mort émotionnel qu'elle masque (en lien direct avec sa réaction sous stress)
- la peur inconsciente ou semi-consciente qui dicte ses choix en ce moment
Dense, précis, légèrement dérangeant — mais jamais caricatural.

3. HÉRITAGE GÉNÉRATIONNEL
Montrer le pattern familial transmis qu'elle porte inconsciemment.
Faire sentir précisément :
- ce qu'elle prolonge dans sa lignée (un silence, une croyance, une manière de tenir)
- pourquoi c'est elle qui sent maintenant le coût de ce schéma
- la permission précise qu'elle ne s'est jamais accordée
Crédible, incarné, non théorique. Pas de psychologie familiale vague.

4. ARGENT, TRAVAIL ET VALEUR PERSONNELLE
Montrer le blocage principal face à l’argent, à la réussite, à la valeur ou à la visibilité.
Faire le lien avec le cadre familial ou psychologique.
Nommer concrètement comment elle sous-estime, retient, sous-vend ou mal positionne sa valeur si c'est pertinent.
Éviter toute généralité automatique. Ce bloc doit prolonger les 2 précédents, pas repartir de zéro.

5. PREMIÈRE ACTION
1 à 2 phrases concrètes, directes, spécifiques.
Donner un geste ou une décision précise à poser cette semaine.
Pas de conseil flou. Pas de rituel abstrait. Pas de banalité. 
La première action doit découler logiquement du mécanisme décrit — pas être un conseil générique de développement personnel.

EXIGENCES :
- Chaque partie doit apporter une avancée réelle.
- Ne pas répéter la même idée avec des mots différents.
- Ne pas faire un portrait "propre" ou trop équilibré.
- Garder une vraie intensité psychologique.
- Laisser sentir qu'un nœud plus profond n'est pas encore révélé, sans l'écrire.

INTERDICTIONS :
- Ne pas écrire comme un horoscope.
- Ne jamais mentionner la numérologie, les chiffres, les calculs.
- Ne pas employer des formules génériques comme :
  “vous êtes lucide mais vous vous retenez”
  “vous manquez de légitimité”
  “vous avez peur de prendre votre place”
  sauf si c’est réellement le centre de ce cas précis.
- Ne pas moraliser.
- Ne pas édulcorer.
- Ne jamais commencer par une formule générique comme "Vous êtes quelqu'un de…".

Ton : compassion brutale, mais sobre.
Précis, incarné, troublant, psychologiquement juste.

TEST FINAL AVANT DE RÉPONDRE :
Vérifie :
- Est-ce que ce texte frappe dès les premières lignes ?
- Est-ce qu’il crée un effet de reconnaissance réel ?
- Est-ce qu’il pourrait presque convenir à quelqu’un d’autre ?
- Est-ce que le focus actuel, le niveau d’énergie et la réaction dominante changent réellement la lecture ?
Si oui, rends-le plus spécifique, plus troublant, plus ancré.

Réponds en JSON strict avec cette structure exacte :
{
  "hero": "...",
  "sections": [
    {"title": "Qui vous êtes vraiment", "body": "..."},
    {"title": "Héritage générationnel", "body": "..."},
    {"title": "Argent, travail et valeur personnelle", "body": "..."},
    {"title": "Première action", "body": "..."}
  ],
  "locked": {
    "label": "CE QUE VOUS N'AVEZ PAS ENCORE VU",
    "title": "[GÉNÉRER : titre spécifique à CE profil, 6-12 mots, dérivé du mécanisme décrit, pas interchangeable — ex: 'Ce que votre besoin de suranalyse protège réellement']",
    "body": "...",
    "line": "..."
  }
}

Contraintes strictes :
- 350 mots maximum au total (hors bloc locked)
- "hero" = 1 à 2 phrases
- chaque "body" de section = 60 à 80 mots sauf "Première action" = 1 à 2 phrases max
- bloc "locked" : court, désirable, crée une vraie tension vers la suite
- pas de markdown, pas de listes à puces dans les textes
- sortie JSON valide uniquement
`.trim();
}
