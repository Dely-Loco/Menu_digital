// src/components/ui/input.tsx
import React from 'react';

// ✅ Cambiado de interface a type alias
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Componente Input personalizado.
 * Puedes extenderlo para agregar estilos, validaciones, etc.
 */
export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${props.className ?? ''}`}
    />
  );
}