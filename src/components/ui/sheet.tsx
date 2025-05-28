import * as React from "react";

type SheetProps = {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Puedes agregar otras props como side ("left", "right") o tamaño si quieres
};

type AsChildProps = {
  asChild?: boolean;
  children: React.ReactElement;
};

/**
 * Componente que controla el estado y estructura del Sheet (panel lateral).
 * Recibe open y onOpenChange para controlar apertura y cierre.
 */
export function Sheet({ children, open, onOpenChange }: SheetProps) {
  // Maneja escape para cerrar el sheet
  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    }
    if (open) {
      window.addEventListener("keydown", onKeyDown);
    } else {
      window.removeEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  // Renderiza el contenido solo si está abierto
  return (
    <>
      {open && (
        <>
          {/* Fondo semitransparente */}
          <div
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/50 z-40"
            aria-hidden="true"
          />
          {/* Aquí rendereamos el contenido */}
          {children}
        </>
      )}
    </>
  );
}

/**
 * SheetTrigger puede renderizar un wrapper botón o pasar sus props al hijo si asChild=true
 */
export function SheetTrigger({ asChild = false, children }: AsChildProps) {
  if (asChild) {
    // Clona el hijo tal cual para no agregar wrappers extra
    return React.cloneElement(children);
  }
  return (
    <button>
      {children}
    </button>
  );
}

/**
 * SheetClose igual puede pasar el onClick para cerrar al hijo si asChild=true
 */
export function SheetClose({
  asChild = false,
  children,
  onClose,
}: AsChildProps & { onClose?: () => void }) {
  if (asChild) {
    return React.cloneElement(children, {
      onClick: (event: React.MouseEvent) => {
        if (children.props.onClick) children.props.onClick(event);
        onClose?.();
      },
    });
  }
  return <button onClick={onClose}>{children}</button>;
}

/**
 * Contenedor del contenido del Sheet, aquí puedes agregar estilos para animación y posición.
 */
export function SheetContent({
  children,
  side = "right",
  className = "",
}: {
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
}) {
  const baseClasses =
    "fixed top-0 bottom-0 w-72 bg-white shadow-lg z-50 flex flex-col";

  const sideClass = side === "right" ? "right-0" : "left-0";

  return (
    <div className={`${baseClasses} ${sideClass} ${className}`}>
      {children}
    </div>
  );
}
