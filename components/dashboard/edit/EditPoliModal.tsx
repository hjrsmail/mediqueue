'use client'

import { updatePoli } from "@/lib/data-admin"
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

export function EditPoliModal({
    open,
    onClose,
    poli,
}: {
    open: boolean
    onClose: () => void
    poli: { id: string; name: string; address: string; code: string }
}) {
    const updateWithId = updatePoli.bind(null, poli.id)
    const [state, formAction] = useActionState(updateWithId, null)

    const [name, setName] = useState(poli.name)
    const [code, setCode] = useState(poli.code)
    const [address, setAddress] = useState(poli.address)

    useEffect(() => {
        if (state?.success) onClose()
    }, [state, onClose])

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Poli</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <Input
                        name="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Nama Poli"
                        required
                    />
                    <Input
                        name="code"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        placeholder="Code"
                        required
                    />
                    <Input
                        name="address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Alamat Poli"
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
