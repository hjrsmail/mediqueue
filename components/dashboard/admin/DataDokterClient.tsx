'use client'

import { useState } from "react"
import { CreateDokterModal } from "@/components/dashboard/create/CreateDokterModal"
import { EditDokterModal } from "@/components/dashboard/edit/EditDokterModal"
import { Button } from "@/components/ui/button"
import { deleteDokter } from "@/lib/data-admin"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription
} from "@/components/ui/alert-dialog"

export default function ClientPage({ initialData }: { initialData: any[] }) {
    const [dokter, setDokter] = useState(initialData)
    const [selectedDokter, setSelectedDokter] = useState<any>(null)
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

    const th = ["No", "Nama Dokter", "Spesialis", "Nomor Telepon", "Alamat", "Aksi"]


    const handleDelete = async (id: string) => {
        await deleteDokter(id)
        setDokter(prev => prev.filter(p => p.id !== id))
        setConfirmDeleteId(null)
    }

    return (
        <div className="space-y-6 lg:px-10 lg:pt-3">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Data Dokter</h1>
                <Button className="bg-blue-500" onClick={() => setShowCreate(true)}>
                    Tambah Dokter
                </Button>
            </div>

            <div className="border rounded-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-md">
                    <thead className="bg-gray-50">
                        <tr>
                            {th.map((header, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className={`px-4 py-3 ${index === th.length - 1 ? "text-right" : "text-left"
                                        } text-md font-bold text-gray-500 uppercase tracking-wider`}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {dokter.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-muted-foreground">
                                    Belum ada data dokter.
                                </td>
                            </tr>
                        ) : (
                            dokter.map((dokter, index) => (
                                <tr key={dokter.id}>
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3 font-medium">{dokter.name}</td>
                                    <td className="px-4 py-3 font-medium">{dokter.specialization}</td>
                                    <td className="px-4 py-3 font-medium">{dokter.phone}</td>
                                    <td className="px-4 py-3">{dokter.address}</td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <Button
                                            size="sm"
                                            className="bg-yellow-500"
                                            onClick={() => {
                                                setSelectedDokter(dokter)
                                                setShowEdit(true)
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => setConfirmDeleteId(dokter.id)}
                                        >
                                            Hapus
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Create */}
            <CreateDokterModal
                open={showCreate}
                onClose={() => setShowCreate(false)}
                onSuccess={(newDokter) => setDokter(prev => [...prev, newDokter])}
            />

            {/* Modal Edit */}
            {selectedDokter && (
                <EditDokterModal
                    dokter={selectedDokter}
                    open={showEdit}
                    onClose={() => {
                        setSelectedDokter(null)
                        setShowEdit(false)
                    }}
                />
            )}

            {/* Konfirmasi Hapus */}
            <AlertDialog open={!!confirmDeleteId} onOpenChange={() => setConfirmDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Data Dokter</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah kamu yakin ingin menghapus data dokter ini? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => confirmDeleteId && handleDelete(confirmDeleteId)}
                        >
                            Hapus
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
