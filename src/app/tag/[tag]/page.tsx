import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

// ✅ Usando exactamente el mismo patrón que products/[id]/page.tsx
interface TagPageParams {
  params: Promise<{
    tag: string;
  }>;
}

// ✅ CORREGIDO: await params (mismo patrón que productos)
export default async function TagPage({ params }: TagPageParams) {
  const resolvedParams = await params; // <- Await params primero
  const tag = decodeURIComponent(resolvedParams.tag);

  const productos = await prisma.producto.findMany({
    where: {
      etiquetas: {
        has: tag,
      },
    },
    orderBy: {
      creadoEn: "desc",
    },
  });

  if (!productos || productos.length === 0) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Productos con la etiqueta: #{tag}</h1>
      <ul className="space-y-4">
        {productos.map((producto) => (
          <li key={producto.id}>
            <Link href={`/products/${producto.slug}`} className="text-blue-600 underline">
              {producto.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ✅ OPCIONAL: generateMetadata siguiendo el mismo patrón
export async function generateMetadata({ params }: TagPageParams) {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);

  return {
    title: `Productos con etiqueta: ${tag} | Houzze Tec`,
    description: `Encuentra todos los productos relacionados con ${tag}`,
  };
}