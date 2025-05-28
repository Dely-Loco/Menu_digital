"use client";

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';

import toast, { Toaster } from 'react-hot-toast'; // Importa la librería para mostrar notificaciones

// Preguntas frecuentes para el acordeón
const faqs = [
  {
    question: "¿Cuáles son sus opciones de envío?",
    answer: "Ofrecemos envío estándar (3-5 días hábiles) y exprés (1-2 días hábiles). Los costos varían según la ubicación y el tamaño del pedido."
  },
  {
    question: "¿Cuál es su política de devoluciones?",
    answer: "Puede devolver la mayoría de los artículos nuevos y sin abrir dentro de los 30 días posteriores a la entrega para un reembolso completo. También cubrimos los costos de envío si el error fue nuestro."
  },
  {
    question: "¿Cómo puedo rastrear mi pedido?",
    answer: "Una vez que su pedido sea enviado, recibirá un correo electrónico con el número de seguimiento y un enlace al sitio web del transportista."
  },
  {
    question: "¿Realizan envíos internacionales?",
    answer: "Actualmente, solo enviamos dentro de [País/Región]. Estamos trabajando para ampliar nuestras opciones de envío en el futuro."
  }
];

export default function SupportPage() {
  
  // Función que maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Muestra un mensaje de éxito usando react-hot-toast
    toast.success("¡Mensaje enviado! Gracias por contactarnos. Te responderemos pronto. (Esto es una demo)");

    // Limpia el formulario después de enviar
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="space-y-12">
      {/* Componente Toaster para renderizar las notificaciones toast en pantalla */}
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Encabezado principal de la página */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">Soporte y Contacto</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          ¿Tienes preguntas o necesitas ayuda? Estamos aquí para ayudarte. Contáctanos o revisa nuestras preguntas frecuentes.
        </p>
      </div>

      {/* Contenedor principal dividido en dos columnas en pantallas medianas en adelante */}
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* Tarjeta con formulario de contacto */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Envíanos un mensaje</CardTitle>
            <CardDescription>Completa el siguiente formulario y te responderemos lo antes posible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campos de nombre y correo lado a lado */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input id="name" placeholder="Tu nombre" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" placeholder="tu@ejemplo.com" required />
                </div>
              </div>

              {/* Campo para el asunto del mensaje */}
              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input id="subject" placeholder="Ej. Consulta sobre un pedido" required />
              </div>

              {/* Área de texto para el mensaje */}
              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" placeholder="Escribe tu mensaje aquí..." rows={5} required />
              </div>

              {/* Botón para enviar el formulario */}
              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:opacity-90 text-primary-foreground">
                Enviar mensaje
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Columna con información de contacto y preguntas frecuentes */}
        <div className="space-y-8">
          
          {/* Tarjeta con información de contacto */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Información de contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90">
              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-1 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold">Envíanos un correo</h4>
                  <a href="mailto:support@houzzetec.com" className="hover:underline">support@houzzetec.com</a>
                </div>
              </div>
              {/* Teléfono */}
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-1 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold">Llámanos</h4>
                  <p>(555) TEC-SHOP (555-832-7467)</p>
                </div>
              </div>
              {/* Dirección física */}
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold">Nuestra oficina</h4>
                  <p>123 Innovation Drive, Tech City, TX 75001</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tarjeta con preguntas frecuentes en acordeón */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Preguntas frecuentes</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`faq-${index}`} key={index}>
                    {/* Pregunta */}
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    {/* Respuesta */}
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
    </div>
  );
}
