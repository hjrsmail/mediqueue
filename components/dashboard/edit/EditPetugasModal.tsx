'use client'

import { updatePetugas } from "@/lib/data-admin"
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

export function EditPetugasModal({
    open,
    onClose,
    petugas,
}: {
    open: boolean
    onClose: () => void
    petugas: { id: string; name: string; email: string }
}) {
    const updateWithId = updatePetugas.bind(null, petugas.id)
    const [state, formAction] = useActionState(updateWithId, null)

    const [name, setName] = useState(petugas.name)
    const [email, setEmail] = useState(petugas.email)

    useEffect(() => {
        if (state?.success) onClose()
    }, [state, onClose])

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Petugas</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <Input
                        name="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Nama Petugas"
                        required
                    />
                    <Input
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email Petugas"
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
