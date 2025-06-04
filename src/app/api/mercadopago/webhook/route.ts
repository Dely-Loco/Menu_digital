// src/app/api/mercadopago/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.type === 'payment') {
      const paymentId = body.data.id;

      if (!paymentId) {
        console.warn('Webhook recibido sin paymentId');
        return NextResponse.json({ received: true });
      }

      const payment = new Payment(client);

      try {
        const paymentInfo = await payment.get({ id: paymentId });

        console.log('✅ Payment recibido:', {
          id: paymentInfo.id,
          status: paymentInfo.status,
          external_reference: paymentInfo.external_reference,
        });

        // Aquí puedes actualizar tu orden según el estado
        switch (paymentInfo.status) {
          case 'approved':
            console.log('✔️ Pago aprobado');
            break;
          case 'pending':
            console.log('⌛ Pago pendiente');
            break;
          case 'rejected':
            console.log('❌ Pago rechazado');
            break;
          default:
            console.log('❓ Estado desconocido:', paymentInfo.status);
        }
      } catch (err) {
        console.error('❗ Error al obtener el pago desde Mercado Pago:', err);
        // No lances error, solo responde como recibido para que Mercado Pago no reintente indefinidamente
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❗ Webhook error general:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 200 });
  }
}
