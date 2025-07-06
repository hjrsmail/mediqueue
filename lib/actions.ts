"use server";

import { LoginSchema, QueueSchema, RegisterSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";

export const signUpCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  // ❌ Validasi gagal → kirim error ke client
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = hashSync(password, 10);

  try {
    //  Simpan user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    //  Return sukses (biar client redirect manual)
    return { success: true };
  } catch (error) {
    //  Handle email duplicate (Prisma error code P2002)
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as any).code === "P2002"
    ) {
      return {
        error: {
          email: ["Email sudah digunakan."],
        },
      };
    }

    //  Error server umum
    return {
      error: {
        email: ["Terjadi kesalahan server."],
      },
    };
  }
};

// Login credentials
export const signInCredentials = async (
  _prevState: unknown,
  formData: FormData
) => {
  const validatedFields = LoginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      return { success: false, message: "Email atau password salah." };
    }

    // Ambil user langsung dari database untuk tahu role
    const user = await prisma.user.findUnique({
      where: { email },
      select: { role: true },
    });

    if (!user?.role) {
      return { success: false, message: "Unknown role" };
    }

    const redirectTo =
      user.role === "ADMIN"
        ? "/admin"
        : user.role === "PETUGAS"
        ? "/petugas"
        : "/";

    return { success: true, redirectTo };
  } catch (error) {
    return { success: false, message: "Terjadi kesalahan saat login." };
  }
};

// export const signOutCredentials = async () => {
//   await auth();
//   return { success: true, redirectTo: "/login" };
// };

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

    // ✅ Cek apakah pasien sudah ada berdasarkan NIK
    let pasien = await prisma.pasien.findUnique({
      where: { nik },
    });

    // ✅ Jika belum ada, buat data pasien
    if (!pasien) {
      pasien = await prisma.pasien.create({
        data: {
          fullname,
          nik,
          phonenumber,
          address,
        },
      });
    }

    // ✅ Cek apakah pasien sudah mendaftar hari ini
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const alreadyQueuedToday = await prisma.antrian.findFirst({
      where: {
        pasienId: pasien.id,
        tanggal: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    if (alreadyQueuedToday) {
      return { error: { nik: ["Pasien ini sudah mendaftar hari ini"] } };
    }

    // ✅ Ambil nomor antrian terakhir hari ini untuk poli yang dipilih
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
    const antrian = await prisma.antrian.create({
      data: {
        nomor,
        status: "MENUNGGU",
        pasienId: pasien.id,
        poliId: foundPoli.id,
        tanggal: new Date(),
      },
    });

    return {
      success: true,
      redirectTo: `/bukti-antrian/${antrian.id}`,
    };
  } catch (error) {
    return { error: "Terjadi kesalahan saat daftar antrian." };
  }
};
