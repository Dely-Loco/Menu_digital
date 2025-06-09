import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: { tag: string };
}

export default async function Page({ params }: Props) {
  const tag = decodeURIComponent(params.tag);

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
            <Link href={`/products/${producto.id}`} className="text-blue-600 underline">
              {producto.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
