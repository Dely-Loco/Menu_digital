-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "esNuevo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "masVendido" BOOLEAN NOT NULL DEFAULT false;
