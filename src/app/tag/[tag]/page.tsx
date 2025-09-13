import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TagPageParams {
  params: {
    tag: string;
  };
}

export default async function TagPage({ params }: TagPageParams) {
  const tag = decodeURIComponent(params.tag);

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
      <h1 className="text-3xl font-bold mb-6">
        Platos con la etiqueta: #{tag}
      </h1>
      <ul className="space-y-4">
        {platos.map((plato) => (
          <li key={plato.id}>
            <Link
              href={`/menu/${plato.slug}`}
              className="text-blue-600 underline"
            >
              {plato.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function generateMetadata({ params }: TagPageParams) {
  const tag = decodeURIComponent(params.tag);

  return {
    title: `Platos con etiqueta: ${tag} | Dely Loco`,
    description: `Encuentra todos los platos relacionados con ${tag}`,
  };
}
