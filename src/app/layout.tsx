import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Importación de los componentes base del layout
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

// Importamos el componente Toaster que acabamos de crear
import { Toaster } from "@/components/ui/toaster";

// Tipografía Inter de Google Fonts, útil para mantener estilo consistente
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Información meta para SEO (opcional pero recomendable)
export const metadata: Metadata = {
  title: 'Houzze Tec - Your Tech Store',
  description: 'Specialized store for technological products, electronics, and smart accessories for home, office, and digital lifestyle.',
  icons: {
    icon: '/favicon.ico', // ← Favicon agregado
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

// Este es el layout general que envuelve toda la aplicación
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Header /> {/* Cabecera con navegación u otros elementos */}
        
        <main className="flex-grow container mx-auto px-4 py-8">
          {children} {/* Aquí se renderiza la página actual */}
        </main>

        <Footer /> {/* Pie de página */}
        <Toaster /> {/* Aquí montamos los toasts, para que funcionen en toda la app */}
      </body>
    </html>
  );
}

