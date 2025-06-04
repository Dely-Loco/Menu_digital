// src/hooks/useMercadoPago.ts
import { useState, useCallback } from 'react';

interface MercadoPagoItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
}

interface MercadoPagoPayer {
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

interface MercadoPagoPreference {
  items: MercadoPagoItem[];
  payer?: MercadoPagoPayer;
  back_urls?: {
    success?: string;
    failure?: string;
    pending?: string;
  };
}

interface PreferenceResponse {
  id: string;
  init_point: string;
  sandbox_init_point?: string;
}

export const useMercadoPago = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPreference = useCallback(async (preferenceData: MercadoPagoPreference): Promise<PreferenceResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/mercadopago/preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferenceData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Error ${response.status}`);
      }

      if (!result.id || !result.init_point) {
        throw new Error('Respuesta inválida del servidor');
      }

      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    createPreference,
    isLoading,
    error,
    clearError,
  };
};