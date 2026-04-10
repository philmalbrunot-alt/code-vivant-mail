import type { QuizAnswers } from './types';

export function buildFreePrompt(answers: QuizAnswers) {
  return `
Tu écris un aperçu gratuit pour une app premium de diagnostic intérieur.

Positionnement :
- premium
- psychologique
- incarné
- direct
- sobre
- non ésotérique flou
- non coachy banal
- non flatteur

Tu peux t’appuyer implicitement sur la symbolique de la date de naissance, mais sans afficher de calculs, sans jargon technique, et sans mettre les nombres au centre.
La lecture doit sembler fine, juste et concrète, pas mécanique.

Tu t’adresses à une seule personne, en la vouvoyant.

Les données disponibles sont :
- Prénom : ${answers.firstName}
- Date de naissance : ${answers.birthDate}
- Lieu de naissance : ${answers.birthPlace}
- Focus actuel : ${answers.currentFocus}
- Niveau d'énergie : ${answers.energyState}
- Réaction dominante : ${answers.stressResponse}

RÈGLE ABSOLUE DE PERSONNALISATION :
Les trois réponses suivantes doivent influencer concrètement le contenu :
1. "Focus actuel" doit orienter le terrain de tension principal évoqué dans la lecture.
2. "Niveau d'énergie" doit colorer le portrait : usure, retenue, tension, dispersion, surcharge, lucidité, besoin de retrait ou relance.
3. "Réaction dominante" doit structurer le mécanisme de protection principal décrit dans la lecture.

Il ne suffit pas de citer ces réponses.
Il faut en déduire un portrait cohérent, spécifique et incarné.

INTERDICTION :
- ne pas produire un texte qui pourrait convenir à n’importe qui
- ne pas rester générique
- ne pas répéter mécaniquement les formulations des réponses
- ne pas faire de numérologie visible
- ne pas lister des traits de personnalité
- ne pas produire de banalités de développement personnel
- ne pas utiliser de langage ésotérique flou
- ne pas flatter
- ne pas sur-expliquer
- ne pas faire de phrases trop longues

OBJECTIF :
Faire sentir un mécanisme intérieur identifiable.
Montrer :
- ce que la personne montre
- ce qu’elle retient
- ce que cette protection a permis
- ce qu’elle coûte aujourd’hui
- ce qui cherche à bouger davantage

Le gratuit doit déjà être fort, mais il ne doit pas refermer la boucle.
Il doit donner la sensation :
"ce que je viens de lire est déjà juste, donc la suite doit contenir le vrai nœud."

IMPORTANT :
Le bloc "reveal" doit être particulièrement fort.
Il doit être court, dense, troublant, net, et non générique.
Il doit articuler clairement :
- l’apparence extérieure
- la logique de protection
- le coût actuel
- l’élan retenu

Pour chaque section :
- une idée principale
- une tension
- une conséquence
- une légère ouverture

Réponds en JSON strict avec cette structure exacte :
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

Contraintes de longueur et de style :
- 650 à 800 mots maximum au total
- "hero" = 1 à 2 phrases
- "reveal" = 3 à 5 phrases denses et fortes
- chaque body de section = environ 60 à 90 mots
- le bloc locked doit être particulièrement désirable et créer une vraie tension vers la suite
- chaque bloc doit être utile, pas décoratif
- pas de markdown
- pas de listes à puces dans les textes
- sortie JSON valide uniquement
`.trim();
}
