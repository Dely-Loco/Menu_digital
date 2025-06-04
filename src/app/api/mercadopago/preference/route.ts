// src/app/api/mercadopago/preference/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

interface ItemData {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
}

interface PayerData {
  name?: string;
  surname?: string;
  email?: string;
  phone?: {
    area_code?: string;
    number?: string;
  };
  identification?: {
    type?: string;
    number?: string;
  };
  address?: {
    street_name?: string;
    street_number?: string;
    zip_code?: string;
  };
}

interface RequestBody {
  items: ItemData[];
  payer?: PayerData;
  back_urls?: {
    success?: string;
    failure?: string;
    pending?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json({ error: 'Access token no configurado' }, { status: 500 });
    }

    const { items, payer, back_urls }: RequestBody = await request.json();

    if (!items?.length) {
      return NextResponse.json({ error: 'Items requeridos' }, { status: 400 });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const result = await preference.create({
      body: {
        items: items.map(item => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price,
          currency_id: 'COP',
        })),
        payer,
        back_urls: {
          success: back_urls?.success || `${baseUrl}/checkout/success`,
          failure: back_urls?.failure || `${baseUrl}/checkout/failure`,
          pending: back_urls?.pending || `${baseUrl}/checkout/pending`,
        },
        auto_return: 'approved' as const,
        external_reference: `order_${Date.now()}`,
      }
    });

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error interno' },
      { status: 500 }
    );
  }
}