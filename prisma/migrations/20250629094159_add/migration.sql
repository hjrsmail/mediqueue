/*
  Warnings:

  - Added the required column `poli` to the `Pasien` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pasien" ADD COLUMN     "poli" TEXT NOT NULL;
