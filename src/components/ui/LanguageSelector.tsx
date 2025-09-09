// src/components/ui/LanguageSelector.tsx
"use client";

import { useState, useEffect } from 'react';
import { Globe, ChevronDown, Languages } from 'lucide-react';

const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸', shortName: 'ES' },
  { code: 'en', name: 'English', flag: '🇺🇸', shortName: 'EN' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', shortName: 'FR' },
  { code: 'pt', name: 'Português', flag: '🇧🇷', shortName: 'PT' },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentLocale, setCurrentLocale] = useState('es'); // Estado local para el idioma

  // Detectar y manejar el idioma actual
  useEffect(() => {
    // Obtener idioma guardado en localStorage o usar español por defecto
    const savedLocale = localStorage.getItem('selectedLanguage') || 'es';
    setCurrentLocale(savedLocale);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    setIsOpen(false);
    setCurrentLocale(newLocale);
    
    // Guardar la selección en localStorage
    localStorage.setItem('selectedLanguage', newLocale);
    
    // Aquí puedes agregar lógica para cambiar el contenido
    // Por ejemplo, disparar un evento personalizado
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { locale: newLocale } 
    }));
    
    // Opcional: recargar la página para aplicar el cambio
    // window.location.reload();
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLocale) || languages[0];
  };

  if (!isVisible) return null;

  const currentLang = getCurrentLanguage();

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div className="relative">
        {/* Dropdown */}
        {isOpen && (
          <div className="absolute bottom-full left-0 mb-3 animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 min-w-[240px] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-3">
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  <h3 className="font-semibold text-sm">Cambiar idioma</h3>
                </div>
              </div>

              {/* Lista de idiomas */}
              <div className="py-2">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 flex items-center gap-3 group cursor-pointer ${
                      currentLocale === language.code
                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 border-r-4 border-indigo-500'
                        : 'text-gray-700 hover:text-indigo-600'
                    }`}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {language.flag}
                    </span>
                    <div className="flex-1">
                      <span className="font-medium block">
                        {language.name}
                      </span>
                      <span className="text-xs text-gray-500">{language.shortName}</span>
                    </div>
                    {currentLocale === language.code && (
                      <span className="text-indigo-500 text-sm font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <div className="text-xs text-gray-600 text-center">
                  <p className="font-medium">Idioma actual: {currentLang.name}</p>
                  <p className="text-gray-500 mt-1">Traducciones profesionales</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botón principal */}
        <div className="relative group">
          {/* Anillos de animación */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 animate-pulse opacity-30"></div>

          {/* Botón */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-full shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 ease-out transform hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-indigo-400/50 group overflow-hidden cursor-pointer"
            aria-label="Cambiar idioma"
          >
            {/* Efecto de brillo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Partículas decorativas */}
            <div className="absolute inset-0">
              <div className="absolute top-2 right-3 w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
              <div className="absolute bottom-3 left-2 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-300"></div>
              <div className="absolute top-4 left-3 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse delay-700"></div>
            </div>

            {/* Contenido principal */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-sm mb-1 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-xs font-bold text-white/90 tracking-wide">
                  {currentLang.shortName}
                </span>
              </div>
            </div>

            {/* Indicador de dropdown */}
            <ChevronDown
              className={`absolute top-1 right-1 w-3 h-3 text-white/80 transition-all duration-200 ${
                isOpen ? 'rotate-180 scale-110' : ''
              }`}
            />

            {/* Badge */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </button>

          {/* Tooltip */}
          <div
            className={`
            absolute right-full top-1/2 -translate-y-1/2 mr-4 hidden lg:block
            transform transition-all duration-300 ease-out origin-right
            ${isHovered && !isOpen ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-2'}
          `}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 px-4 py-3">
              <div className="flex items-center gap-3 whitespace-nowrap">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">
                    Idioma: {currentLang.name}
                  </div>
                  <div className="text-xs text-gray-500">Clic para cambiar</div>
                </div>
              </div>
            </div>
            <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white/95"></div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />}

      {/* Estilos CSS */}
      <style jsx global>{`
        @keyframes slide-in-from-bottom-2 {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation-fill-mode: both;
        }

        .slide-in-from-bottom-2 {
          animation-name: slide-in-from-bottom-2;
        }
      `}</style>
    </div>
  );
}