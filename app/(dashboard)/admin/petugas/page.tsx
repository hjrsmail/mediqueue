import { getAllPetugas } from "@/lib/data-admin"
import ClientPage from "@/components/dashboard/admin/DataPetugasClient"


export default async function DataPoliPage() {
    const initialPetugas = await getAllPetugas()

    return <ClientPage initialData={initialPetugas} />
}
