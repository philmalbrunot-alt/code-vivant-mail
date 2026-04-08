import Stripe from 'stripe';

let stripeSingleton: Stripe | null = null;

export function getStripe() {
  if (!stripeSingleton) {
    stripeSingleton = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2025-02-24.acacia',
    });
  }
  return stripeSingleton;
}
