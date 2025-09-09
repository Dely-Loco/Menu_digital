// src/context/LanguageContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipos de idiomas soportados
type Locale = 'es' | 'en' | 'fr' | 'pt';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traducciones básicas (puedes expandir esto o cargar desde archivos JSON)
const translations = {
  es: {
    'nav.home': 'Inicio',
    'nav.menu': 'Menú',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'welcome': 'Bienvenido a Houzze Tec',
    'loading': 'Cargando...',
  },
  en: {
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'welcome': 'Welcome to Houzze Tec',
    'loading': 'Loading...',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.menu': 'Menu',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'welcome': 'Bienvenue chez Houzze Tec',
    'loading': 'Chargement...',
  },
  pt: {
    'nav.home': 'Início',
    'nav.menu': 'Menu',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato',
    'welcome': 'Bem-vindo ao Houzze Tec',
    'loading': 'Carregando...',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>('es');

  useEffect(() => {
    // Cargar idioma guardado al iniciar
    const savedLocale = localStorage.getItem('selectedLanguage') as Locale;
    if (savedLocale && ['es', 'en', 'fr', 'pt'].includes(savedLocale)) {
      setLocaleState(savedLocale);
    }

    // Escuchar cambios de idioma desde el LanguageSelector
    const handleLanguageChange = (event: CustomEvent) => {
      const newLocale = event.detail.locale as Locale;
      setLocaleState(newLocale);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('selectedLanguage', newLocale);
    
    // Disparar evento para que el LanguageSelector se actualice
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { locale: newLocale } 
    }));
  };

  // Función de traducción
  const t = (key: string): string => {
    return translations[locale][key as keyof typeof translations[typeof locale]] || key;
  };

  const value = {
    locale,
    setLocale,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}