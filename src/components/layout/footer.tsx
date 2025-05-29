// @/components/layout/footer.tsx
"use client"; // Indica que este es un componente del lado del cliente (React hooks)

// Importaciones de Next.js para navegación e imágenes optimizadas
import Link from 'next/link';
import Image from 'next/image';

// Importación de iconos de Lucide React
import { 
  Mail, Phone, MapPin,           // Iconos de contacto
  Facebook, Twitter, Instagram,  // Iconos de redes sociales
  Linkedin, Youtube,
  Smartphone, Zap, Headphones,   // Iconos de productos
  Watch, Monitor, Heart,
  ArrowUp, Send, Shield,         // Iconos de características
  Truck, CreditCard, Award,
  Star, Globe
} from 'lucide-react';

// Importación de componentes UI personalizados
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Hooks de React para manejar estado y efectos
import { useState, useEffect } from 'react';

export default function Footer() {
  // ESTADOS DEL COMPONENTE
  const [email, setEmail] = useState(''); // Estado para el email del newsletter
  const [showScrollTop, setShowScrollTop] = useState(false); // Controla si mostrar botón scroll
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false); // Estado newsletter enviado

  // EFECTO PARA DETECTAR SCROLL Y MOSTRAR BOTÓN "VOLVER ARRIBA"
  useEffect(() => {
    const handleScroll = () => {
      // Muestra el botón cuando el usuario baja más de 300px
      setShowScrollTop(window.scrollY > 300);
    };
    // Agrega listener de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup: remueve el listener cuando el componente se desmonta
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FUNCIÓN PARA SCROLL SUAVE HACIA ARRIBA
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // MANEJAR ENVÍO DEL NEWSLETTER
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene el envío por defecto del formulario
    if (email) {
      setIsNewsletterSubmitted(true); // Marca como enviado
      setEmail(''); // Limpia el input
      // Después de 3 segundos, oculta el mensaje de confirmación
      setTimeout(() => setIsNewsletterSubmitted(false), 3000);
    }
  };

  // OBTIENE EL AÑO ACTUAL PARA EL COPYRIGHT
  const currentYear = new Date().getFullYear();

  // CONFIGURACIÓN DE ENLACES DEL FOOTER ORGANIZADOS POR CATEGORÍAS
  const footerLinks = {
    // Enlaces de productos con iconos
    products: [
      { href: '/products/electronics', label: 'Electronics', icon: Smartphone },
      { href: '/products/smart-home', label: 'Smart Home', icon: Zap },
      { href: '/products/audio', label: 'Audio', icon: Headphones },
      { href: '/products/wearables', label: 'Wearables', icon: Watch },
      { href: '/products/displays', label: 'Displays', icon: Monitor },
    ],
    // Enlaces de la empresa
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/careers', label: 'Careers' },
      { href: '/blog', label: 'Blog' },
      { href: '/press', label: 'Press' },
      { href: '/investors', label: 'Investors' },
    ],
    // Enlaces de soporte
    support: [
      { href: '/support', label: 'Help Center' },
      { href: '/contact', label: 'Contact Us' },
      { href: '/shipping', label: 'Shipping Info' },
      { href: '/returns', label: 'Returns' },
      { href: '/warranty', label: 'Warranty' },
    ],
    // Enlaces legales
    legal: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-service', label: 'Terms of Service' },
      { href: '/cookies', label: 'Cookie Policy' },
      { href: '/accessibility', label: 'Accessibility' },
    ]
  };

  // CONFIGURACIÓN DE REDES SOCIALES CON COLORES PERSONALIZADOS
  const socialLinks = [
    { href: '#', icon: Facebook, label: 'Facebook', color: 'hover:text-blue-500' },
    { href: '#', icon: Twitter, label: 'Twitter/X', color: 'hover:text-sky-400' },
    { href: '#', icon: Instagram, label: 'Instagram', color: 'hover:text-pink-500' },
    { href: '#', icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-600' },
    { href: '#', icon: Youtube, label: 'YouTube', color: 'hover:text-red-500' },
  ];

  // CARACTERÍSTICAS DESTACADAS DE LA EMPRESA
  const features = [
    { icon: Shield, title: 'Secure Shopping', description: '256-bit SSL encryption' },
    { icon: Truck, title: 'Free Shipping', description: 'On orders over $99' },
    { icon: CreditCard, title: 'Easy Returns', description: '30-day return policy' },
    { icon: Award, title: 'Warranty', description: '2-year manufacturer warranty' },
  ];

  return (
    <>
      {/* FOOTER PRINCIPAL */}
      <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden">
        
        {/* EFECTOS VISUALES DE FONDO */}
        {/* Gradiente radial para crear efecto de luz */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.1),transparent_70%)]" />
        {/* Línea de color en la parte superior */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          
          {/* SECCIÓN DE CARACTERÍSTICAS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="flex flex-col items-center text-center group cursor-pointer"
                style={{
                  // Animación escalonada para cada elemento
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* Contenedor del icono con efectos hover */}
                <div className="p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl mb-4 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
                </div>
                
                {/* Título de la característica */}
                <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                {/* Descripción */}
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CONTENIDO PRINCIPAL DEL FOOTER */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
            
            {/* SECCIÓN DE MARCA/LOGO (ocupa 2 columnas) */}
            <div className="lg:col-span-2">
              {/* Logo y nombre de la empresa */}
              <Link href="/" className="flex items-center group mb-6">
                <div className="relative">
                  {/* Efecto de brillo al hacer hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300" />
                  <Image
                    src="/Logo.png"
                    alt="Houzze Tec Logo"
                    width={60}
                    height={60}
                    className="relative rounded-xl transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="ml-4">
                  {/* Nombre con gradiente de texto */}
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                    Houzze Tec
                  </span>
                  <div className="text-sm text-gray-400 font-medium tracking-wider">
                    TECH INNOVATION
                  </div>
                </div>
              </Link>

              {/* Descripción de la empresa */}
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
               Houzze Tec brings the coolest in tech right to your hands. From high-performance headphones to the latest smartphones, we deliver cutting-edge gadgets that fuse style, innovation, and power — made to elevate your lifestyle and keep you ahead of the curve.
              </p>

              {/* INFORMACIÓN DE CONTACTO */}
              <div className="space-y-3">
                {/* Teléfono */}
                <div className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors duration-300 group cursor-pointer">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-orange-500/20 transition-all duration-300">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>+57 (324) 678-9589</span>
                </div>
                
                {/* Email */}
                <div className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors duration-300 group cursor-pointer">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-orange-500/20 transition-all duration-300">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>houzzesoluciones@gmail.com</span>
                </div>
                
                {/* Dirección */}
                <div className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors duration-300 group cursor-pointer">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-orange-500/20 transition-all duration-300">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>Cra47 # 52-86 Medellín, Ant.</span>
                </div>
              </div>
            </div>

           {/* ENLACES DE PRODUCTOS */}
           <div>
              <h3 className="text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Products
              </h3>
              <ul className="space-y-3">
                {footerLinks.products.map((link) => (
                  <li key={link.label}>
                    {/* Elemento div en lugar de Link para evitar navegación */}
                    <div className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-all duration-300 group cursor-pointer">
                      {/* Icono del producto con animación */}
                      {link.icon && <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />}
                      {/* Texto con desplazamiento al hover */}
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.label}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* ENLACES DE EMPRESA */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Company
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

            {/* ENLACES DE SOPORTE */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
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
          </div>

          {/* SECCIÓN DE REDES SOCIALES Y LEGAL */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              
              {/* REDES SOCIALES */}
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm font-medium mr-2">Follow us:</span>
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className={`p-3 bg-gray-800 rounded-full ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-700 group`}
                    aria-label={social.label} // Accesibilidad
                  >
                    {/* Icono con animación al hover */}
                    <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  </Link>
                ))}
              </div>

              {/* COPYRIGHT Y ENLACES LEGALES */}
              <div className="text-center lg:text-right">
                {/* Copyright dinámico con año actual */}
                <p className="text-gray-400 text-sm mb-2">
                  &copy; {currentYear} Houzze Tec. All rights reserved.
                </p>
                
                {/* Enlaces legales separados por puntos */}
                <div className="flex flex-wrap justify-center lg:justify-end gap-4 text-xs">
                  {footerLinks.legal.map((link, index) => (
                    <span key={link.href} className="flex items-center">
                      <Link
                        href={link.href}
                        className="text-gray-500 hover:text-orange-400 transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                      {/* Separador entre enlaces (excepto el último) */}
                      {index < footerLinks.legal.length - 1 && (
                        <span className="text-gray-600 mx-2">•</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* MENSAJE "HECHO CON AMOR" */}
            <div className="text-center mt-6 pt-6 border-t border-gray-800">
              <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" /> by the Houzze Tec Team
                <Globe className="h-4 w-4 text-blue-400 animate-spin-slow" />
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* BOTÓN DE SCROLL HACIA ARRIBA */}
      <div className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
        // Controla la visibilidad basado en el estado showScrollTop
        showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
      }`}>
        <Button
          onClick={scrollToTop} // Función para ir arriba
          className="h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Scroll to top" // Accesibilidad
        >
          <ArrowUp className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
        </Button>
      </div>
    </>
  );
}