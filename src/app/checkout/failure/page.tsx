// src/app/checkout/failure/page.tsx
import dynamic from 'next/dynamic';

// Renderiza el componente solo del lado del cliente
const FailureContent = dynamic(() => import('./FailureContent'), { ssr: false });

export default function Page() {
  return <FailureContent />;
}
