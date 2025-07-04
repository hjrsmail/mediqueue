"use client";

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <>
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-tr from-blue-400">
                <main className="flex flex-col gap-[32px] row-start-2 items-center">
                    <div className="flex flex-col gap-[16px] ">
                        <h1 className="font-bold text-3xl sm:text-5xl text-center">500 - Terjadi Kesalahan</h1>
                        <p className="text-muted-foreground text-xl text-center">{error.message}</p>
                        <Button
                            onClick={() => reset()}
                            variant="outline"
                            className=" mt-4 px-4 py-2 w-fit self-center"
                        >
                            Coba Lagi
                        </Button>
                    </div>
                </main >
            </div>
        </>


    );
}
