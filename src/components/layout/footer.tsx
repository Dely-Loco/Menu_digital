// @/components/layout/footer.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, Phone, MapPin,
  Facebook, Twitter, Instagram, 
  Linkedin, Youtube,
  Smartphone, Zap, Headphones, 
  Watch, Monitor, Heart,
  ArrowUp, Shield, 
  Truck, CreditCard, Globe // Eliminado Award, Send si no se usan
} from 'lucide-react';
import { Button } from '@/components/ui/button';
// Input ya no se usa si eliminamos el newsletter, pero lo dejo por si acaso
// import { Input } from '@/components/ui/input'; 
import { useState, useEffect } from 'react';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  // const [email, setEmail] = useState(''); // Eliminado si no hay newsletter
  // const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false); // Eliminado

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Eliminado handleNewsletterSubmit si no hay newsletter
  // const handleNewsletterSubmit = (e: React.FormEvent) => { ... };

  const currentYear = new Date().getFullYear();

  // CONFIGURACIÓN DE ENLACES DEL FOOTER (SIMPLIFICADOS Y TRADUCIDOS)
  const footerLinks = {
    products: [ // TRADUCIDO: Productos
      // Estos href deben coincidir con los slugs de tus categorías o las URLs de tus filtros
      { href: '/products?category=electronics', label: 'Electrónicos', icon: Smartphone },
      { href: '/products?category=smart-home', label: 'Hogar Inteligente', icon: Zap },
      { href: '/products?category=audio', label: 'Audio', icon: Headphones },
      { href: '/products?category=wearables', label: 'Vestibles', icon: Watch },
      { href: '/products?category=displays', label: 'Monitores', icon: Monitor },
    ],
    // SECCIÓN COMPANY SIMPLIFICADA (Opcional, puedes eliminarla o ajustar más)
    company: [ // TRADUCIDO: Empresa
      { href: '/about', label: 'Sobre Nosotros' }, // Si tienes una página "Acerca de"
      { href: '/blog', label: 'Blog' },          // Si tienes un blog
      { href: '/contact', label: 'Contáctanos' }, // Movido de support
    ],
    // SECCIÓN SUPPORT ELIMINADA (o muy reducida a "Contáctanos" ya en Company)
    legal: [ // TRADUCIDO: Legal
      { href: '/privacy-policy', label: 'Política de Privacidad' },
      { href: '/terms-of-service', label: 'Términos de Servicio' },
      // { href: '/cookies', label: 'Política de Cookies' }, // Opcional
    ]
  };

  const socialLinks = [
    { href: 'https://www.facebook.com/profile.php?id=61577043022680', icon: Facebook, label: 'Facebook', color: 'hover:text-blue-500' },
    { href: 'https://www.instagram.com/houzze.tec/?utm_source=ig_web_button_share_sheet', icon: Instagram, label: 'Instagram', color: 'hover:text-pink-500' },
    // Añade más solo si realmente los vas a usar
    // { href: '#', icon: Twitter, label: 'Twitter/X', color: 'hover:text-sky-400' },
    // { href: '#', icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-600' },
    // { href: '#', icon: Youtube, label: 'YouTube', color: 'hover:text-red-500' },
  ];

  // CARACTERÍSTICAS DESTACADAS (AJUSTADAS Y TRADUCIDAS)
  const features = [
    { icon: Shield, title: 'Compra Segura', description: 'Transacciones protegidas' }, // TRADUCIDO
    { icon: Truck, title: 'Envíos Confiables', description: 'A todo el país' },      // TRADUCIDO
    { icon: CreditCard, title: 'Pagos Fáciles', description: 'Diversos métodos de pago' }, // TRADUCIDO
    { icon: Headphones, title: 'Soporte Dedicado', description: 'Estamos para ayudarte' }, // TRADUCIDO y cambiado ícono
  ];

  return (
    <>
      <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.1),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="flex flex-col items-center text-center group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
              >
                <div className="p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl mb-4 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"> {/* Ajustado a 4 columnas para mejor distribución con menos secciones */}
            
            <div className="lg:col-span-2"> {/* Logo y contacto ocupan más espacio si es necesario */}
              <Link href="/" className="flex items-center group mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300" />
                  <Image
                    src="/Logo.png" // Asegúrate que esta ruta sea correcta
                    alt="Logo Houzze Tec"
                    width={60}
                    height={60}
                    className="relative rounded-xl transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="ml-4">
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                    Houzze Tec
                  </span>
                  <div className="text-sm text-gray-400 font-medium tracking-wider">
                    INNOVACIÓN TECNOLÓGICA
                  </div>
                </div>
              </Link>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                {/* TRADUCIDO Y AJUSTADO TEXTO */}
                En Houzze Tec te traemos lo mejor de la tecnología. Desde audífonos de alto rendimiento hasta los últimos smartphones, ofrecemos gadgets de vanguardia que fusionan estilo, innovación y potencia — hechos para elevar tu estilo de vida.
              </p>
              {/* INFORMACIÓN DE CONTACTO (YA ESTABA BIEN) */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors duration-300 group cursor-pointer">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-orange-500/20 transition-all duration-300">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>+57 (324) 678-9589</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors duration-300 group cursor-pointer">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-orange-500/20 transition-all duration-300">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>houzzesoluciones@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors duration-300 group cursor-pointer">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-orange-500/20 transition-all duration-300">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>Cra 47 # 52-86 Medellín, Ant.</span>
                </div>
              </div>
            </div>

            {/* ENLACES DE PRODUCTOS (TRADUCIDO) */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Productos
              </h3>
              <ul className="space-y-3">
                {footerLinks.products.map((link) => (
                  <li key={link.label}>
                    <Link // CAMBIADO A LINK SI QUIERES QUE NAVEGUEN
                      href={link.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-all duration-300 group"
                    >
                      {link.icon && <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />}
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ENLACES DE EMPRESA (SIMPLIFICADOS Y TRADUCIDOS) */}
            {footerLinks.company.length > 0 && ( // Mostrar solo si hay enlaces de empresa
              <div>
                <h3 className="text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Empresa
                </h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* La sección de Support se eliminó, sus enlaces importantes como "Contáctanos" se movieron a "Empresa" */}
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm font-medium mr-2">Síguenos:</span> {/* TRADUCIDO */}
                {socialLinks.map((social) => (
  <Link
    key={social.label}
    href={social.href}
    target="_blank" // <--- AÑADE ESTO
    rel="noopener noreferrer" // <--- Y ESTO
    className={`p-2.5 bg-gray-800 rounded-full ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-700 group`}
    aria-label={social.label}
  >
    <social.icon className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform duration-300" />
  </Link>
))}
              </div>

              <div className="text-center lg:text-right">
                <p className="text-gray-400 text-sm mb-2">
                  &copy; {currentYear} Houzze Tec. Todos los derechos reservados. {/* TRADUCIDO */}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-end gap-4 text-xs">
                  {footerLinks.legal.map((link, index) => (
                    <span key={link.href} className="flex items-center">
                      <Link
                        href={link.href}
                        className="text-gray-500 hover:text-orange-400 transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                      {index < footerLinks.legal.length - 1 && (
                        <span className="text-gray-600 mx-2">•</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mt-6 pt-6 border-t border-gray-800">
              <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                {/* TRADUCIDO */}
                Made with<Heart className="h-4 w-4 text-red-500 animate-pulse" /> by the Houzze Tec Team
                <Globe className="h-4 w-4 text-blue-400 animate-spin-slow" />
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/*
{showScrollTop && (
  <div className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
    showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
  }`}>
    <Button
      onClick={scrollToTop}
      className="h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Volver arriba"
    >
      <ArrowUp className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
    </Button>
  </div>
)}
*/}

    </>
  );
}