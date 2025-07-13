import { getAllPasien } from "@/lib/data-admin"
import ClientPage from "@/components/dashboard/admin/DataPasienClient"


export default async function DataPoliPage() {
    const initialPasien = await getAllPasien()

    return <ClientPage initialData={initialPasien} />
}
