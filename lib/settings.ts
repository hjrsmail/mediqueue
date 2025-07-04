"use server";

import { prisma } from "@/lib/prisma";

export async function updateSetting(key: string, value: string) {
  try {
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Gagal update setting:", error);
    return { error: "Gagal update setting" };
  }
}

export async function getSetting(key: string) {
  const setting = await prisma.setting.findUnique({
    where: { key },
  });

  return setting?.value;
}

export async function isRegistrationOpen() {
  const value = await getSetting("registration");
  return value === "open";
}
