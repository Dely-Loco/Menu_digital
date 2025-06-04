// src/app/api/mercadopago/preference/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export async function POST(request: NextRequest) {
  try {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!accessToken) {
      console.error('❌ MERCADOPAGO_ACCESS_TOKEN no está definido.');
      return NextResponse.json({ error: 'Token de acceso no configurado' }, { status: 500 });
    }

    if (!baseUrl) {
      console.error('❌ NEXT_PUBLIC_BASE_URL no está definido.');
      return NextResponse.json({ error: 'Base URL no configurada' }, { status: 500 });
    }

    const body = await request.json();

    const items = body.items as {
      id: string;
      title: string;
      quantity: number;
      unit_price: number;
    }[];

    if (!items?.length) {
      return NextResponse.json({ error: 'Items requeridos' }, { status: 400 });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price,
          currency_id: 'COP',
        })),
        payer: body.payer,
        back_urls: {
          success: `${baseUrl}/checkout/success`,
          failure: `${baseUrl}/checkout/failure`,
          pending: `${baseUrl}/checkout/pending`,
        },
        auto_return: 'approved',
        external_reference: `order_${Date.now()}`,
      },
    });

    console.log('✅ Preferencia creada:', result);

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });

  } catch (error) {
    console.error('🔥 Error al crear preferencia:', error);
    return NextResponse.json(
      { error: 'Error interno' },
      { status: 500 }
    );
  }
}
