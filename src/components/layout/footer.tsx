// @/components/layout/footer.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Smartphone,
  Zap,
  Headphones,
  Watch,
  Monitor,
  Heart,
  ArrowUp,
  Send,
  Shield,
  Truck,
  CreditCard,
  Award,
  Star,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false);

  // Detectar scroll para mostrar botón "Volver arriba"
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para volver arriba
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Manejar suscripción al newsletter
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsNewsletterSubmitted(true);
      setEmail('');
      setTimeout(() => setIsNewsletterSubmitted(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  // Enlaces de navegación organizados
  const footerLinks = {
    products: [
      { href: '/products/electronics', label: 'Electronics', icon: Smartphone },
      { href: '/products/smart-home', label: 'Smart Home', icon: Zap },
      { href: '/products/audio', label: 'Audio', icon: Headphones },
      { href: '/products/wearables', label: 'Wearables', icon: Watch },
      { href: '/products/displays', label: 'Displays', icon: Monitor },
    ],
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/careers', label: 'Careers' },
      { href: '/blog', label: 'Blog' },
      { href: '/press', label: 'Press' },
      { href: '/investors', label: 'Investors' },
    ],
    support: [
      { href: '/support', label: 'Help Center' },
      { href: '/contact', label: 'Contact Us' },
      { href: '/shipping', label: 'Shipping Info' },
      { href: '/returns', label: 'Returns' },
      { href: '/warranty', label: 'Warranty' },
    ],
    legal: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-service', label: 'Terms of Service' },
      { href: '/cookies', label: 'Cookie Policy' },
      { href: '/accessibility', label: 'Accessibility' },
    ]
  };

  const socialLinks = [
    { href: '#', icon: Facebook, label: 'Facebook', color: 'hover:text-blue-500' },
    { href: '#', icon: Twitter, label: 'Twitter/X', color: 'hover:text-sky-400' },
    { href: '#', icon: Instagram, label: 'Instagram', color: 'hover:text-pink-500' },
    { href: '#', icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-600' },
    { href: '#', icon: Youtube, label: 'YouTube', color: 'hover:text-red-500' },
  ];

  const features = [
    { icon: Shield, title: 'Secure Shopping', description: '256-bit SSL encryption' },
    { icon: Truck, title: 'Free Shipping', description: 'On orders over $99' },
    { icon: CreditCard, title: 'Easy Returns', description: '30-day return policy' },
    { icon: Award, title: 'Warranty', description: '2-year manufacturer warranty' },
  ];

  return (
    <>
      {/* MAIN FOOTER */}
      <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden">
        {/* Efectos de fondo del footer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.1),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Features Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="flex flex-col items-center text-center group cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
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

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center group mb-6">
                <div className="relative">
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
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                    Houzze Tec
                  </span>
                  <div className="text-sm text-gray-400 font-medium tracking-wider">
                    TECH INNOVATION
                  </div>
                </div>
              </Link>

              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
               Houzze Tec brings the coolest in tech right to your hands. From high-performance headphones to the latest smartphones, we deliver cutting-edge gadgets that fuse style, innovation, and power — made to elevate your lifestyle and keep you ahead of the curve.
              </p>

              {/* Contact Info */}
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
                  <span>Cra47 # 52-86 Medellín, Ant.</span>
                </div>
              </div>
            </div>

           {/* Products Links */}
<div>
  <h3 className="text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
    Products
  </h3>
  <ul className="space-y-3">
    {footerLinks.products.map((link) => (
      <li key={link.label}>
        <div
          className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-all duration-300 group cursor-pointer"
        >
          {link.icon && <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />}
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            {link.label}
          </span>
        </div>
      </li>
    ))}
  </ul>
</div>


            {/* Company Links */}
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

            {/* Support Links */}
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

          {/* Social Media & Legal */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              
              {/* Social Media */}
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm font-medium mr-2">Follow us:</span>
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className={`p-3 bg-gray-800 rounded-full ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-700 group`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  </Link>
                ))}
              </div>

              {/* Copyright */}
              <div className="text-center lg:text-right">
                <p className="text-gray-400 text-sm mb-2">
                  &copy; {currentYear} Houzze Tec. All rights reserved.
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

            {/* Made with Love */}
            <div className="text-center mt-6 pt-6 border-t border-gray-800">
              <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" /> by the Houzze Tec Team
                <Globe className="h-4 w-4 text-blue-400 animate-spin-slow" />
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <div className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
        showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
      }`}>
        <Button
          onClick={scrollToTop}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
        </Button>
      </div>
    </>
  );
}