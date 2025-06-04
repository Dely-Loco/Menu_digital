// src/app/api/mercadopago/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verificar que es una notificación de pago
    if (body.type === 'payment') {
      const payment = new Payment(client);
      const paymentInfo = await payment.get({ id: body.data.id });
      
      console.log('Payment notification received:', {
        id: paymentInfo.id,
        status: paymentInfo.status,
        external_reference: paymentInfo.external_reference,
        transaction_amount: paymentInfo.transaction_amount,
      });

      // Aquí puedes actualizar tu base de datos según el estado del pago
      switch (paymentInfo.status) {
        case 'approved':
          // Pago aprobado - actualizar orden como pagada
          console.log('Payment approved:', paymentInfo.id);
          break;
        case 'pending':
          // Pago pendiente
          console.log('Payment pending:', paymentInfo.id);
          break;
        case 'rejected':
          // Pago rechazado
          console.log('Payment rejected:', paymentInfo.id);
          break;
        default:
          console.log('Unknown payment status:', paymentInfo.status);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}