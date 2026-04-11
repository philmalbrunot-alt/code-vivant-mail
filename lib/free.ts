import type { FreeReading, QuizAnswers } from './types';

function inferSurface(answers: QuizAnswers) {
  if (answers.energyState.includes('à plat')) {
    return 'Vous donnez souvent l’image de quelqu’un qui tient encore, alors qu’une partie de vous fonctionne déjà en économie intérieure.';
  }

  if (answers.energyState.includes('sous pression')) {
    return 'Vous donnez l’image de quelqu’un de fiable et lucide, mais cette tenue repose sur une tension plus constante que vous ne le montrez.';
  }

  if (answers.energyState.includes('dispers')) {
    return 'Vous pouvez paraître ouvert, mobile, adaptable, alors qu’en profondeur quelque chose évite encore de se fixer franchement.';
  }

  if (answers.energyState.includes('retenue')) {
    return 'Vous donnez facilement l’image de quelqu’un de stable et contenu, mais cette retenue protège plus qu’elle n’apaise.';
  }

  return 'Vous donnez l’image de quelqu’un de posé et lisible, alors qu’en profondeur une tension ancienne continue de cadrer vos choix.';
}

function inferProtection(answers: QuizAnswers) {
  if (answers.stressResponse.includes('tout allait bien')) {
    return 'Votre mécanisme de protection consiste à lisser la tension pour rester tenable aux yeux des autres. Le mensonge confortable, c’est de croire que tant que vous gardez une forme simple et calme, le vrai problème n’existe pas vraiment. Votre angle mort, c’est le prix émotionnel de cette maîtrise. Ce que vous redoutez au fond, ce n’est pas seulement le conflit, c’est d’être vu dans une zone de besoin ou de fragilité que vous avez appris à neutraliser.';
  }

  if (answers.stressResponse.includes('suranalyse')) {
    return 'Votre réflexe consiste à transformer l’intensité en compréhension pour ne pas être débordé. Le mensonge confortable, c’est de croire qu’en pensant juste, vous finirez par vous sentir prêt. Votre angle mort, c’est que l’analyse vous protège aussi de l’exposition réelle. La peur inconsciente derrière cela, c’est d’engager quelque chose qui vous rendrait visible sans possibilité de retrait propre.';
  }

  if (answers.stressResponse.includes('disparais')) {
    return 'Votre protection passe par le retrait avant que la tension ne devienne trop directe. Le mensonge confortable, c’est de vous raconter que vous prenez juste du recul, alors qu’une part de vous se soustrait surtout à l’impact relationnel. Votre angle mort, c’est l’habitude de disparaître avant même de vérifier ce qui pourrait être dit ou tenu. La peur inconsciente, c’est d’être exposé sans pouvoir contrôler ce que cela ouvre.';
  }

  if (answers.stressResponse.includes('autres')) {
    return 'Votre protection consiste à déplacer l’attention vers l’autre, vers l’utile, vers ce qu’il faut faire. Le mensonge confortable, c’est de croire que vous êtes simplement généreux ou disponible. Votre angle mort, c’est que cette utilité vous évite souvent le point plus brut : votre propre manque, votre propre attente, votre propre colère parfois. La peur inconsciente, c’est qu’en cessant de soutenir, vous perdiez votre place.';
  }

  return 'Quand la tension monte, vous avez tendance à vous raidir intérieurement pour garder le lien sous contrôle. Le mensonge confortable, c’est de croire que cette tenue vous protège vraiment. Votre angle mort, c’est qu’elle vous éloigne aussi de ce que vous ressentez avec netteté. La peur inconsciente derrière ce réflexe, c’est qu’en relâchant le contrôle, quelque chose de plus ancien déborde ou dérange.';
}

