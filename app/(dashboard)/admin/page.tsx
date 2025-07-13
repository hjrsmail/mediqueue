import { auth } from "@/auth"
import DashboardCard from "@/components/dashboard/admin/DashboardCard"
import { countPoli, countPetugas, countDokter, countPasien } from "@/lib/data-admin"


export default async function AdminPage() {
    const data = {
        countPoli: (await countPoli()).toString(),
        countPetugas: (await countPetugas()).toString(),
        countDokter: (await countDokter()).toString(),
        countPasien: (await countPasien()).toString(),
    };

    if (!data) {
        return <div className="p-4 text-muted-foreground ">Memuat data...</div>
    }

    const session = await auth();

    return (
        <div className="space-y-6 lg:px-10 lg:pt-3">
            {/* Dashboard Title */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Dashboard Admin</h1>
                <h2 className="text-xl text-muted-foreground">Halo <span className="font-bold"> {session?.user?.name} </span></h2>
            </div>

            {/* Dashboard Cards */}
            <DashboardCard data={data} />

            <div className="min-h-[60vh] rounded-xl border-dashed border border-muted flex items-center justify-center text-muted-foreground">
                Statistik detail akan ditambahkan di sini 📊
            </div>
        </div>
    )
}
