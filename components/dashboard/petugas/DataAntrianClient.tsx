'use client'

import { useState, useTransition } from "react"
import { Badge } from "@/components/ui/badge"
import { updateAntrianStatus } from "@/lib/data-petugas"
import { Antrian, Poli, Pasien, Status } from "@prisma/client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export type FullAntrian = {
    id: string;
    nomor: number;
    status: Status;
    createdAt: Date;
    pasien: {
        fullname: string;
        nik: string;
    };
    poli: {
        name: string;
        code: string;
    };
};


export default function ClientPage({ data }: { data: FullAntrian[] }) {
    const [antrian, setAntrian] = useState(data)
    const [pending, startTransition] = useTransition()

    const th = ["No", "Nama Pasien", "Kode Poli", "Status", "Aksi"]

    const handleStatusChange = (id: string, newStatus: Status) => {
        startTransition(async () => {
            const res = await updateAntrianStatus(id, newStatus)
            if (res.success) {
                setAntrian((prev) =>
                    prev.map((item) =>
                        item.id === id ? { ...item, status: newStatus } : item
                    )
                )
            } else {
                alert("Gagal mengubah status")
            }
        })
    }

    // Ubah format antrian
    const formattedAntrian = (code: string, nomor: number) => {
        return `${code}${nomor.toString().padStart(3, "0")}`
    }

    // console.log(antrian.length)

    return (
        <div className="space-y-6 lg:px-10 lg:pt-3">
            <div className="border rounded-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-md">
                    <thead className="bg-gray-50">
                        <tr>
                            {th.map((header, index) => (
                                <th
                                    key={index}
                                    className={`px-4 py-3 ${index === th.length - 1 ? "text-right" : "text-left"
                                        } text-sm font-bold text-gray-500 uppercase`}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {antrian.length === 0 ? (
                            <tr>
                                <td colSpan={th.length} className="text-center py-4 text-muted-foreground">
                                    Belum ada data antrian.
                                </td>
                            </tr>
                        ) : (
                            antrian.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-3">{formattedAntrian(item.poli.code, item.nomor)}</td>
                                    <td className="px-4 py-3 font-medium">{item.pasien.fullname}</td>
                                    <td className="px-4 py-3">{item.poli.name}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded text-white text-xs font-semibold
                                                ${item.status === "MENUNGGU"
                                                    ? "bg-yellow-500"
                                                    : item.status === "DIPERIKSA"
                                                        ? "bg-blue-500"
                                                        : "bg-green-500"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 space-y-1 w-36">
                                        <Badge
                                            variant="outline"
                                            className={
                                                item.status === "MENUNGGU"
                                                    ? "text-yellow-600 bg-yellow-100"
                                                    : item.status === "DIPERIKSA"
                                                        ? "text-blue-600 bg-blue-100"
                                                        : "text-green-600 bg-green-100"
                                            }
                                        >
                                            {item.status}
                                        </Badge>

                                        <Select
                                            value={item.status}
                                            onValueChange={(value) => handleStatusChange(item.id, value as Status)}
                                        >
                                            <SelectTrigger className="text-xs h-8">
                                                <SelectValue placeholder="Ubah Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="MENUNGGU">Menunggu</SelectItem>
                                                <SelectItem value="DIPERIKSA">Dilayani</SelectItem>
                                                <SelectItem value="SELESAI">Selesai</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
