// src/app/checkout/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useMercadoPago } from '@/hooks/useMercadoPago';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShoppingBag, CreditCard, User, MapPin, Mail, FileText, AlertCircle, Loader2 } from 'lucide-react';

const formatCurrencyCOP = (value?: number): string => {
  if (typeof value !== 'number') return '$0';
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

interface FormData {
  email: string;
  nombreCompleto: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  codigoPostal: string;
  telefono: string;
  identificacion: string;
  notasAdicionales: string;
}

export default function CheckoutPage() {
  const { items: cartItems, itemCount, total: cartTotal } = useCart();
  const { createPreference, isLoading, error } = useMercadoPago();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    nombreCompleto: '',
    direccion: '',
    ciudad: '',
    departamento: '',
    codigoPostal: '',
    telefono: '',
    identificacion: '',
    notasAdicionales: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (itemCount === 0 && mounted) {
      router.replace('/cart');
    }
  }, [itemCount, router, mounted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error específico cuando el usuario empiece a escribir
    if (formErrors[name as keyof FormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    
    // Validación de email
    if (!formData.email.trim()) {
      errors.email = "El correo electrónico es requerido.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Por favor ingresa un correo electrónico válido.";
    }
    
    // Validación de campos requeridos
    if (!formData.nombreCompleto.trim()) {
      errors.nombreCompleto = "El nombre completo es requerido.";
    }
    
    if (!formData.direccion.trim()) {
      errors.direccion = "La dirección es requerida.";
    }
    
    if (!formData.ciudad.trim()) {
      errors.ciudad = "La ciudad es requerida.";
    }
    
    if (!formData.departamento.trim()) {
      errors.departamento = "El departamento es requerido.";
    }
    
    if (!formData.identificacion.trim()) {
      errors.identificacion = "La identificación es requerida.";
    } else if (!/^\d+$/.test(formData.identificacion.trim())) {
      errors.identificacion = "La identificación debe contener solo números.";
    }

    // Validación de teléfono si se proporciona
    if (formData.telefono.trim() && !/^\d{10}$/.test(formData.telefono.replace(/\s+/g, ''))) {
      errors.telefono = "El teléfono debe tener 10 dígitos.";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleMercadoPagoPayment = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    
    try {
      // Separar nombre y apellido de forma más robusta
      const nameParts = formData.nombreCompleto.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || firstName;

      // Mapear productos del carrito a items de Mercado Pago
      const items = cartItems.map(item => ({
        id: item.id.toString(),
        title: `${item.name}${item.selectedColor ? ` - ${item.selectedColor}` : ''}`,
        quantity: item.quantity,
        unit_price: item.price,
      }));

      // Agregar costo de envío como item separado
      const shippingCost = cartTotal > 0 ? 20000 : 0;
      if (shippingCost > 0) {
        items.push({
          id: 'shipping',
          title: 'Costo de envío',
          quantity: 1,
          unit_price: shippingCost,
        });
      }

      const preferenceData = {
        items,
        payer: {
          name: firstName,
          surname: lastName,
          email: formData.email,
          phone: {
            area_code: '57',
            number: formData.telefono.replace(/\s+/g, '') || '',
          },
          identification: {
            type: 'CC',
            number: formData.identificacion,
          },
          address: {
            street_name: formData.direccion,
            street_number: '1',
            zip_code: formData.codigoPostal || '',
          },
        },
        back_urls: {
          success: `${window.location.origin}/checkout/success`,
          failure: `${window.location.origin}/checkout/failure`,
          pending: `${window.location.origin}/checkout/pending`,
        },
        auto_return: 'approved' as const,
      };

      const preference = await createPreference(preferenceData);
      
      // Redirigir a Mercado Pago
      if (preference.init_point) {
        window.location.href = preference.init_point;
      } else {
        throw new Error('No se pudo obtener el enlace de pago');
      }
      
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Loading state
  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-orange-500" />
          <p className="text-lg text-muted-foreground">Cargando checkout...</p>
        </div>
      </div>
    );
  }
  
  // Empty cart state
  if (itemCount === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] text-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <ShoppingBag className="mx-auto h-20 w-20 text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Carrito Vacío</h2>
          <p className="text-gray-600 mb-6">
            No tienes productos en tu carrito para finalizar la compra.
          </p>
          <Button asChild className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90">
            <Link href="/products">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Ir a Comprar
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const shippingCost = cartTotal > 0 ? 20000 : 0;
  const orderTotalWithShipping = cartTotal + shippingCost;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Finalizar Compra
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Completa tu información para procesar tu pedido de forma segura
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Formulario */}
          <div className="lg:col-span-2 space-y-6">
            {/* Error general */}
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Información de Contacto */}
            <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="h-5 w-5 text-orange-500" />
                  Información de Contacto
                </CardTitle>
                <CardDescription>
                  Te enviaremos la confirmación del pedido a este correo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Correo Electrónico *
                  </Label>
                  <Input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="ejemplo@correo.com" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className={`transition-all ${formErrors.email ? 'border-red-500 focus:border-red-500' : 'focus:border-orange-500'}`}
                  />
                  {formErrors.email && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Información Personal */}
            <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5 text-orange-500" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombreCompleto" className="text-sm font-medium">
                      Nombre Completo *
                    </Label>
                    <Input 
                      type="text" 
                      name="nombreCompleto" 
                      id="nombreCompleto" 
                      placeholder="Nombre y Apellidos" 
                      value={formData.nombreCompleto} 
                      onChange={handleChange} 
                      className={`transition-all ${formErrors.nombreCompleto ? 'border-red-500 focus:border-red-500' : 'focus:border-orange-500'}`}
                    />
                    {formErrors.nombreCompleto && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {formErrors.nombreCompleto}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="identificacion" className="text-sm font-medium">
                      Número de Identificación *
                    </Label>
                    <Input 
                      type="text" 
                      name="identificacion" 
                      id="identificacion" 
                      placeholder="Cédula de ciudadanía" 
                      value={formData.identificacion} 
                      onChange={handleChange} 
                      className={`transition-all ${formErrors.identificacion ? 'border-red-500 focus:border-red-500' : 'focus:border-orange-500'}`}
                    />
                    {formErrors.identificacion && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {formErrors.identificacion}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono" className="text-sm font-medium">
                    Teléfono
                    <span className="text-gray-400 ml-1">(Opcional)</span>
                  </Label>
                  <Input 
                    type="tel" 
                    name="telefono" 
                    id="telefono" 
                    placeholder="3001234567" 
                    value={formData.telefono} 
                    onChange={handleChange} 
                    className={`transition-all ${formErrors.telefono ? 'border-red-500 focus:border-red-500' : 'focus:border-orange-500'}`}
                  />
                  {formErrors.telefono && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {formErrors.telefono}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Dirección de Envío */}
            <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-orange-500" />
                  Dirección de Envío
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="direccion" className="text-sm font-medium">
                    Dirección Completa *
                  </Label>
                  <Input 
                    type="text" 
                    name="direccion" 
                    id="direccion" 
                    placeholder="Calle 123 #45-67, Apto 890, Barrio Ejemplo" 
                    value={formData.direccion} 
                    onChange={handleChange} 
                    className={`transition-all ${formErrors.direccion ? 'border-red-500 focus:border-red-500' : 'focus:border-orange-500'}`}
                  />
                  {formErrors.direccion && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {formErrors.direccion}
                    </p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ciudad" className="text-sm font-medium">
                      Ciudad *
                    </Label>
                    <Input 
                      type="text" 
                      name="ciudad" 
                      id="ciudad" 
                      placeholder="Medellín" 
                      value={formData.ciudad} 
                      onChange={handleChange} 
                      className={`transition-all ${formErrors.ciudad ? 'border-red-500 focus:border-red-500' : 'focus:border-orange-500'}`}
                    />
                    {formErrors.ciudad && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {formErrors.ciudad}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="departamento" className="text-sm font-medium">
                      Departamento *
                    </Label>
                    <Input 
                      type="text" 
                      name="departamento" 
                      id="departamento" 
                      placeholder="Antioquia" 
                      value={formData.departamento} 
                      onChange={handleChange} 
                      className={`transition-all ${formErrors.departamento ? 'border-red-500 focus:border-red-500' : 'focus:border-orange-500'}`}
                    />
                    {formErrors.departamento && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {formErrors.departamento}
                      </p>
                    )}
                  </div>
                </div>

              
                
                <div className="space-y-2">
                  <Label htmlFor="notasAdicionales" className="text-sm font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Notas Adicionales
                    <span className="text-gray-400">(Opcional)</span>
                  </Label>
                  <Textarea 
                    name="notasAdicionales" 
                    id="notasAdicionales" 
                    placeholder="Instrucciones especiales de entrega, referencias del lugar, etc..." 
                    value={formData.notasAdicionales} 
                    onChange={handleChange} 
                    className="focus:border-orange-500 transition-all resize-none" 
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumen del Pedido */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm sticky top-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">
                  Resumen del Pedido
                </CardTitle>
                <CardDescription>
                  Revisa tu orden antes de proceder al pago
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id + (item.selectedColor || '')} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                      <div className="relative">
                        <Image 
                          src={item.images[0]?.url || '/placeholder-product.jpg'} 
                          alt={item.name} 
                          width={48} 
                          height={48} 
                          className="rounded-lg object-cover"
                        />
                        <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-2 text-gray-900">
                          {item.name}
                        </p>
                        {item.selectedColor && (
                          <p className="text-xs text-gray-500 mt-1">
                            Color: {item.selectedColor}
                          </p>
                        )}
                      </div>
                      <p className="font-semibold text-sm text-gray-900">
                        {formatCurrencyCOP(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">{formatCurrencyCOP(cartTotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío:</span>
                    <span className="font-medium">{formatCurrencyCOP(shippingCost)}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-xl font-bold text-orange-600">
                    {formatCurrencyCOP(orderTotalWithShipping)}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter className="pt-4">
                <Button 
                  onClick={handleMercadoPagoPayment}
                  size="lg" 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]" 
                  disabled={isProcessing || isLoading}
                >
                  {isProcessing || isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Pagar con Mercado Pago
                    </>
                  )}
                </Button>
              </CardFooter>
              
              <div className="px-6 pb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                  <p className="text-xs text-blue-800 text-center leading-relaxed">
                    🔒 Pago 100% seguro con Mercado Pago. 
                    Serás redirigido para completar tu compra.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}