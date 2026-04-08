# Code Vivant - front gratuit + Stripe

## Ce que fait cette app
- Landing + questionnaire
- Génération du gratuit via OpenAI
- Page résultat gratuite
- Stripe Checkout à 7 €
- Page merci après paiement

## Ce que l'app ne fait pas
- Elle n'envoie pas le premium par email elle-même
- Le premium doit être généré et envoyé par Make + Brevo après l'événement Stripe

## Variables Vercel
- OPENAI_API_KEY
- OPENAI_FREE_MODEL=gpt-5.4-mini
- STRIPE_SECRET_KEY
- STRIPE_PRICE_ID_PROFILE
- APP_BASE_URL=https://votre-projet.vercel.app
- APP_SIGNING_SECRET=une-cle-longue-et-secrete

## Make
Utilisez l'événement Stripe `checkout.session.completed`.
Récupérez dans `metadata` : fn, bd, bp, cf, es, sr, sig.
Appelez OpenAI pour générer le premium, puis Brevo pour l'envoyer.
