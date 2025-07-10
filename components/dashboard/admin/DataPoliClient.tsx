'use client'

import { useState } from "react"
import { CreatePoliModal } from "@/components/dashboard/create/CreatePoliModal"
import { EditPoliModal } from "@/components/dashboard/edit/EditPoliModal"
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
    const [polis, setPolis] = useState(initialData)
    const [selectedPoli, setSelectedPoli] = useState<any>(null)
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

    const th = ["No", "Nama Poli", "Kode Poli", "Alamat", "Aksi"]


    const handleDelete = async (id: string) => {
        await deletePoli(id)
        setPolis(prev => prev.filter(p => p.id !== id))
        setConfirmDeleteId(null)
    }

    return (
        <div className="space-y-6 lg:px-10 lg:pt-3">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Data Poli</h1>
                <Button className="bg-blue-500" onClick={() => setShowCreate(true)}>
                    Tambah Poli
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
                        {polis.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-muted-foreground">
                                    Belum ada data poli.
                                </td>
                            </tr>
                        ) : (
                            polis.map((poli, index) => (
                                <tr key={poli.id}>
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3 font-medium">{poli.name}</td>
                                    <td className="px-4 py-3">{poli.code}</td>
                                    <td className="px-4 py-3">{poli.address}</td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <Button
                                            size="sm"
                                            className="bg-yellow-500"
                                            onClick={() => {
                                                setSelectedPoli(poli)
                                                setShowEdit(true)
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => setConfirmDeleteId(poli.id)}
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
            <CreatePoliModal
                open={showCreate}
                onClose={() => setShowCreate(false)}
                onSuccess={(newPoli) => setPolis(prev => [...prev, newPoli])}
            />

            {/* Modal Edit */}
            {selectedPoli && (
                <EditPoliModal
                    poli={selectedPoli}
                    open={showEdit}
                    onClose={() => {
                        setSelectedPoli(null)
                        setShowEdit(false)
                    }}
                />
            )}

            {/* Konfirmasi Hapus */}
            <AlertDialog open={!!confirmDeleteId} onOpenChange={() => setConfirmDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Data Poli</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah kamu yakin ingin menghapus data poli ini? Tindakan ini tidak dapat dibatalkan.
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
