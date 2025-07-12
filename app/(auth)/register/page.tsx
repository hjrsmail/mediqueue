import AuthLayout from "@/components/auth/AuthLayout"
import { RegisterForm } from "@/components/auth/RegisterForm"
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation"

export default async function RegisterPage() {
  const setting = await prisma.setting.findUnique({
    where: { key: "registration" },
  });

  if (setting?.value === "closed") {
    redirect("/unauthorized?message=not-allowed");
  }

  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  )
}
