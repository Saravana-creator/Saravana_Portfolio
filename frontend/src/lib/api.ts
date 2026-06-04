import type { ContactForm } from '@/types';

// Contact form now uses EmailJS — no backend required.
// trackPageView is kept as a no-op placeholder.

export const trackPageView = (_page: string): void => {
  // Implement analytics tracking here if needed (e.g. Plausible, Umami, GA4)
};

export type { ContactForm };
