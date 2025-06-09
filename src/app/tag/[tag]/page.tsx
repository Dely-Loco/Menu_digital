import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ tag: string }>;
}

export default async function Page({ params }: Props) {
  // Await the params since they're now a Promise in Next.js 15
  const resolvedParams = await params;
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
            <Link href={`/products/${producto.id}`} className="text-blue-600 underline">
              {producto.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}