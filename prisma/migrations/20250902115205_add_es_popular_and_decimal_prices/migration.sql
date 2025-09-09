/*
  Warnings:

  - You are about to alter the column `precio` on the `platos` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `precioAnterior` on the `platos` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "categorias" ADD COLUMN     "esPopular" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "platos" ALTER COLUMN "precio" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "precioAnterior" SET DATA TYPE DECIMAL(10,2);
