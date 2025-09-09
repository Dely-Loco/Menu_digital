// src/components/layout/footer.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, Phone, MapPin, Clock,
  Facebook, Instagram, 
  Heart, Coffee, 
  ChefHat,    // Para Bandejas y Asados
  Wheat,      // Para Arroces
  Pizza,      // Para Comida Italiana
  Flame,     // Para Comida Mexicana
  Utensils,       // Para Comida Rápida
  Beef,       // Para Perros y Hamburguesas
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Enlaces del menú adaptados
  const footerLinks = {
    menu: [
  { href: '/menu?category=bandejas-y-asados', label: 'Bandejas y Asados', icon: Beef },
  { href: '/menu?category=arroces', label: 'Arroces', icon: Wheat },
  { href: '/menu?category=comida-italiana', label: 'Comida Italiana', icon: Pizza },
  { href: '/menu?category=comida-mexicana', label: 'Comida Mexicana', icon: Flame },
  { href: '/menu?category=comida-rapida', label: 'Comida Rápida', icon: ChefHat },
  { href: '/menu?category=perros-y-hamburguesas', label: 'Perros y Hamburguesas', icon: Utensils },
  { href: '/menu?category=bebidas', label: 'Bebidas', icon: Coffee },
],
    company: [
      { href: '/about', label: 'Sobre Nosotros' },
      { href: '/menu', label: 'Ver Menú Completo' },
      { href: '/contact', label: 'Ubicación' },
    ],
    legal: [
      { href: '/privacy-policy', label: 'Política de Privacidad' },
      { href: '/terms-of-service', label: 'Términos de Servicio' },
    ]
  };

  const socialLinks = [
    { href: 'https://www.facebook.com/delylocooficial', icon: Facebook, label: 'Facebook', color: 'hover:text-blue-500' },
    { href: 'https://www.instagram.com/delylocooficial/', icon: Instagram, label: 'Instagram', color: 'hover:text-pink-500' },
  ];

  // Información real del restaurante Dely Loco
  const restaurantInfo = {
    phone: '+57 301 4056704',
    email: 'delylococomuna13@gmail.com',
    address: 'Comuna 13, Medellín - Colombia',
    hours: 'Lun - Dom: 12:00 PM - 8:00 PM'
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden">
      {/* Borde superior decorativo */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500" />
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-red-500/5 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        
        {/* Sección principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Logo + Descripción + Contacto */}
          <div className="lg:col-span-2">
            <div className="flex items-center group mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300" />
                <Image
                  src="/Logo.png"
                  alt="Logo Dely Loco"
                  width={60}
                  height={60}
                  className="relative rounded-xl transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="ml-4">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400">
                  Dely Loco
                </span>
                <div className="text-sm text-gray-400 font-medium tracking-wider">
                  COMUNA 13 • MEDELLÍN
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-8 max-w-md">
              Dely Loco es el sabor auténtico de la Comuna 13. Ven y disfruta de nuestros platos típicos, 
              bebidas refrescantes y el ambiente único de Medellín. 
              <span className="text-orange-400 font-medium">¡Te esperamos!</span>
            </p>

            {/* Información de contacto */}
            <div className="space-y-4">
              <a 
                href={`tel:${restaurantInfo.phone}`}
                className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-all duration-300 group/contact"
              >
                <div className="p-2.5 bg-gray-800 rounded-lg group-hover/contact:bg-orange-500/20 transition-all duration-300">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">{restaurantInfo.phone}</div>
                  <div className="text-xs text-gray-500">Llamar para pedidos</div>
                </div>
              </a>
              
              <a 
                href={`mailto:${restaurantInfo.email}`}
                className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-all duration-300 group/contact"
              >
                <div className="p-2.5 bg-gray-800 rounded-lg group-hover/contact:bg-orange-500/20 transition-all duration-300">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">{restaurantInfo.email}</div>
                  <div className="text-xs text-gray-500">Contáctanos por email</div>
                </div>
              </a>
              
              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2.5 bg-gray-800 rounded-lg">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">{restaurantInfo.address}</div>
                  <div className="text-xs text-gray-500">Visítanos</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2.5 bg-gray-800 rounded-lg">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">{restaurantInfo.hours}</div>
                  <div className="text-xs text-gray-500">Horarios de atención</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enlaces del menú */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Nuestro Menú
            </h3>
            <ul className="space-y-3">
              {footerLinks.menu.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-all duration-300 group/menu"
                  >
                    <link.icon className="h-4 w-4 group-hover/menu:scale-110 transition-transform duration-300" />
                    <span className="group-hover/menu:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enlaces de la empresa */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Restaurante
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

            {/* Llamada a la acción */}
            <div className="mt-8 p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl border border-orange-500/30">
              <h4 className="font-semibold text-orange-400 mb-2">¿Tienes hambre?</h4>
              <p className="text-sm text-gray-300 justify-center mb-3">Escríbenos y haz tu pedido</p>
              
            </div>
          </div>
        </div>

        {/* Sección inferior */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Redes sociales */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm font-medium mr-2">Síguenos en:</span>
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-gray-800 rounded-full ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-700 shadow-lg hover:shadow-xl`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>

            {/* Copyright y enlaces legales */}
            <div className="text-center lg:text-right">
              <p className="text-gray-400 text-sm mb-2 font-medium">
                &copy; {currentYear} Dely Loco Comuna 13. Todos los derechos reservados.
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

          {/* Mensaje final con branding */}
          <div className="text-center mt-8 pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2 mb-2">
              Hecho con <Heart className="h-4 w-4 text-red-500 animate-pulse" /> para la Comuna 13
            </p>
            <p className="text-xs text-gray-600">
              Desarrollado por Pablo Henao • Menú Digital Dely Loco
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}