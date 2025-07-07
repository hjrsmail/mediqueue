"use server";

import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";
import { hash } from "bcrypt-ts";
import { startOfDay, endOfDay } from "date-fns";

// Dashboard Data
export async function countPoli() {
  const count = await prisma.poli.count();
  return count;
}

export async function countPetugas() {
  const count = await prisma.petugas.count();
  return count;
}

export async function countPasien() {
  const count = await prisma.pasien.count();
  return count;
}

export async function countDokter() {
  const count = await prisma.dokter.count();
  return count;
}

// Mengambil semua data poli
export const getAllPoli = async () => {
  return await prisma.poli.findMany();
};

// Menambah data poli
export const createPoli = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const code = formData.get("code") as string;

  if (!name || !address || !code ) return { error: "Semua field wajib diisi" };

  const newPoli = await prisma.poli.create({ data: { name, address, code } });

  return { success: true, data: newPoli };
};

// Menghapus data poli
export const deletePoli = async (id: string) => {
  await prisma.poli.delete({ where: { id } });
};

// Mengambil data poli berdasarkan id
export const getPoliById = async (id: string) => {
  return await prisma.poli.findUnique({ where: { id } });
};

// Mengubah data poli
export const updatePoli = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  const name = formData.get("name") as string;
  const code = formData.get("code") as string;
  const address = formData.get("address") as string;

  if (!name || !address || !code) {
    return { error: "Semua field wajib diisi" };
  }

  await prisma.poli.update({
    where: { id },
    data: { name, address, code },
  });

  return { success: true };
};

// Mengambil semua user dengan role PETUGAS
export const getAllPetugas = async () => {
  return await prisma.user.findMany({
    where: {
      role: "PETUGAS",
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: {
      name: "asc",
    },
  });
};

// Mengambil data petugas berdasarkan id
export const getPetugasById = async (id: string) => {
  return await prisma.petugas.findUnique({ where: { id } });
};

// Menghapus data petugas
export const deletePetugas = async (id: string) => {
  await prisma.petugas.delete({ where: { id } });
};

// Mengubah data petugas
export const updatePetugas = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) {
    return { error: "Semua field wajib diisi" };
  }

  await prisma.petugas.update({
    where: { id },
    data: { name, email },
  });

  return { success: true };
};

// Mengambil semua data dokter
export const getAllDokter = async () => {
  return await prisma.dokter.findMany();
};

// Mengambil data dokter berdasarkan id
export const getDokterById = async (id: string) => {
  return await prisma.dokter.findUnique({ where: { id } });
};

// Menambah data dokter
export const createDokter = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const specialization = formData.get("specialization") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;

  if (!name || !specialization || !phone || !address)
    return { error: "Semua field wajib diisi" };

  const newDokter = await prisma.dokter.create({
    data: { name, specialization, phone, address },
  });

  return { success: true, data: newDokter };
};

// Menghapus data dokter
export const deleteDokter = async (id: string) => {
  await prisma.dokter.delete({ where: { id } });
};

// Mengubah data dokter
export const updateDokter = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  const name = formData.get("name") as string;
  const specialization = formData.get("specialization") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;

  if (!name || !specialization || !phone || !address) {
    return { error: "Semua field wajib diisi" };
  }

  await prisma.dokter.update({
    where: { id },
    data: { name, specialization, phone, address },
  });

  return { success: true };
};

// Mengambil semua data pasien
export const getAllPasien = async () => {
  return await prisma.pasien.findMany();
};

// Mengambil data pasien berdasarkan id
export const getPasienById = async (id: string) => {
  return await prisma.pasien.findUnique({ where: { id } });
};

// Menambah data pasien
export const createPasien = async (formData: FormData) => {
  const fullname = formData.get("fullName") as string;
  const nik = formData.get("nik") as string;
  const phonenumber = formData.get("phonenumber") as string;
  const address = formData.get("address") as string;
  const poli = formData.get("poli") as string;

  if (!fullname || !nik || !phonenumber || !address)
    return { error: "Semua field wajib diisi" };

  const newPasien = await prisma.pasien.create({
    data: { fullname, nik, phonenumber, address, },
  });

  return { success: true, data: newPasien };
};

// Menghapus data pasien
export const deletePasien = async (id: string) => {
  await prisma.pasien.delete({ where: { id } });
};

// Mengubah data pasien
export const updatePasien = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  const fullname = formData.get("fullname") as string;
  const nik = formData.get("nik") as string;
  const phonenumber = formData.get("phoneNumber") as string;
  const address = formData.get("address") as string;

  if (!fullname || !nik || !phonenumber || !address) {
    return { error: "Semua field wajib diisi" };
  }

  await prisma.pasien.update({
    where: { id },
    data: { fullname, nik, phonenumber, address },
  });

  return { success: true };
};

// Setting user admin
export const updateAdminProfile = async (
  id: string,
  data: { name: string; email: string; password: string }
) => {
  const { name, email, password } = data;

  const updateData: any = { name, email };
  if (password && password.length > 0) {
    updateData.password = await hash(password, 10);
  }

  await prisma.user.update({
    where: { id },
    data: updateData,
  });

  return { success: true };
};
