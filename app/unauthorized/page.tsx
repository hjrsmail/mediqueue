export default function UnauthorizedPage() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-tr from-blue-400">
            <main className="flex flex-col gap-[32px] row-start-2 items-center">
                <div className="flex flex-col gap-[16px] ">
                    <h1 className="font-bold text-3xl sm:text-5xl text-center">
                        403 - Tidak Diizinkan
                    </h1>
                    <p className="text-muted-foreground text-xl text-center ">
                        Kamu tidak memiliki akses ke halaman ini.
                    </p>
                </div>
            </main>
        </div>
    )
}
