import { getAllPoli, deletePoli } from "@/lib/data-admin"
import ClientPage from "@/components/dashboard/admin/DataPoliClient"


export default async function DataPoliPage() {
    const initialPolis = await getAllPoli()

    return <ClientPage initialData={initialPolis} />
}
