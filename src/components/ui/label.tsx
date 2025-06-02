// src/components/ui/label.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

// Ya no necesitas definir 'LabelProps' si no añade nada nuevo.
// El componente 'Label' usará React.LabelHTMLAttributes<HTMLLabelElement> directamente.

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> // <--- Usa el tipo base de React directamente
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", // Tus estilos base
      className // Permite añadir más clases desde fuera
    )}
    {...props} // Pasa el resto de las props HTML (como children, htmlFor, onClick, etc.)
  />
));
Label.displayName = "Label";

export { Label };