/*
  Warnings:

  - You are about to drop the `Categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImagenProducto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Producto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImagenProducto" DROP CONSTRAINT "ImagenProducto_productoId_fkey";

-- DropForeignKey
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_categoriaId_fkey";

-- DropTable
DROP TABLE "Categoria";

-- DropTable
DROP TABLE "ImagenProducto";

-- DropTable
DROP TABLE "Producto";

-- CreateTable
CREATE TABLE "productos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "slug" VARCHAR(150) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "descripcionCorta" VARCHAR(255),
    "especificacionesTecnicas" TEXT,
    "precio" DECIMAL(10,2) NOT NULL,
    "precioAnterior" DECIMAL(10,2),
    "marca" VARCHAR(80),
    "stock" INTEGER NOT NULL DEFAULT 0,
    "calificacion" DECIMAL(3,2),
    "numeroReviews" INTEGER NOT NULL DEFAULT 0,
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "esNuevo" BOOLEAN NOT NULL DEFAULT false,
    "masVendido" BOOLEAN NOT NULL DEFAULT false,
    "etiquetas" TEXT[],
    "caracteristicas" TEXT[],
    "colores" TEXT[],
    "dimensiones" VARCHAR(50),
    "peso" VARCHAR(20),
    "garantia" VARCHAR(50),
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoriaId" INTEGER,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "imagen" VARCHAR(255),
    "icono" VARCHAR(50),
    "color" VARCHAR(20),
    "esPopular" BOOLEAN NOT NULL DEFAULT false,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagenes" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "alt" VARCHAR(150),
    "orden" INTEGER NOT NULL DEFAULT 0,
    "productoId" INTEGER,

    CONSTRAINT "imagenes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "productos_slug_key" ON "productos"("slug");

-- CreateIndex
CREATE INDEX "productos_slug_idx" ON "productos"("slug");

-- CreateIndex
CREATE INDEX "productos_categoriaId_idx" ON "productos"("categoriaId");

-- CreateIndex
CREATE INDEX "productos_destacado_idx" ON "productos"("destacado");

-- CreateIndex
CREATE INDEX "productos_esNuevo_idx" ON "productos"("esNuevo");

-- CreateIndex
CREATE INDEX "productos_masVendido_idx" ON "productos"("masVendido");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_slug_key" ON "categorias"("slug");

-- CreateIndex
CREATE INDEX "categorias_slug_idx" ON "categorias"("slug");

-- CreateIndex
CREATE INDEX "categorias_esPopular_idx" ON "categorias"("esPopular");

-- CreateIndex
CREATE INDEX "imagenes_productoId_idx" ON "imagenes"("productoId");

-- CreateIndex
CREATE INDEX "imagenes_orden_idx" ON "imagenes"("orden");

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagenes" ADD CONSTRAINT "imagenes_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