function inferLineage(answers: QuizAnswers) {
  if (answers.currentFocus.includes('travail') || answers.currentFocus.includes('argent')) {
    return 'Dans votre histoire, on sent une transmission où la valeur personnelle s’est probablement confondue avec la tenue, l’effort ou l’utilité. Vous portez moins une fragilité individuelle qu’un vieux programme familial : mériter sa place en restant fiable, en prenant peu de place, en retardant le désir. Si ce point pèse autant chez vous, c’est souvent parce que c’est vous qui commencez à voir ce que la lignée a normalisé. La croyance à quitter est simple : il faudrait d’abord prouver avant de recevoir. La permission à vous donner est plus dérangeante : avoir de la valeur sans vous durcir.';
  }

  if (answers.currentFocus.includes('relation') || answers.currentFocus.includes('couple')) {
    return 'Vous semblez porter un héritage où le lien a peut-être compté davantage que la vérité intérieure. Dans certaines lignées, on apprend très tôt à préserver l’équilibre, à absorber, à éviter ce qui dérange. Chez vous, cela ressemble à un rôle ancien : tenir sans trop demander. Si cette tension se rejoue aujourd’hui, c’est souvent parce que vous êtes celui qui commence à ne plus vouloir payer le prix silencieux de la paix apparente. La croyance héritée à abandonner est celle-ci : dire ce qui est vrai met le lien en danger. La permission oubliée : être clair sans vous sentir coupable.';
  }

  return 'Il y a dans votre portrait la trace d’un héritage plus discret que spectaculaire : une valorisation de la retenue, du devoir, de l’adaptation ou du contrôle émotionnel. Vous portez probablement un rôle ancien dans votre système : celui qui contient, qui évite de peser, qui garde une forme de tenue. Si cela devient visible aujourd’hui, c’est souvent parce que c’est vous qui touchez la limite de ce modèle. La croyance héritée à abandonner est qu’il faudrait encaisser sans déranger. La permission que vous ne vous êtes pas vraiment donnée est de vivre plus directement, sans confondre dignité et effacement.';
}

function inferValue(answers: QuizAnswers) {
  if (answers.currentFocus.includes('travail') || answers.currentFocus.includes('argent')) {
    return 'Votre blocage principal face à l’argent ou à la reconnaissance ne semble pas venir d’un manque de capacité, mais d’une fidélité intérieure à une ancienne mesure de la valeur. Vous sous-évaluez facilement ce que vous faites quand cela vous paraît naturel, solide ou évident. Or ce sont souvent justement vos vrais talents : clarifier, tenir, voir juste, absorber peu de bruit pour aller à l’essentiel. La première croyance à déconstruire est que ce qui est profondément à vous devrait presque aller de soi, donc valoir moins.';
  }

  return 'Votre rapport à la valeur personnelle semble freiné moins par vos capacités que par une autorisation intérieure incomplète. Vous pouvez facilement minimiser ce que vous apportez, surtout quand cela ne fait pas de bruit ou ne ressemble pas à une démonstration visible. Pourtant, vos talents négligés sont souvent dans la finesse : stabilité, lecture juste, fiabilité, qualité de présence ou discernement. Le blocage principal est souvent familial : recevoir plus, prendre plus de place ou demander plus peut encore ressembler à une forme d’excès. La première croyance à déconstruire est que la retenue garantit la justesse.';
}

function inferAction(answers: QuizAnswers) {
  if (answers.currentFocus.includes('travail') || answers.currentFocus.includes('argent')) {
    return 'Cette semaine, nommez clairement ce que vaut une chose que vous faites trop facilement pour la reconnaître. Puis posez un acte concret qui la rend visible : une demande, un tarif, une proposition, ou une parole plus nette.';
  }

  if (answers.currentFocus.includes('relation') || answers.currentFocus.includes('couple')) {
    return 'Cette semaine, cessez d’arrondir un point précis dans une relation importante. Dites une vérité simple, sans vous justifier longuement, là où vous avez l’habitude de préserver le lien en vous taisant.';
  }

  return 'Cette semaine, repérez un endroit précis où vous continuez à vous contenir pour rester lisible ou acceptable. Puis remplacez ce réflexe par un geste net : une limite, une demande, une décision ou une parole tenue jusqu’au bout.';
}

export function buildFallbackFree(answers: QuizAnswers): FreeReading {
  return {
    hero: `${answers.firstName}, ${inferSurface(answers)}`,

    sections: [
      {
        title: 'Qui vous êtes vraiment',
        body: inferProtection(answers),
      },
      {
        title: 'Héritage générationnel',
        body: inferLineage(answers),
      },
      {
        title: 'Argent, travail et valeur personnelle',
        body: inferValue(answers),
      },
      {
        title: 'Première action',
        body: inferAction(answers),
      },
    ],

    locked: {
      label: 'CE QUE VOUS N’AVEZ PAS ENCORE VU',
      title: 'Le vrai nœud n’est pas encore révélé',
      body: 'Le verrou principal n’est pas celui que vous montrez. Il est plus discret, plus ancien, et plus structurant. Tant qu’il reste invisible, vous risquez d’avancer par adaptation plus que par bascule réelle.',
      line: 'La lecture complète révèle le verrou principal, la peur racine, le rapport à la légitimité, l’élan retenu et la direction de bascule la plus juste.',
    },
  };
}
