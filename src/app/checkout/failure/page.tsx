// src/app/checkout/failure/page.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle } from 'lucide-react';

export default function FailurePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  // Función para obtener el mensaje según el status
  const getStatusMessage = (status: string | null) => {
    switch (status) {
      case 'rejected':
        return 'El pago fue rechazado por el banco.';
      case 'cancelled':
        return 'El pago fue cancelado.';
      case 'failure':
        return 'Hubo un error al procesar el pago.';
      default:
        return 'Tu pago no pudo ser procesado. Por favor intenta nuevamente.';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-600">Pago Rechazado</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            {getStatusMessage(status)}
          </p>
          
          {paymentId && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">ID de Pago:</p>
              <p className="font-mono text-sm">{paymentId}</p>
            </div>
          )}

          {status && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Estado:</p>
              <p className="font-mono text-sm capitalize">{status}</p>
            </div>
          )}
          
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
            <p className="text-sm text-yellow-800">
              Posibles causas:
            </p>
            <ul className="text-xs text-yellow-700 mt-1 list-disc list-inside">
              <li>Fondos insuficientes</li>
              <li>Datos incorrectos</li>
              <li>Problema con el banco</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <Button 
              onClick={() => router.push('/checkout')} 
              className="w-full"
            >
              Intentar Nuevamente
            </Button>
            <Button 
              onClick={() => router.push('/cart')} 
              variant="outline" 
              className="w-full"
            >
              Volver al Carrito
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}