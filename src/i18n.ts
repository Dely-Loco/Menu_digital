// src/i18n.ts
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Lista de idiomas soportados
export const locales = ['es', 'en', 'fr', 'pt'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Si no hay locale o no está soportado → 404
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale: locale as string, // 👈 garantizamos que sea string
    messages: (await import(`./locales/${locale}.json`)).default
  };
});
