// src/app/contact/page.tsx
"use client";

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, Phone, MapPin, Clock, Navigation, 
  MessageCircle, Heart, Utensils, Star 
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

// Preguntas frecuentes específicas para Dely Loco
const faqs = [
  {
    question: "¿Hacen domicilios?",
    answer: "¡Sí! Realizamos domicilios en la Comuna 13 y sectores cercanos. Puedes contactarnos por WhatsApp al +57 301 405 6704 para hacer tu pedido. Los tiempos de entrega varían según la ubicación."
  },
  {
    question: "¿Cuáles son sus horarios de atención?",
    answer: "Estamos abiertos de lunes a domingo de 12:00 PM a 8:00 PM. Te recomendamos llamar antes de venir para confirmar disponibilidad de platos."
  },
  {
    question: "¿Manejan opciones vegetarianas?",
    answer: "Sí, tenemos varias opciones vegetarianas en nuestro menú. También podemos adaptar algunos platos según tus preferencias alimentarias. Consulta con nuestro personal."
  },
  {
    question: "¿Aceptan reservas?",
    answer: "Manejamos reservas para grupos grandes. Para mesas pequeñas (2-4 personas) generalmente no es necesario reservar, pero puedes llamarnos para confirmar disponibilidad."
  },
  {
    question: "¿Cómo llego al restaurante?",
    answer: "Estamos ubicados en la Comuna 13 de Medellín. Puedes llegar en metro hasta la estación San Javier y tomar transporte público local. También puedes usar la ubicación en Google Maps que compartimos."
  },
  {
    question: "¿Tienen opciones para niños?",
    answer: "¡Por supuesto! Somos un restaurante familiar y tenemos platos que a los niños les encantan. También ofrecemos porciones más pequeñas para los más pequeños."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || result.message || `Error del servidor: ${response.status}`);
      }
      setSubmitStatus({ success: true, message: result.message || '¡Gracias! Tu mensaje ha sido enviado.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast.success(result.message || '¡Mensaje enviado con éxito!');
      setTimeout(() => setSubmitStatus(null), 7000); 
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error inesperado.";
      setSubmitStatus({ success: false, message: errorMessage });
      toast.error(errorMessage);
      console.error("Error al enviar formulario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 to-red-50/50">
      <Toaster position="bottom-right" reverseOrder={false} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-red-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-orange-300/20 rounded-full blur-2xl"></div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-6 text-lg px-6 py-2">
              <Heart className="w-5 h-5 mr-2" />
              Estamos Aquí Para Ti
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
              Visítanos en
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-200">
                Comuna 13
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Te esperamos con los brazos abiertos en el corazón de la Comuna 13. 
              <span className="text-yellow-300 font-bold"> ¡Ven y vive la experiencia Dely Loco!</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+573014056704"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Llamar Ahora
              </a>
              <a 
                href="https://maps.app.goo.gl/b1r8YTo3QYDoUR8ZA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Navigation className="w-5 h-5" />
                Cómo Llegar
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16 md:py-20">
        
        {/* Mapa e Información de Ubicación */}
        <section className="mb-16 md:mb-20">
          <div className="text-center mb-12">
            <Badge className="bg-orange-100 text-orange-700 mb-6 text-lg px-6 py-2">
              <MapPin className="w-5 h-5 mr-2" />
              Nuestra Ubicación
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Encuéntranos en la <span className="text-orange-600">Comuna 13</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos ubicados en el corazón de uno de los barrios más vibrantes y culturales de Medellín
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Mapa */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden shadow-2xl border-0">
                <div className="aspect-[16/10] relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.6647662644!2d-75.6157!3d6.2674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4429f17c3e7c35%3A0x6b7d7f8e9c1a2b3c!2sComuna%2013%2C%20Medell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1625097600000!5m2!1ses!2sco"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>
                <CardContent className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Dely Loco Restaurante</h3>
                      <p className="opacity-90">Comuna 13, Medellín - Antioquia</p>
                    </div>
                    <a 
                      href="https://maps.app.goo.gl/b1r8YTo3QYDoUR8ZA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
                    >
                      <Navigation className="w-6 h-6" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Información de contacto */}
            <div className="space-y-6">
              <Card className="shadow-xl border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
                  <div className="space-y-4">
                    <a 
                      href="tel:+573014056704" 
                      className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors group p-3 rounded-lg hover:bg-orange-50"
                    >
                      <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-200 transition-colors">
                        <Phone className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold">+57 301 405 6704</p>
                        <p className="text-sm text-gray-500">Llamadas y WhatsApp</p>
                      </div>
                    </a>
                    
                    <a 
                      href="mailto:delylococomuna13@gmail.com" 
                      className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors group p-3 rounded-lg hover:bg-orange-50"
                    >
                      <div className="bg-orange-100 p-2 rounded-full group-hover:bg-orange-200 transition-colors">
                        <Mail className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold">delylococomuna13@gmail.com</p>
                        <p className="text-sm text-gray-500">Correo electrónico</p>
                      </div>
                    </a>
                    
                    <div className="flex items-center gap-3 text-gray-700 p-3 rounded-lg bg-blue-50">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Comuna 13, Medellín</p>
                        <p className="text-sm text-gray-500">Antioquia, Colombia</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-700 p-3 rounded-lg bg-purple-50">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Clock className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Lun - Dom</p>
                        <p className="text-sm text-gray-500">12:00 PM - 8:00 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardContent className="p-6 text-center">
                  <Utensils className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <h3 className="text-xl font-bold mb-3">¿Hambre? ¡Pide Ya!</h3>
                  <p className="mb-4 opacity-90">Haz tu pedido por WhatsApp y lo preparamos para ti</p>
                  <a 
                    href="https://wa.me/573014056704"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Formulario de Contacto */}
          <Card className="shadow-2xl border-0">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl text-gray-900">Envíanos un Mensaje</CardTitle>
              <CardDescription className="text-lg">
                ¿Tienes alguna pregunta o sugerencia? Nos encantaría escucharte
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre Completo
                    </Label>
                    <Input 
                      type="text" 
                      name="name" 
                      id="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      disabled={isSubmitting} 
                      className="w-full h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Correo Electrónico
                    </Label>
                    <Input 
                      type="email" 
                      name="email" 
                      id="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      disabled={isSubmitting} 
                      className="w-full h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Asunto
                  </Label>
                  <Input 
                    type="text" 
                    name="subject" 
                    id="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    required 
                    disabled={isSubmitting} 
                    className="w-full h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="¿De qué quieres hablarnos?"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Tu Mensaje
                  </Label>
                  <Textarea 
                    name="message" 
                    id="message" 
                    rows={5} 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    disabled={isSubmitting} 
                    className="w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Cuéntanos tu consulta, sugerencia o comentario..."
                  />
                </div>
                <div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </Button>
                </div>
                {submitStatus && (
                  <div className={`text-center font-medium p-4 rounded-lg ${
                    submitStatus.success 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Preguntas Frecuentes */}
          <div className="space-y-8">
            <Card className="shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="text-3xl text-gray-900 flex items-center gap-3">
                  <Star className="w-8 h-8 text-orange-500" />
                  Preguntas Frecuentes
                </CardTitle>
                <CardDescription className="text-lg">
                  Encuentra respuestas a las consultas más comunes sobre Dely Loco
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem value={`faq-${index}`} key={index} className="border-gray-200">
                      <AccordionTrigger className="text-left hover:text-orange-600 text-lg font-semibold py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 text-base leading-relaxed pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Información adicional */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-50 to-red-50">
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ¡Te Esperamos en Familia!
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  En Dely Loco cada cliente es parte de nuestra familia. 
                  Ven y disfruta de la auténtica hospitalidad paisa en el corazón de la Comuna 13.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild className="bg-orange-600 hover:bg-orange-700">
                    <Link href="/menu">Ver Nuestro Menú</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                    <Link href="/about">Conoce Nuestra Historia</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}