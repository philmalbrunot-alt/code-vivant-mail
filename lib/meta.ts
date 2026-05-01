export function trackMetaEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined') return;
  if (!window.fbq) return;

  window.fbq('track', eventName, params);
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
