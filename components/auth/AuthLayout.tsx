// components/auth/auth-layout.tsx
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-6 min-h-screen justify-center items-center p-6 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-tr from-blue-400">
            <Card className="overflow-hidden p-0 w-full max-w-4xl bg-white/20 backdrop-blur-sm">
                <CardContent className="grid p-0 md:grid-cols-2 gap-5">
                    {/* FORM */}
                    <div className="p-6 md:p-8 w-full">{children}</div>

                    {/* BACKGROUND IMAGE */}
                    <div className="relative hidden md:block">
                        <Image
                            src="/images/bg-auth.webp"
                            alt="Image"
                            fill
                            sizes="100%"
                            priority
                            className="object-cover brightness-90  dark:brightness-[0.3]"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="text-muted-foreground text-center text-xs">
                Dengan melanjutkan, Anda menyetujui{" "}
                <Link href="" className="underline underline-offset-4 hover:text-primary">
                    Terms of Service
                </Link>{" "}
                dan{" "}
                <Link href="" className="underline underline-offset-4 hover:text-primary">
                    Privacy Policy
                </Link>.
            </div>
        </div>
    );
}
