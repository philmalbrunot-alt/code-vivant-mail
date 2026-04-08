import { NextResponse } from 'next/server';

type QuizAnswers = {
  firstName: string;
  birthDate: string;
  birthPlace: string;
  currentFocus: string;
  energyState: string;
  stressResponse: string;
};

function fallbackFreeReading(a: QuizAnswers) {
  const focusMap: Record<string, string> = {
    'Je me sens bloqué(e), comme si je tournais en rond':
      "Quelque chose en vous sait qu’un ancien mode de fonctionnement ne suffit plus, mais vous essayez encore de le faire tenir.",
    'Je traverse une période de changement ou de doute':
      "Vous êtes entre deux états de vous-même. Ce n’est pas seulement du doute. C’est une mue incomplète.",
    'Je veux mieux me comprendre, en profondeur':
      "Vous ne cherchez pas un conseil rapide. Vous cherchez une lecture plus juste de ce qui vous structure réellement.",
    'Mes relations m’épuisent ou me questionnent':
      "Le lien à l’autre semble toucher un point sensible chez vous : la place, la reconnaissance, ou la peur de trop montrer.",
    'Simple curiosité, je veux voir ce que ça donne':
      "Votre curiosité n’est probablement pas neutre. Une part de vous veut vérifier quelque chose qu’elle sent déjà.",
  };

  const energyMap: Record<string, string> = {
    'Épuisé(e), même le repos ne suffit plus':
      "Votre énergie semble moins manquer de repos que de cohérence intérieure.",
    'Des hauts et des bas, je ne sais jamais comment je vais me réveiller':
      "Votre système alterne entre poussée d’élan et repli, comme s’il hésitait entre ouverture et protection.",
    'Sous tension, je tiens, mais je sens que ça tire':
      "Vous tenez, mais au prix d’une mobilisation intérieure excessive.",
    'Plat, pas de fatigue extrême, mais pas d’élan non plus':
      "Ce n’est pas l’effondrement. C’est un ralentissement plus discret, souvent lié à un élan retenu.",
    'Plutôt bien, mais quelque chose manque quand même':
      "Même quand tout semble acceptable, une part de vous sent qu’elle ne vit pas encore depuis son point juste.",
  };

  const stressMap: Record<string, string> = {
    'Je me replie et je disparais un peu':
      "Votre protection dominante semble être le retrait.",
    'Je suranalyse tout':
      "Votre protection dominante semble être la suranalyse.",
    'Je m’occupe des autres pour éviter de me regarder':
      "Votre protection dominante semble être le déplacement vers l’autre.",
    'Je deviens irritable ou sec':
      "Votre protection dominante semble être la dureté défensive.",
    'Je fais comme si tout allait bien':
      "Votre protection dominante semble être le masque de maîtrise.",
  };

  return {
    hero: `${a.firstName}, ce que vous montrez et ce que vous retenez ne semblent pas entièrement alignés.`,
    reveal:
      focusMap[a.currentFocus] ||
      "Vous êtes probablement à un endroit où quelque chose demande à être vu plus franchement.",
    sections: [
      {
        title: 'Votre mode de protection principal',
        body:
          (stressMap[a.stressResponse] || "Votre protection dominante semble être une forme de contrôle ou de retenue.") +
          " Ce mécanisme a probablement eu une utilité, mais il commence aussi à vous freiner.",
      },
      {
        title: 'Votre angle mort émotionnel',
        body:
          "Votre angle mort n’est pas forcément la faiblesse. Il est plus probablement dans ce que vous minimisez en vous pour rester lisible, solide ou acceptable.",
      },
      {
        title: 'Héritage',
        body:
          "Il est plausible que vous portiez une loyauté invisible autour du fait de ne pas déranger, de tenir, ou de rester mesuré même quand quelque chose en vous voudrait plus de place.",
      },
      {
        title: 'Valeur et légitimité',
        body:
          "Le point sensible ne semble pas être seulement la confiance. Il touche aussi à l’autorisation intérieure : prendre place, demander, montrer davantage, sans devoir d’abord prouver votre valeur.",
      },
      {
        title: 'La vérité à entendre maintenant',
        body:
          "Comprendre plus ne suffira peut-être pas. Le mouvement commencera quand quelque chose de plus direct deviendra visible dans le réel.",
      },
      {
        title: 'Votre première bascule',
        body:
          (energyMap[a.energyState] || "Votre énergie actuelle donne un signal utile.") +
          " Une première bascule simple serait de rendre plus nette une demande, une limite, un choix ou une vérité que vous amortissez encore.",
      },
    ],
    locked: {
      label: "CE QUE VOUS N’AVEZ PAS ENCORE VU",
      title: "Le vrai nœud n’est pas encore révélé",
      body:
        "Le verrou principal n’est probablement pas celui que vous montrez. Il est plus discret, plus ancien, et plus lié à votre droit d’exister sans vous retenir.",
      body2:
        "Tant que ce point reste flou, vous avancez par correction plus que par élan.",
      line:
        "La lecture complète révèle le verrou principal, la peur racine, le rapport à la légitimité, l’élan retenu et la direction de bascule la plus juste.",
    },
  };
}

export async function POST(req: Request) {
  try {
    const answers = (await req.json()) as QuizAnswers;

    const model = process.env.OPENAI_FREE_MODEL || 'gpt-5.4-mini';
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(fallbackFreeReading(answers));
    }

    const prompt = `
Tu rédiges un aperçu gratuit premium, clair, direct, mobile-friendly, en français.
Pas de jargon. Pas de lyrisme excessif. Pas de phrases trop longues.
Structure de sortie STRICTEMENT en JSON avec les clés:
hero, reveal, sections, locked

sections = tableau de 6 objets { title, body }
locked = { label, title, body, body2, line }

Données:
Prénom: ${answers.firstName}
Date: ${answers.birthDate}
Lieu: ${answers.birthPlace}
Focus: ${answers.currentFocus}
Énergie: ${answers.energyState}
Réaction: ${answers.stressResponse}
`;

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.8,
        messages: [
          { role: 'system', content: 'Tu es un rédacteur psychologique précis et premium.' },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error('OpenAI free error:', txt);
      return NextResponse.json(fallbackFreeReading(answers));
    }

    const data = await r.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(fallbackFreeReading(answers));
    }

    try {
      return NextResponse.json(JSON.parse(content));
    } catch {
      return NextResponse.json(fallbackFreeReading(answers));
    }
  } catch (error) {
    console.error('analyze/free route error:', error);
    return NextResponse.json(
      {
        error: 'Impossible de générer l’aperçu gratuit.',
      },
      { status: 400 }
    );
  }
}
