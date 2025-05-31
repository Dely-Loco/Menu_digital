// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializa Resend con tu clave API desde las variables de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

// Dirección de correo a la que llegarán los mensajes del formulario
const TO_EMAIL = 'houzzesoluciones@gmail.com'; // Tu correo
// Dirección desde la que se enviarán los correos.
// Para probar sin verificar un dominio, Resend permite usar onboarding@resend.dev
// A largo plazo, deberías usar un correo con tu propio dominio verificado en Resend.
const FROM_EMAIL = 'Houzze Tec Contacto <onboarding@resend.dev>'; 

export async function POST(request: Request) {
  try {
    // Obtener los datos del cuerpo de la petición
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validación simple de los datos (puedes expandirla)
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Todos los campos son requeridos.' }, { status: 400 });
    }

    // Construir el contenido del correo
    const emailHtml = `
      <h1>Nuevo Mensaje del Formulario de Contacto de Houzze Tec</h1>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email del remitente:</strong> ${email}</p>
      <p><strong>Asunto:</strong> ${subject}</p>
      <hr>
      <p><strong>Mensaje:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p> // Reemplaza saltos de línea por <br> para HTML
    `;

    // Enviar el correo usando Resend
    const { data, error: sendError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL], // Resend espera un array de strings para 'to'
      replyTo: email, // Para que puedas responder directamente al remitente
      subject: `Nuevo Contacto Houzze Tec: ${subject}`,
      html: emailHtml,
    });

    if (sendError) {
      console.error('Error al enviar el correo con Resend:', sendError);
      return NextResponse.json({ error: 'Error al enviar el mensaje.', details: sendError }, { status: 500 });
    }

    console.log('Correo enviado exitosamente:', data);
    return NextResponse.json({ success: true, message: 'Mensaje enviado con éxito.', emailId: data?.id });

  } catch (error) {
    console.error('Error en la ruta API de contacto:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido en el servidor.';
    return NextResponse.json({ error: 'Error interno del servidor.', details: errorMessage }, { status: 500 });
  }
}