'use client'

import { updatePasien } from "@/lib/data-admin"
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

export function EditPasienModal({
    open,
    onClose,
    pasien,
}: {
    open: boolean
    onClose: () => void
    pasien: { id: string; name: string; nik: string, phone: string, address: string }
}) {
    const updateWithId = updatePasien.bind(null, pasien.id)
    const [state, formAction] = useActionState(updateWithId, null)

    const [name, setName] = useState(pasien.name)
    const [nik, setNik] = useState(pasien.nik)
    const [phone, setPhone] = useState(pasien.phone)
    const [address, setAddress] = useState(pasien.address)

    useEffect(() => {
        if (state?.success) onClose()
    }, [state, onClose])

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Pasien</DialogTitle>
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
                        name="nik"
                        value={nik}
                        onChange={e => setNik(e.target.value)}
                        placeholder="NIK"
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
                        placeholder="Alamat Pasien"
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
