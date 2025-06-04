// @/components/layout/footer.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, Phone, MapPin,
  Facebook, /*Twitter,*/ Instagram, 
  /*Linkedin,*/ /*Youtube,*/
  Smartphone, Zap, Headphones, 
  Watch, ShoppingBag, Heart,
  Shield, 
  Truck, CreditCard, Globe
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // ============= CONFIGURACIÓN PERSONALIZABLE =============
  // 🔧 AQUÍ PUEDES MODIFICAR LAS CATEGORÍAS Y ENLACES DE PRODUCTOS
  const footerLinks = {
      products: [
        // 📝 MODIFICA: href (enlace), label (nombre que aparece), icon (ícono)
        { href: '/products?category=celulares', label: 'Celulares', icon: Smartphone },
        { href: '/products?category=relojes', label: 'Relojes', icon: Watch },
        { href: '/products?category=audio', label: 'Audio', icon: Headphones },
        { href: '/products?category=powerbanck', label: 'Power Bank', icon: Zap },
        { href: '/products?category=accesorios', label: 'Accesorios', icon: ShoppingBag },
        // 🆕 AGREGAR MÁS: { href: '/products?category=gaming', label: 'Gaming', icon: Gamepad2 },
      ],
    
    // 🔧 SECCIÓN DE EMPRESA - MODIFICA O AGREGA PÁGINAS
    company: [
      { href: '/about', label: 'Sobre Nosotros' },        // 📝 Cambia el nombre y enlace
      { href: '/blog', label: 'Blog' },                   // 📝 Si no tienes blog, elimina esta línea
      { href: '/contact', label: 'Contáctanos' },         // 📝 Página de contacto
      // 🆕 AGREGAR MÁS: { href: '/careers', label: 'Trabaja con Nosotros' },
    ],
    
    // 🔧 ENLACES LEGALES - IMPORTANTES PARA ECOMMERCE
    legal: [
      { href: '/privacy-policy', label: 'Política de Privacidad' },     // 📝 Cambia el nombre si quieres
      { href: '/terms-of-service', label: 'Términos de Servicio' },     // 📝 Importante para ventas
      // 🆕 OPCIONAL: { href: '/cookies', label: 'Política de Cookies' },
      // 🆕 OPCIONAL: { href: '/returns', label: 'Devoluciones' },
    ]
  };

  // 🔧 REDES SOCIALES - MODIFICA LOS ENLACES Y COLORES
  const socialLinks = [
    { 
      href: 'https://www.facebook.com/profile.php?id=61577043022680', // 📝 TU ENLACE DE FACEBOOK
      icon: Facebook, 
      label: 'Facebook', 
      color: 'hover:text-blue-500'  // 📝 CAMBIA EL COLOR AL HACER HOVER
    },
    { 
      href: 'https://www.instagram.com/houzze.tec/?utm_source=ig_web_button_share_sheet', // 📝 TU ENLACE DE INSTAGRAM
      icon: Instagram, 
      label: 'Instagram', 
      color: 'hover:text-pink-500' // 📝 CAMBIA EL COLOR
    },
    // 🆕 DESCOMENTA Y MODIFICA PARA AGREGAR MÁS REDES:
    // { href: 'https://twitter.com/tu_usuario', icon: Twitter, label: 'Twitter/X', color: 'hover:text-sky-400' },
    // { href: 'https://linkedin.com/company/tu_empresa', icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-600' },
    // { href: 'https://youtube.com/@tu_canal', icon: Youtube, label: 'YouTube', color: 'hover:text-red-500' },
  ];

  // 🔧 CARACTERÍSTICAS DESTACADAS - MODIFICA TÍTULOS, DESCRIPCIONES E ÍCONOS
  const features = [
    { 
      icon: Shield, 
      title: 'Compra Segura',           // 📝 CAMBIA EL TÍTULO
      description: 'Transacciones protegidas' // 📝 CAMBIA LA DESCRIPCIÓN
    },
    { 
      icon: Truck, 
      title: 'Envíos Confiables',       // 📝 MODIFICA SEGÚN TU SERVICIO
      description: 'A todo el país'     // 📝 CAMBIA SEGÚN TU COBERTURA
    },
    { 
      icon: CreditCard, 
      title: 'Pagos Fáciles',           // 📝 PERSONALIZA
      description: 'Diversos métodos de pago' // 📝 ESPECIFICA TUS MÉTODOS DE PAGO
    },
    { 
      icon: Headphones, 
      title: 'Soporte Dedicado',        // 📝 CAMBIA EL NOMBRE DEL SERVICIO
      description: 'Estamos para ayudarte' // 📝 PERSONALIZA EL MENSAJE
    },
    // 🆕 AGREGAR MÁS CARACTERÍSTICAS:
    // { icon: Award, title: 'Garantía', description: '1 año de garantía' },
    // { icon: Clock, title: 'Entrega Rápida', description: '24-48 horas' },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden">
      {/* 🎨 EFECTOS VISUALES - MODIFICA LOS COLORES DEL GRADIENTE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.1),transparent_70%)]" />
      {/* 📝 BARRA SUPERIOR DE COLOR - CAMBIA LOS COLORES: from-orange-400 via-red-500 to-pink-500 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500" />

      {/* 📏 CONTENEDOR PRINCIPAL - MODIFICA padding-y (py-16) PARA CAMBIAR ALTURA */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        
        {/* ============= SECCIÓN DE CARACTERÍSTICAS ============= */}
        {/* 📱 GRID RESPONSIVO - MODIFICA grid-cols para cambiar columnas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="flex flex-col items-center text-center group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              {/* 🎨 CONTENEDOR DE ÍCONO - MODIFICA p-4 PARA CAMBIAR TAMAÑO */}
              <div className="p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl mb-4 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-all duration-300">
                {/* 📏 TAMAÑO DEL ÍCONO - CAMBIA h-8 w-8 POR h-6 w-6 (más pequeño) o h-10 w-10 (más grande) */}
                <feature.icon className="h-8 w-8 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
              </div>
              {/* 📝 TÍTULO DE LA CARACTERÍSTICA - MODIFICA text-lg PARA CAMBIAR TAMAÑO DE TEXTO */}
              <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-400 transition-colors duration-300">
                {feature.title}
              </h3>
              {/* 📝 DESCRIPCIÓN - MODIFICA text-sm PARA CAMBIAR TAMAÑO */}
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* ============= SECCIÓN PRINCIPAL DE ENLACES ============= */}
        {/* 📱 LAYOUT RESPONSIVO - MODIFICA grid-cols PARA CAMBIAR DISTRIBUCIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* ============= LOGO Y CONTACTO ============= */}
          {/* 📏 ESPACIO DEL LOGO - lg:col-span-2 HACE QUE OCUPE 2 COLUMNAS */}
          <div className="lg:col-span-2">
            <div className="flex items-center group mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300" />
                {/* 🖼️ LOGO - MODIFICA width y height PARA CAMBIAR TAMAÑO */}
                <Image
                  src="/Logo.png" // 📝 CAMBIA LA RUTA DE TU LOGO
                  alt="Logo Houzze Tec" // 📝 CAMBIA EL ALT TEXT
                  width={60}  // 📏 ANCHO DEL LOGO - MODIFICA ESTE NÚMERO
                  height={60} // 📏 ALTO DEL LOGO - MODIFICA ESTE NÚMERO
                  className="relative rounded-xl transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="ml-4">
                {/* 📝 NOMBRE DE LA EMPRESA - MODIFICA text-3xl PARA CAMBIAR TAMAÑO */}
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Houzze Tec {/* 📝 CAMBIA EL NOMBRE DE TU EMPRESA AQUÍ */}
                </span>
                {/* 📝 ESLOGAN - MODIFICA O ELIMINA ESTA LÍNEA */}
                <div className="text-sm text-gray-400 font-medium tracking-wider">
                  INNOVACIÓN TECNOLÓGICA {/* 📝 CAMBIA EL ESLOGAN */}
                </div>
              </div>
            </div>
            
            {/* 📝 DESCRIPCIÓN DE LA EMPRESA - PERSONALIZA COMPLETAMENTE */}
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              En Houzze Tec te traemos lo mejor de la tecnología. Desde audífonos de alto rendimiento hasta los últimos smartphones, ofrecemos gadgets de vanguardia que fusionan estilo, innovación y potencia — hechos para elevar tu estilo de vida.
              {/* 📝 REEMPLAZA ESTE TEXTO CON LA DESCRIPCIÓN DE TU NEGOCIO */}
            </p>
            
            {/* ============= INFORMACIÓN DE CONTACTO ============= */}
            <div className="space-y-3">
              {/* 📞 TELÉFONO - MODIFICA EL NÚMERO */}
              <div className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors duration-300 group cursor-pointer">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-orange-500/20 transition-all duration-300">
                  <Phone className="h-4 w-4" />
                </div>
                <span>+57 (324) 678-9589</span> {/* 📝 CAMBIA POR TU NÚMERO */}
              </div>
              
              {/* 📧 EMAIL - MODIFICA EL CORREO */}
              <div className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors duration-300 group cursor-pointer">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-orange-500/20 transition-all duration-300">
                  <Mail className="h-4 w-4" />
                </div>
                <span>houzzesoluciones@gmail.com</span> {/* 📝 CAMBIA POR TU EMAIL */}
              </div>
              
              {/* 📍 DIRECCIÓN - MODIFICA LA UBICACIÓN */}
              <div className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors duration-300 group cursor-pointer">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-orange-500/20 transition-all duration-300">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Cra 47 # 52-86 Medellín, Ant.</span> {/* 📝 CAMBIA POR TU DIRECCIÓN */}
              </div>
            </div>
          </div>

          {/* ============= ENLACES DE PRODUCTOS ============= */}
          <div>
            {/* 📝 TÍTULO DE SECCIÓN - MODIFICA text-lg PARA CAMBIAR TAMAÑO */}
            <h3 className="text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Productos {/* 📝 CAMBIA EL NOMBRE DE LA SECCIÓN */}
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href} // 📝 ENLACE DEFINIDO EN footerLinks.products
                    className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-all duration-300 group"
                  >
                    {/* 📏 ÍCONOS DE ENLACES - MODIFICA h-4 w-4 PARA CAMBIAR TAMAÑO */}
                    {link.icon && <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />}
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label} {/* 📝 TEXTO DEFINIDO EN footerLinks.products */}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ============= ENLACES DE EMPRESA ============= */}
          {footerLinks.company.length > 0 && (
            <div>
              {/* 📝 TÍTULO DE SECCIÓN EMPRESA */}
              <h3 className="text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Empresa {/* 📝 CAMBIA EL NOMBRE DE LA SECCIÓN */}
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href} // 📝 ENLACE DEFINIDO EN footerLinks.company
                      className="text-gray-400 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label} {/* 📝 TEXTO DEFINIDO EN footerLinks.company */}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ============= SECCIÓN INFERIOR ============= */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* ============= REDES SOCIALES ============= */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm font-medium mr-2">Síguenos:</span>
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href} // 📝 ENLACE DEFINIDO EN socialLinks
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 bg-gray-800 rounded-full ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-700 group`}
                  aria-label={social.label}
                >
                  {/* 📏 ÍCONOS SOCIALES - MODIFICA h-4 w-4 md:h-5 md:w-5 PARA CAMBIAR TAMAÑO */}
                  <social.icon className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform duration-300" />
                </Link>
              ))}
            </div>

            {/* ============= COPYRIGHT Y ENLACES LEGALES ============= */}
            <div className="text-center lg:text-right">
              {/* 📝 COPYRIGHT - SE ACTUALIZA AUTOMÁTICAMENTE EL AÑO */}
              <p className="text-gray-400 text-sm mb-2">
                &copy; {currentYear} Houzze Tec. Todos los derechos reservados. {/* 📝 CAMBIA EL NOMBRE */}
              </p>
              {/* 📝 ENLACES LEGALES */}
              <div className="flex flex-wrap justify-center lg:justify-end gap-4 text-xs">
                {footerLinks.legal.map((link, index) => (
                  <span key={link.href} className="flex items-center">
                    <Link
                      href={link.href} // 📝 ENLACE DEFINIDO EN footerLinks.legal
                      className="text-gray-500 hover:text-orange-400 transition-colors duration-300"
                    >
                      {link.label} {/* 📝 TEXTO DEFINIDO EN footerLinks.legal */}
                    </Link>
                    {index < footerLinks.legal.length - 1 && (
                      <span className="text-gray-600 mx-2">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ============= MENSAJE FINAL ============= */}
          <div className="text-center mt-6 pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              Made with<Heart className="h-4 w-4 text-red-500 animate-pulse" /> by the Houzze Tec Team {/* 📝 CAMBIA EL NOMBRE DEL EQUIPO */}
              <Globe className="h-4 w-4 text-blue-400 animate-spin-slow" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* 
============= GUÍA RÁPIDA DE PERSONALIZACIÓN =============

🎨 COLORES:
- Cambia "orange-400" por "blue-400", "green-400", "purple-400", etc.
- Modifica los gradientes en las clases: from-orange-400 to-red-500

📏 TAMAÑOS:
- Texto: text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl
- Íconos: h-4 w-4 (pequeño), h-6 w-6 (medio), h-8 w-8 (grande)
- Padding: p-2, p-4, p-6, p-8
- Margins: m-2, m-4, m-6, m-8

📱 RESPONSIVE:
- grid-cols-1 md:grid-cols-2 lg:grid-cols-4 (móvil: 1 col, tablet: 2 col, desktop: 4 col)
- Modifica según necesites

🔧 MODIFICACIONES PRINCIPALES:
1. footerLinks: Cambia enlaces y nombres de categorías
2. socialLinks: Actualiza tus redes sociales
3. features: Personaliza las características de tu negocio
4. Información de contacto: Teléfono, email, dirección
5. Logo: Cambia la ruta y tamaño
6. Nombre de empresa y eslogan
7. Descripción del negocio

💡 TIPS:
- Para quitar una sección completa, comenta o elimina el div correspondiente
- Para agregar más elementos, copia la estructura existente
- Los colores hover se pueden cambiar en cada elemento individualmente
*/