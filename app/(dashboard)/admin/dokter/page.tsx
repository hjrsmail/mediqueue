import { getAllDokter } from "@/lib/data-admin"
import ClientPage from "@/components/dashboard/admin/DataDokterClient"


export default async function DataPoliPage() {
    const initialDokter = await getAllDokter()

    return <ClientPage initialData={initialDokter} />
}
