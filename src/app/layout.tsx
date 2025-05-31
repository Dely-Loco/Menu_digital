// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/context/CartContext'; // <-- 1. IMPORTA EL CARTPROVIDER

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Houzze Tec',
  description: 'Tienda especializada en productos tecnológicos, electrónicos y accesorios inteligentes para el hogar, oficina y estilo de vida digital.', // Texto traducido
  icons: {
    icon: '/Logo.png', // Asegúrate que esta ruta sea correcta (desde la carpeta public)
    shortcut: '/Logo.png',
    apple: '/Logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es"> {/* Sugerencia: Cambia el idioma a español "es" */}
      <body
        className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen bg-gray-100 dark:bg-slate-900`} // Añadido un color de fondo base
      >
        <CartProvider> {/* <-- 2. ENVUELVE CON CARTPROVIDER */}
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}

