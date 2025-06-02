// src/app/checkout/page.tsx
"use client";

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';     // <--- IMPORTA LABEL
import { Textarea } from '@/components/ui/textarea'; // <--- IMPORTA TEXTAREA
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';

const formatCurrencyCOP = (value?: number): string => {
  if (typeof value !== 'number') return '$0';
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export default function CheckoutPage() {
  const { items: cartItems, itemCount, total: cartTotal, } = useCart(); // <--- USA 'total' y renómbralo a cartTotal
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    nombreCompleto: '',
    direccion: '',
    ciudad: '',
    departamento: '',
    codigoPostal: '',
    telefono: '',
    notasAdicionales: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<typeof formData>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false); // Para evitar problemas de hidratación

  useEffect(() => {
    setMounted(true);
    if (itemCount === 0 && mounted) { // Solo redirigir si ya está montado y el carrito está vacío
      router.replace('/cart');
    }
  }, [itemCount, router, mounted]); // Añadir mounted a las dependencias

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<typeof formData> = {};
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Correo electrónico inválido.";
    if (!formData.nombreCompleto.trim()) errors.nombreCompleto = "Nombre completo es requerido.";
    if (!formData.direccion.trim()) errors.direccion = "Dirección es requerida.";
    if (!formData.ciudad.trim()) errors.ciudad = "Ciudad es requerida.";
    if (!formData.departamento.trim()) errors.departamento = "Departamento/Provincia es requerido.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Errores de validación:", formErrors);
      return;
    }
    setIsProcessing(true);
    console.log("Datos del Checkout:", { cartItems, customerInfo: formData, total: cartTotal });
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert("Simulación: Redirigiendo a Mercado Pago...");
    setIsProcessing(false);
  };

  if (!mounted) { // Mostrar loader mientras se espera la hidratación
      return (
          <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
              <p className="text-xl text-muted-foreground animate-pulse">Cargando checkout...</p>
          </div>
      );
  }
  
  if (itemCount === 0) { // Si después de montar, el carrito está vacío, muestra mensaje
      return (
          <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] text-center">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <p className="text-xl text-muted-foreground">Tu carrito está vacío para finalizar la compra.</p>
              <Button asChild variant="link" className="mt-4 text-orange-600">
                  <Link href="/products">Ir a comprar</Link>
              </Button>
          </div>
      );
  }

  const shippingCost = cartTotal > 0 ? 10000 : 0;
  const orderTotalWithShipping = cartTotal + shippingCost;

  return (
    // Tu JSX para CheckoutPage (el que te di antes está bien, asegúrate de que usa 'cartTotal')
    // Lo incluyo de nuevo para completitud:
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12 md:py-16">
        <header className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Finalizar Compra
          </h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
            <div className="lg:col-span-2 space-y-8">
              <Card className="shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Información de Contacto</CardTitle>
                  <CardDescription>Usaremos este correo para enviarte la confirmación del pedido.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input type="email" name="email" id="email" placeholder="tu@correo.com" value={formData.email} onChange={handleChange} required className="mt-1"/>
                    {formErrors.email && <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>}
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg rounded-xl">
                <CardHeader><CardTitle className="text-xl font-semibold">Dirección de Envío</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="nombreCompleto">Nombre Completo</Label>
                    <Input type="text" name="nombreCompleto" id="nombreCompleto" placeholder="Nombre y Apellidos" value={formData.nombreCompleto} onChange={handleChange} required className="mt-1"/>
                    {formErrors.nombreCompleto && <p className="text-sm text-red-600 mt-1">{formErrors.nombreCompleto}</p>}
                  </div>
                  <div>
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input type="text" name="direccion" id="direccion" placeholder="Calle, Número, Apartamento, Barrio" value={formData.direccion} onChange={handleChange} required className="mt-1"/>
                    {formErrors.direccion && <p className="text-sm text-red-600 mt-1">{formErrors.direccion}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><Label htmlFor="ciudad">Ciudad</Label><Input type="text" name="ciudad" id="ciudad" placeholder="Ej: Medellín" value={formData.ciudad} onChange={handleChange} required className="mt-1"/>{formErrors.ciudad && <p className="text-sm text-red-600 mt-1">{formErrors.ciudad}</p>}</div>
                    <div><Label htmlFor="departamento">Departamento/Provincia</Label><Input type="text" name="departamento" id="departamento" placeholder="Ej: Antioquia" value={formData.departamento} onChange={handleChange} required className="mt-1"/>{formErrors.departamento && <p className="text-sm text-red-600 mt-1">{formErrors.departamento}</p>}</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><Label htmlFor="codigoPostal">Código Postal (Opcional)</Label><Input type="text" name="codigoPostal" id="codigoPostal" placeholder="Ej: 050001" value={formData.codigoPostal} onChange={handleChange} className="mt-1"/></div>
                    <div><Label htmlFor="telefono">Teléfono (Opcional)</Label><Input type="tel" name="telefono" id="telefono" placeholder="Tu número de teléfono" value={formData.telefono} onChange={handleChange} className="mt-1"/></div>
                  </div>
                  <div><Label htmlFor="notasAdicionales">Notas Adicionales (Opcional)</Label><Textarea name="notasAdicionales" id="notasAdicionales" placeholder="Instrucciones especiales..." value={formData.notasAdicionales} onChange={handleChange} className="mt-1" rows={3}/></div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card className="shadow-lg rounded-xl sticky top-24">
                <CardHeader><CardTitle className="text-xl font-semibold">Resumen de tu Pedido</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id + (item.selectedColor || '')} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2"><Image src={item.images[0]?.url || '/placeholder-product.jpg'} alt={item.name} width={40} height={40} className="rounded object-contain"/><div><p className="font-medium line-clamp-1">{item.name} <span className="text-xs"> (x{item.quantity})</span></p>{item.selectedColor && <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>}</div></div>
                      <p className="font-medium">{formatCurrencyCOP(item.price * item.quantity)}</p>
                    </div>
                  ))}
                  <Separator className="my-3"/><div className="flex justify-between text-sm"><p>Subtotal:</p><p className="font-medium">{formatCurrencyCOP(cartTotal)}</p></div>
                  <div className="flex justify-between text-sm"><p>Envío:</p><p className="font-medium">{formatCurrencyCOP(shippingCost)}</p></div>
                  <Separator className="my-3"/><div className="flex justify-between text-lg font-bold"><p>Total a Pagar:</p><p>{formatCurrencyCOP(orderTotalWithShipping)}</p></div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-white font-semibold text-lg py-3 shadow-lg" disabled={isProcessing}>
                    {isProcessing ? 'Procesando...' : 'Continuar al Pago (Simulación)'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}