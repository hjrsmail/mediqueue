import { getAllQueue, updateAntrianStatus } from "@/lib/data-petugas"
import ClientPage from "@/components/dashboard/petugas/DataAntrianClient"

export default async function AntrianPage() {
  const initialPasien = await getAllQueue()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Daftar Antrian</h1>
      </div>

      <ClientPage data={initialPasien} />
    </div>
  )
}