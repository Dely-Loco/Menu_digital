// src/components/ui/card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

// Ya no necesitas definir 'CardProps' si no añade nada nuevo.
// En su lugar, el componente 'Card' usará React.HTMLAttributes<HTMLDivElement> directamente.

const Card = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement> // <--- Usa el tipo base directamente
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border bg-white dark:bg-zinc-950 p-4 shadow-sm transition-colors", // Tus estilos base
      className // Permite añadir más clases desde fuera
    )}
    {...props} // Pasa el resto de las props HTML (como children, onClick, etc.)
  />
));
Card.displayName = "Card";

// Los demás sub-componentes (CardHeader, CardTitle, etc.) ya están bien
// porque usan React.HTMLAttributes directamente o props específicas si las tuvieran.

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-2 space-y-1", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm text-zinc-700 dark:text-zinc-300", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-4", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };