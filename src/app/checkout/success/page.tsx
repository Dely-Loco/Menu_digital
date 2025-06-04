'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { dispatch } = useCart();

  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const externalReference = searchParams.get('external_reference');

  useEffect(() => {
    if (status === 'approved') {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [status, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">¡Pago Exitoso!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">Tu pago ha sido procesado correctamente.</p>

          {paymentId && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">ID de Pago:</p>
              <p className="font-mono text-sm">{paymentId}</p>
            </div>
          )}

          {externalReference && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Referencia:</p>
              <p className="font-mono text-sm">{externalReference}</p>
            </div>
          )}

          <div className="space-y-2">
            <Button onClick={() => router.push('/products')} className="w-full">
              Seguir Comprando
            </Button>
            <Button onClick={() => router.push('/')} variant="outline" className="w-full">
              Ir al Inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
