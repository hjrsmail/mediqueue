"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


interface DashboardData {
    total: number
    isWaiting: number
    isCheck: number
    isDone: number
}


const DashboardCard = ({ data }: { data: DashboardData }) => {
    return (
        <div className="grid gap-4 md:grid-cols-4">
            {/* Total Antrian Hari Ini */}
            <Card>
                <CardHeader>
                    <CardTitle>Total Antrian Hari Ini</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-primary">{data.total}</p>
                    <p className="text-sm text-muted-foreground">Jumlah semua antrian masuk hari ini</p>
                </CardContent>
            </Card>

            {/* Antrian Menunggu */}
            <Card>
                <CardHeader>
                    <CardTitle>Antrian Menunggu</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-yellow-600">{data.isWaiting}</p>
                    <p className="text-sm text-muted-foreground">Pasien yang belum dilayani</p>
                </CardContent>
            </Card>

            {/* Antrian Diproses */}
            <Card>
                <CardHeader>
                    <CardTitle>Antrian Diproses</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-blue-600">{data.isCheck}</p>
                    <p className="text-sm text-muted-foreground">Pasien yang sedang diproses</p>
                </CardContent>
            </Card>

            {/* Antrian Selesai */}
            <Card>
                <CardHeader>
                    <CardTitle>Antrian Selesai</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-green-600">{data.isDone}</p>
                    <p className="text-sm text-muted-foreground">Pasien yang sudah selesai</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default DashboardCard
