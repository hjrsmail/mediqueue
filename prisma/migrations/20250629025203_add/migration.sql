/*
  Warnings:

  - Added the required column `specialization` to the `Dokter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dokter" ADD COLUMN     "specialization" TEXT NOT NULL;
