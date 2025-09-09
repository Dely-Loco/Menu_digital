// src/app/about/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card,  } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, MapPin, Clock, Users, ChefHat, 
  Utensils, Star, Phone, Award 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Dely Loco - Auténticos Sabores de la Comuna 13',
  description: 'Conoce la historia de Dely Loco, restaurante familiar en la Comuna 13 de Medellín. Descubre nuestra pasión por la comida casera y los sabores auténticos.',
  keywords: 'Dely Loco, Comuna 13, historia, restaurante familiar, Medellín, comida casera, tradición',
  openGraph: {
    title: 'Sobre Nosotros | Dely Loco Comuna 13',
    description: 'La historia detrás del sabor auténtico de la Comuna 13',
    images: ['/Logo.png'],
    locale: 'es_CO',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 to-red-50/50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-red-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-orange-300/20 rounded-full blur-2xl"></div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-6 text-lg px-6 py-2">
              <Heart className="w-5 h-5 mr-2" />
              Nuestra Historia
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
              Conoce a
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-200">
                Dely Loco
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Más que un restaurante, somos una familia que comparte el amor por la 
              <span className="text-yellow-300 font-bold"> comida auténtica de la Comuna 13</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg px-8 py-3">
                <Link href="/menu">
                  <Utensils className="w-5 h-5 mr-2" />
                  Prueba Nuestros Platos
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold text-lg px-8 py-3">
                <Link href="/contact">
                  <MapPin className="w-5 h-5 mr-2" />
                  Visítanos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16 md:py-20">
        
        {/* Historia Principal */}
        <section className="mb-16 md:mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="bg-orange-100 text-orange-700 mb-6">
                <Award className="w-4 h-4 mr-2" />
                Desde el Corazón
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Nuestra <span className="text-orange-600">Historia</span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-orange-600">Dely Loco nació del amor por la cocina tradicional</strong> y 
                  el deseo de compartir los sabores auténticos que han pasado de generación en generación 
                  en la Comuna 13 de Medellín.
                </p>
                
                <p>
                  Somos una familia que decidió convertir nuestra pasión culinaria en un espacio donde 
                  cada plato cuenta una historia, donde cada ingrediente es seleccionado con cuidado 
                  y donde cada cliente se siente como en casa.
                </p>
                
                <p>
                  <strong className="text-orange-600">La Comuna 13 es nuestro hogar</strong>, y a través de nuestra comida, 
                  queremos mostrar la riqueza cultural, la calidez humana y la alegría que caracterizan 
                  a este maravilloso barrio de Medellín.
                </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-8 shadow-2xl">
                  <Image
                    src="/Logo.png"
                    alt="Logo Dely Loco"
                    width={400}
                    height={400}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute -top-6 -right-6 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg transform rotate-12">
                  ¡Sabor Auténtico!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="mb-16 md:mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Lo que nos <span className="text-orange-600">Motiva</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestros valores y propósito guían cada plato que preparamos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <Card className="p-8 md:p-10 bg-white shadow-xl rounded-3xl border-0 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Nuestra Misión</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed text-center">
                <strong className="text-orange-600">Preservar y compartir la tradición culinaria de la Comuna 13</strong>, 
                ofreciendo comida casera preparada con amor, ingredientes frescos y recetas familiares 
                que han pasado de generación en generación. Queremos que cada cliente sienta el calor 
                de nuestro hogar en cada bocado.
              </p>
            </Card>

            <Card className="p-8 md:p-10 bg-white shadow-xl rounded-3xl border-0 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Nuestra Visión</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed text-center">
                <strong className="text-orange-600">Ser el restaurante de referencia en la Comuna 13</strong>, 
                reconocido por mantener viva la esencia gastronómica del barrio, por nuestra calidad 
                excepcional y por crear un espacio donde las familias y amigos se reúnen a compartir 
                momentos especiales alrededor de la mesa.
              </p>
            </Card>
          </div>
        </section>

        {/* Por qué Elegirnos */}
        <section className="mb-16 md:mb-20">
          <div className="text-center mb-12">
            <Badge className="bg-purple-100 text-purple-700 mb-6 text-lg px-6 py-2">
              <ChefHat className="w-5 h-5 mr-2" />
              Nuestros Valores
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ¿Por qué elegir <span className="text-orange-600">Dely Loco?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-white shadow-lg rounded-2xl border-0 hover:shadow-xl transition-all duration-300 text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Recetas Familiares</h4>
              <p className="text-gray-600">
                Cada plato lleva el sazón tradicional transmitido de madres a hijas en la Comuna 13.
              </p>
            </Card>

            <Card className="p-6 bg-white shadow-lg rounded-2xl border-0 hover:shadow-xl transition-all duration-300 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Ingredientes Frescos</h4>
              <p className="text-gray-600">
                Seleccionamos cuidadosamente cada ingrediente para garantizar frescura y calidad.
              </p>
            </Card>

            <Card className="p-6 bg-white shadow-lg rounded-2xl border-0 hover:shadow-xl transition-all duration-300 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Ambiente Familiar</h4>
              <p className="text-gray-600">
                Un espacio acogedor donde cada cliente es tratado como parte de la familia.
              </p>
            </Card>

            <Card className="p-6 bg-white shadow-lg rounded-2xl border-0 hover:shadow-xl transition-all duration-300 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Identidad Local</h4>
              <p className="text-gray-600">
                Orgullosamente representamos la cultura y sabores únicos de la Comuna 13.
              </p>
            </Card>

            <Card className="p-6 bg-white shadow-lg rounded-2xl border-0 hover:shadow-xl transition-all duration-300 text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Servicio Cálido</h4>
              <p className="text-gray-600">
                Atención personalizada que refleja la hospitalidad paisana que nos caracteriza.
              </p>
            </Card>

            <Card className="p-6 bg-white shadow-lg rounded-2xl border-0 hover:shadow-xl transition-all duration-300 text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Precios Justos</h4>
              <p className="text-gray-600">
                Calidad excepcional a precios accesibles para toda la comunidad.
              </p>
            </Card>
          </div>
        </section>

        {/* Información de Contacto */}
        <section className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-white text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            ¡Ven y Vive la Experiencia Dely Loco!
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Ubicación</h3>
              <p className="opacity-90">Comuna 13, Medellín</p>
              <p className="opacity-90">Antioquia, Colombia</p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Horarios</h3>
              <p className="opacity-90">Lunes a Domingo</p>
              <p className="opacity-90">12:00 PM - 8:00 PM</p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Contacto</h3>
              <p className="opacity-90">+57 301 405 6704</p>
              <p className="opacity-90 text-sm">delylococomuna13@gmail.com</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg px-8 py-3">
              <Link href="/menu">
                <Utensils className="w-5 h-5 mr-2" />
                Explorar Nuestro Menú
              </Link>
            </Button>
            <a 
              href="tel:+573014056704"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              Hacer un Pedido
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}