import { auth } from "@/auth";
import DashboardCard from "@/components/dashboard/petugas/DashboardCard";
import { getQueueSummary } from "@/lib/data-petugas";


export default async function PetugasPage() {
  const data = await getQueueSummary();

  if (!data) {
    return <div className="p-4 text-muted-foreground ">Memuat data...</div>
  }

  const session = await auth();

  return (
    <div className="space-y-6">
      {/* Dashboard Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Petugas</h1>
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
