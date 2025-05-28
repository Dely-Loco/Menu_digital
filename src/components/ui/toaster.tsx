// Este archivo define un componente Toaster que muestra notificaciones en la app
"use client"; // Esto es necesario para indicar que este componente se renderiza del lado del cliente

import { Toaster as SonnerToaster } from "sonner"; // Importamos el componente Toaster de la librería 'sonner'

export function Toaster() {
  return (
    <SonnerToaster 
      position="top-right" // Posición donde aparecerán los toast (puedes cambiarlo: "bottom-right", etc.)
      richColors // Permite colores llamativos para los toasts
      closeButton // Muestra un botón para cerrar los toasts
      expand={true} // Si hay varios toasts, los agrupa y los expande
    />
  );
}
