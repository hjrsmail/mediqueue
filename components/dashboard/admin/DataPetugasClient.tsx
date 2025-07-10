'use client'

import { useState } from "react"
import { CreatePetugasModal } from "@/components/dashboard/create/CreatePetugasModal"
import { EditPetugasModal } from "@/components/dashboard/edit/EditPetugasModal"
import { Button } from "@/components/ui/button"
import { deletePoli } from "@/lib/data-admin"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription
} from "@/components/ui/alert-dialog"

export default function ClientPage({ initialData }: { initialData: any[] }) {
    const [petugas, setPetugas] = useState(initialData)
    const [selectedPetugas, setSelectedPetugas] = useState<any>(null)
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

    const th = ["No", "Nama Petugas", "Email", "Aksi"]


    const handleDelete = async (id: string) => {
        await deletePoli(id)
        setPetugas(prev => prev.filter(p => p.id !== id))
        setConfirmDeleteId(null)
    }

    return (
        <div className="space-y-6 lg:px-10 lg:pt-3">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Data Petugas</h1>
                <Button className="bg-blue-500" onClick={() => setShowCreate(true)}>
                    Tambah Petugas
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
                        {petugas.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-muted-foreground">
                                    Belum ada data petugas.
                                </td>
                            </tr>
                        ) : (
                            petugas.map((petugas, index) => (
                                <tr key={petugas.id}>
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3 font-medium">{petugas.name}</td>
                                    <td className="px-4 py-3">{petugas.email}</td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <Button
                                            size="sm"
                                            className="bg-yellow-500"
                                            onClick={() => {
                                                setSelectedPetugas(petugas)
                                                setShowEdit(true)
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => setConfirmDeleteId(petugas.id)}
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
            <CreatePetugasModal
                open={showCreate}
                onClose={() => setShowCreate(false)}
                onSuccess={(newPetugas) => setPetugas(prev => [...prev, newPetugas])}
            />

            {/* Modal Edit */}
            {selectedPetugas && (
                <EditPetugasModal
                    petugas={selectedPetugas}
                    open={showEdit}
                    onClose={() => {
                        setSelectedPetugas(null)
                        setShowEdit(false)
                    }}
                />
            )}

            {/* Konfirmasi Hapus */}
            <AlertDialog open={!!confirmDeleteId} onOpenChange={() => setConfirmDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Data Petugas</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah kamu yakin ingin menghapus data petugas ini? Tindakan ini tidak dapat dibatalkan.
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
