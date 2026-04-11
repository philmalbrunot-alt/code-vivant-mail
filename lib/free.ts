import type { FreeReading, QuizAnswers } from './types';

function inferMode(answers: QuizAnswers) {
  if (answers.stressResponse.includes('tout allait bien')) return 'masquer la tension derrière la tenue';
  if (answers.stressResponse.includes('suranalyse')) return 'tenir le réel à distance par l’analyse';
  if (answers.stressResponse.includes('disparais')) return 'se retirer avant d’être trop exposé';
  if (answers.stressResponse.includes('autres')) return 'se rendre utile pour éviter le point sensible';
  return 'raidir le lien quand la tension monte';
}

export function buildFallbackFree(answers: QuizAnswers): FreeReading {
  const mode = inferMode(answers);
  return {
    hero: `${answers.firstName}, vous ne manquez pas de lucidité. Vous retenez encore quelque chose de plus central que vous ne le croyez.`,
    reveal:
      'Votre portrait montre moins un manque de compréhension qu’un mécanisme de protection devenu familier. Il vous a servi. Il vous freine aussi.',
    sections: [
      {
        title: 'Votre mode de protection principal',
        body: `Votre réflexe dominant semble être de ${mode}. Ce mécanisme vous donne une impression de tenue, de maîtrise ou de sécurité, mais il vous coûte en spontanéité, en parole nette et en mouvement réel.`,
      },
      {
        title: 'Votre angle mort émotionnel',
        body: 'Vous risquez de croire que vous êtes simplement prudent alors qu’une part de vous évite surtout le prix émotionnel d’une vérité plus visible. Ce décalage entretient la fatigue et retarde les décisions justes.',
      },
      {
        title: 'Héritage',
        body: 'Il est probable que vous portiez une vieille logique intérieure. Rester lisible, contenir, ne pas déranger, ou préserver le lien avant de préserver votre propre élan. Ce n’est pas forcément spectaculaire. C’est souvent atmosphérique.',
      },
      {
        title: 'Valeur et légitimité',
        body: 'Votre rapport à la place et à la valeur semble moins bloqué par la capacité que par l’autorisation intérieure. Tant que vous attendez de vous sentir totalement légitime, vous restez en dessous de votre propre seuil.',
      },
      {
        title: 'La vérité à entendre maintenant',
        body: 'Vous n’avez probablement pas besoin de vous comprendre davantage avant d’agir. Vous avez surtout besoin de devenir plus lisible dans le réel. Une demande, une limite, une décision, une parole simple.',
      },
      {
        title: 'Votre première bascule',
        body: 'Dans les prochains jours, choisissez un endroit où vous cessez d’arrondir. Pas pour être brutal. Pour être net. C’est souvent là que la suite commence.',
      },
    ],
    locked: {
  label: 'CE QUE VOUS N’AVEZ PAS ENCORE VU',
  title: 'Le vrai nœud n’est pas encore révélé',
  body:
    'Le verrou principal n’est pas celui que vous montrez. Il est plus discret et plus ancien. Il touche à votre droit d’exister sans surcontrôle, sans compensation, sans devoir mériter votre place en vous retenant. Tant que ce point reste invisible, vous avancerez par correction plus que par élan. La suite va là où votre tension prend sa source… et là où elle peut enfin commencer à céder.',
  line:
    'La lecture complète révèle le verrou principal, la peur racine, le rapport à la légitimité, l’élan retenu et la direction de bascule la plus juste.',
},
  };
}
