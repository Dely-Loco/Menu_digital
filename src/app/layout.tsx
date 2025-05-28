import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Importación de los componentes base del layout
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";

// Tipografía Inter de Google Fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Información meta con favicon personalizado
export const metadata: Metadata = {
  title: 'Houzze Tec',
  description: 'Specialized store for technological products, electronics, and smart accessories for home, office, and digital lifestyle.',
  icons: {
    icon: '/logo.png',       // ← Tu favicon personalizado
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
