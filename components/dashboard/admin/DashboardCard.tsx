"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Hospital,
    UserCog,
    ClipboardList,
    Stethoscope,
} from "lucide-react"


interface DashboardData {
    countPoli: string
    countPetugas: string
    countDokter: string
    countPasien: string
}

const DashboardCard = ({ data }: { data: DashboardData }) => {

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Card Poli */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Total Poli</CardTitle>
                    <Hospital className="h-5 w-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{data.countPoli}</div>
                    <p className="text-sm text-muted-foreground md:mt-2">Jumlah poli tersedia</p>
                </CardContent>
            </Card>

            {/* Card Petugas */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Total Petugas</CardTitle>
                    <UserCog className="h-5 w-5 text-purple-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{data.countPetugas}</div>
                    <p className="text-sm text-muted-foreground md:mt-2">Petugas aktif saat ini</p>
                </CardContent>
            </Card>

            {/* Card Pasien */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Total Pasien</CardTitle>
                    <ClipboardList className="h-5 w-5 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{data.countPasien}</div>
                    <p className="text-sm text-muted-foreground md:mt-2">Pasien terdaftar</p>
                </CardContent>
            </Card>

            {/* Card Dokter */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Total Dokter</CardTitle>
                    <Stethoscope className="h-5 w-5 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{data.countDokter}</div>
                    <p className="text-sm text-muted-foreground md:mt-2">Dokter praktik aktif</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default DashboardCard
