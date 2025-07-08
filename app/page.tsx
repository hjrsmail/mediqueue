"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-tr from-blue-400">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <div className="flex flex-col gap-[16px] ">
          <h1 className="font-bold text-3xl sm:text-5xl text-center">
            Selamat Datang di Sistem Antrian <br className="hidden lg:block " />Rumah Sakit NextJS
          </h1>
          <p className="text-muted-foreground text-xl text-center ">
            Hospital queues are now easier: online, fast, without queuing on site.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <Button
            variant="outline"
            className="text-center"
            size="lg"
            asChild
          >
            <Link href="/daftar-antrian">Ambil Antrian</Link>
          </Button>
          <Button
            variant="default"
            className="text-center min-w-35"
            size="lg"
            asChild
          >
            <Link href="/login"> Login</Link>
          </Button>
        </div>

      </main>
    </div>
  );
}
