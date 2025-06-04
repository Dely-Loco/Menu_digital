// src/app/checkout/failure/page.tsx
import { Suspense } from 'react';
import FailureContent from './FailureContent';

export default function FailurePage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <FailureContent />
    </Suspense>
  );
}

