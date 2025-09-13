import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

// Usando exactamente el mismo patrón que menu/[id]/page.tsx
interface TagPageParams {
  params: Promise<{
    tag: string;
  }>;
}

// CORREGIDO: await params (mismo patrón que platos)
export default async function TagPage({ params }: TagPageParams) {
  const resolvedParams = await params; // <- Await params primero
  const tag = decodeURIComponent(resolvedParams.tag);

  // Cambiado de 'producto' a 'plato' para coincidir con tu esquema
  const platos = await prisma.plato.findMany({
    where: {
      etiquetas: {
        has: tag,
      },
    },
    orderBy: {
      creadoEn: "desc",
    },
  });

  if (!platos || platos.length === 0) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Platos con la etiqueta: #{tag}</h1>
      <ul className="space-y-4">
        {platos.map((plato) => (
          <li key={plato.id}>
            <Link href={`/menu/${plato.slug}`} className="text-blue-600 underline">
              {plato.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// OPCIONAL: generateMetadata siguiendo el mismo patrón
export async function generateMetadata({ params }: TagPageParams) {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);

  return {
    title: `Platos con etiqueta: ${tag} | Dely Loco`,
    description: `Encuentra todos los platos relacionados con ${tag}`,
  };
}