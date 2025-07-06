"use server";

import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";
import { startOfDay, endOfDay } from "date-fns";
import { QueueSchema } from "./zod";

// Petugas Page
export async function getQueueSummary() {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  const total = await prisma.antrian.count({
    where: {
      createdAt: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
  });

  const isWaiting = await prisma.antrian.count({
    where: {
      createdAt: {
        gte: todayStart,
        lte: todayEnd,
      },
      status: "MENUNGGU",
    },
  });

  const isDone = await prisma.antrian.count({
    where: {
      createdAt: {
        gte: todayStart,
        lte: todayEnd,
      },
      status: "SELESAI",
    },
  });

  const isCheck = await prisma.antrian.count({
    where: {
      createdAt: {
        gte: todayStart,
        lte: todayEnd,
      },
      status: "DIPERIKSA",
    },
  });

  return {
    total,
    isWaiting,
    isCheck,
    isDone,
  };
}

// Mengambil semua data Antrian
export const getAllQueue = async () => {
  return await prisma.antrian.findMany({
    select: {
      id: true,
      nomor: true,
      status: true,
      createdAt: true,
      pasien: {
        select: {
          fullname: true,
          nik: true,
        },
      },
      poli: {
        select: {
          name: true,
          code: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Ubah status antrian berdasarkan ID
export async function updateAntrianStatus(id: string, status: Status) {
  try {
    await prisma.antrian.update({
      where: { id },
      data: { status },
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Gagal update status antrian:", error);
    return { success: false, message: "Gagal update status" };
  }
}

// Generate Nomor Antrian
export const queueCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const formFields = Object.fromEntries(formData.entries());
  const isValidatedFields = QueueSchema.safeParse(formFields);

  if (!isValidatedFields.success) {
    return {
      error: isValidatedFields.error.flatten().fieldErrors,
    };
  }

  const { fullname, nik, phonenumber, address, poli } = isValidatedFields.data;

  try {
    // ✅ Cari poli berdasarkan ID
    const foundPoli = await prisma.poli.findUnique({
      where: { id: poli },
    });

    if (!foundPoli) {
      return { error: { poli: ["Poli tidak ditemukan"] } };
    }

    // ✅ Cek apakah pasien sudah pernah mendaftar (berdasarkan NIK)
    const existingPasien = await prisma.pasien.findUnique({
      where: { nik },
    });

    if (existingPasien) {
      return { error: { nik: ["Pasien dengan NIK ini sudah terdaftar"] } };
    }

    // ✅ Buat pasien baru
    const newPasien = await prisma.pasien.create({
      data: {
        fullname,
        nik,
        phonenumber,
        address,
      },
    });

    // ✅ Ambil nomor antrian terakhir hari ini untuk poli yang dipilih
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const lastAntrian = await prisma.antrian.findFirst({
      where: {
        poliId: foundPoli.id,
        tanggal: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
      orderBy: {
        nomor: "desc",
      },
    });

    const nomor = lastAntrian ? lastAntrian.nomor + 1 : 1;

    // ✅ Masukkan ke antrian
    await prisma.antrian.create({
      data: {
        nomor,
        status: "MENUNGGU",
        pasienId: newPasien.id,
        poliId: foundPoli.id,
        tanggal: new Date(),
      },
    });

    return { success: true, redirectTo: "/daftar-antrian" };
  } catch (error) {
    return { error: "Terjadi kesalahan saat daftar antrian." };
  }
};
