/*
  Warnings:

  - You are about to drop the column `fullName` on the `Pasien` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Pasien` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `Pasien` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phonenumber` to the `Pasien` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pasien" DROP COLUMN "fullName",
DROP COLUMN "phoneNumber",
ADD COLUMN     "fullname" TEXT NOT NULL,
ADD COLUMN     "phonenumber" TEXT NOT NULL;
