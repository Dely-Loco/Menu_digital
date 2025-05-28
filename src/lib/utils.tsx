// src/lib/utils.ts

// Función para concatenar clases condicionalmente
export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}
