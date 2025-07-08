'use client'

import { updateDokter } from "@/lib/data-admin"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useActionState } from "react"
import { useEffect, useState } from "react"

export function EditDokterModal({
    open,
    onClose,
    dokter,
}: {
    open: boolean
    onClose: () => void
    dokter: { id: string; name: string; specialization: string, phone: string, address: string }
}) {
    const updateWithId = updateDokter.bind(null, dokter.id)
    const [state, formAction] = useActionState(updateWithId, null)

    const [name, setName] = useState(dokter.name)
    const [specialization, setSpecialization] = useState(dokter.specialization)
    const [phone, setPhone] = useState(dokter.phone)
    const [address, setAddress] = useState(dokter.address)

    useEffect(() => {
        if (state?.success) onClose()
    }, [state, onClose])

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Dokter</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <Input
                        name="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Nama Pasien"
                        required
                    />
                    <Input
                        name="specialization"
                        value={specialization}
                        onChange={e => setSpecialization(e.target.value)}
                        placeholder="Spesialisasi"
                        required
                    />
                    <Input
                        name="phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Nomor Telepon"
                        required
                    />
                    <Input
                        name="address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Alamat Dokter"
                        required
                    />
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Batal
                        </Button>
                        <Button type="submit">Update</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
