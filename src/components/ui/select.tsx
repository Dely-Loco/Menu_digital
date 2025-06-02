// components/ui/select.tsx
"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

// ===== COMPONENTE RAÍZ =====
// Exporta directamente el componente raíz de Radix UI
// Este es el wrapper principal que maneja todo el estado del select
const Select = SelectPrimitive.Root;

// ===== AGRUPADOR DE OPCIONES =====
// Para agrupar opciones relacionadas con etiquetas
const SelectGroup = SelectPrimitive.Group;

// ===== VALOR SELECCIONADO =====
// Muestra el valor actual seleccionado o placeholder
const SelectValue = SelectPrimitive.Value;

// ===== TRIGGER/BOTÓN DEL SELECT =====
// El botón que abre/cierra el dropdown
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      // Estilos base del trigger
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm",
      // Estados de focus y hover
      "ring-offset-background placeholder:text-muted-foreground",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      // Estados disabled
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Mejora: Estados hover y active
      "hover:bg-accent hover:text-accent-foreground",
      "data-[state=open]:ring-2 data-[state=open]:ring-ring data-[state=open]:ring-offset-2",
      // Transiciones suaves
      "transition duration-200",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200 data-[state=open]:rotate-180" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// ===== CONTENIDO DEL DROPDOWN =====
// El contenedor que aparece cuando se abre el select
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        // Estilos base del contenido
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
        // Animaciones de entrada y salida
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        // Animaciones direccionales
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        // Posicionamiento popper
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        // Mejora: Sombra más elegante
        "shadow-lg backdrop-blur-sm",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

// ===== BOTONES DE SCROLL =====
// Nuevos: Botones para hacer scroll cuando hay muchas opciones
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      "bg-popover text-muted-foreground hover:text-foreground",
      "transition-colors duration-150",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      "bg-popover text-muted-foreground hover:text-foreground",
      "transition-colors duration-150",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

// ===== ETIQUETA DE GRUPO =====
// Para etiquetar grupos de opciones
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      // Estilos base
      "py-1.5 pl-8 pr-2 text-sm font-semibold",
      // Mejora: Mejor contraste y espaciado
      "text-muted-foreground uppercase tracking-wider text-xs",
      "border-b border-border/50 mb-1 pb-2",
      className
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

// ===== ITEM/OPCIÓN DEL SELECT =====
// Cada opción individual del dropdown
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      // Estilos base
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      // Estados hover y focus
      "focus:bg-accent focus:text-accent-foreground",
      // Estados disabled
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      // Mejoras: Estados hover y selected
      "hover:bg-accent/50 data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
      "transition-colors duration-150",
      // Mejora: Mejor feedback visual
      "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
      className
    )}
    {...props}
  >
    {/* Indicador de selección (checkmark) */}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-current" />
      </SelectPrimitive.ItemIndicator>
    </span>
    
    {/* Contenido del item */}
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

// ===== SEPARADOR =====
// Línea divisoria entre grupos de opciones
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(
      "-mx-1 my-1 h-px bg-muted",
      // Mejora: Mejor visibilidad del separador
      "bg-border opacity-60",
      className
    )}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// ===== COMPONENTE DE EJEMPLO AVANZADO =====
// Nuevo: Select con funcionalidades extras
interface SelectWithSearchProps {
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  options: Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const SelectWithSearch = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  SelectWithSearchProps
>(({ 
  placeholder = "Seleccionar opción...",
  searchPlaceholder = "Buscar...",
  emptyText = "No hay opciones disponibles",
  options,
  value,
  onValueChange,
  className,
  ...props
},) => {
  const [searchValue, setSearchValue] = React.useState("");
  
  // Filtrar opciones basado en búsqueda
  const filteredOptions = React.useMemo(() => {
    if (!searchValue) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
      option.description?.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, searchValue]);

  return (
    <Select value={value} onValueChange={onValueChange} {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {/* Campo de búsqueda */}
        <div className="p-2 border-b border-border">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-input rounded bg-background focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        
        {/* Opciones filtradas */}
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
              className="flex flex-col items-start"
            >
              <span className="font-medium">{option.label}</span>
              {option.description && (
                <span className="text-xs text-muted-foreground mt-0.5">
                  {option.description}
                </span>
              )}
            </SelectItem>
          ))
        ) : (
          <div className="py-6 text-center text-sm text-muted-foreground">
            {emptyText}
          </div>
        )}
      </SelectContent>
    </Select>
  );
});
SelectWithSearch.displayName = "SelectWithSearch";

// ===== EXPORTS =====
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectWithSearch,
};