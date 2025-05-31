// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/context/CartContext';
import WhatsAppButton from '@/components/ui/whatsapp-button';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Houzze Tec | Innovación Tecnológica',
  description:
    'Tu tienda especializada en productos tecnológicos de vanguardia, electrónicos y accesorios inteligentes para el hogar, oficina y tu estilo de vida digital.',
  icons: {
    icon: '/Logo.png',
    shortcut: '/Logo.png',
    apple: '/Logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Configuración de WhatsApp
  const whatsappNumber = "573246789589"; // Reemplaza con tu número real
  const whatsappMessage = "¡Hola Houzze Tec! Estoy interesado/a en conocer más sobre sus productos tecnológicos. ¿Pueden darme más información? ¡Gracias!";

  return (
    <html lang="es">
      <body
        className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen bg-gray-50 dark:bg-slate-950`}
      >
        <CartProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <Toaster />

          {/* BOTÓN FLOTANTE DE WHATSAPP MEJORADO */}
          <WhatsAppButton 
            phoneNumber={whatsappNumber}
            message={whatsappMessage}
          />
        </CartProvider>
      </body>
    </html>
  );
}