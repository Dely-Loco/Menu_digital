// src/app/contact/page.tsx
"use client";

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Asumo que tienes Label o lo importas
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Importa Accordion
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Importa CardDescription
import { Mail, Phone, MapPin } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast'; // Importa toast para notificaciones si quieres mantenerlo aquí

// Preguntas frecuentes (las mismas que tenías en SupportPage)
const faqs = [
  {
    question: "¿Cuáles son sus opciones de envío?",
    answer: "Ofrecemos envío estándar (3-5 días hábiles) y exprés (1-2 días hábiles). Los costos varían según la ubicación y el tamaño del pedido. Actualmente solo enviamos dentro de Colombia." // Ajustado
  },
  {
    question: "¿Cuál es su política de devoluciones?",
    answer: "Puede devolver la mayoría de los artículos nuevos y sin abrir dentro de los 30 días posteriores a la entrega para un reembolso completo. También cubrimos los costos de envío si el error fue nuestro."
  },
  {
    question: "¿Cómo puedo rastrear mi pedido?",
    answer: "Una vez que su pedido sea enviado, recibirá un correo electrónico con el número de seguimiento y un enlace al sitio web del transportista."
  },
  // Puedes añadir más FAQs relevantes para Houzze Tec
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
      const response = await fetch('/api/contact', { // Llama a tu ruta API funcional
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
      toast.success(result.message || '¡Mensaje enviado con éxito!'); // Usar toast aquí también
      setTimeout(() => setSubmitStatus(null), 7000); 
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error inesperado.";
      setSubmitStatus({ success: false, message: errorMessage });
      toast.error(errorMessage); // Mostrar error con toast
      console.error("Error al enviar formulario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="bottom-right" reverseOrder={false} /> {/* Toaster para notificaciones */}
      <main className="container mx-auto px-4 py-12 md:py-16">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Contáctanos y <span className="text-gradient-houzze">Preguntas Frecuentes</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Tienes preguntas o necesitas ayuda? Estamos aquí para ayudarte.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Columna del Formulario de Contacto */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Envíanos un Mensaje</CardTitle>
              <CardDescription>Completa el formulario y te responderemos pronto.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campos del formulario como los tenías, asegurándote de usar tus componentes UI */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</Label>
                        <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} className="w-full"/>
                    </div>
                    <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</Label>
                        <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} className="w-full"/>
                    </div>
                </div>
                <div>
                    <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Asunto</Label>
                    <Input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} required disabled={isSubmitting} className="w-full"/>
                </div>
                <div>
                    <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Tu Mensaje</Label>
                    <Textarea name="message" id="message" rows={5} value={formData.message} onChange={handleChange} required disabled={isSubmitting} className="w-full"/>
                </div>
                <div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-md hover:shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </Button>
                </div>
                {submitStatus && (
                  <p className={`text-center font-medium mt-4 ${submitStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                    {submitStatus.message}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Columna con información de contacto y FAQs */}
          <div className="space-y-8">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground/90">
                {/* Info de contacto como la tenías */}
                <a href="tel:+573246789589" className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors group">
                    <Phone className="h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
                    <span>+57 (324) 678-9589</span>
                </a>
                <a href="mailto:houzzesoluciones@gmail.com" className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors group">
                    <Mail className="h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
                    <span>houzzesoluciones@gmail.com</span>
                </a>
                <div className="flex items-start gap-3 text-gray-700">
                    <MapPin className="h-5 w-5 text-orange-500 mt-1 shrink-0" />
                    <span>Cra 47 # 52-86 Medellín, Antioquia, Colombia</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Preguntas Frecuentes</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem value={`faq-${index}`} key={index}>
                      <AccordionTrigger className="text-left hover:text-orange-600">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-foreground/80">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}