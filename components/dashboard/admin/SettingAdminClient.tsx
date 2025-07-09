"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { updateSetting } from "@/lib/settings"
import { updateAdminProfile } from "@/lib/data-admin"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

export default function ClientSettings({
    initialName,
    initialEmail,
    userId,
}: {
    initialName: string
    initialEmail: string
    userId: string
}) {
    const [name, setName] = useState(initialName)
    const [email, setEmail] = useState(initialEmail)
    const [password, setPassword] = useState("")
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");


    const handleCloseRegister = async () => {
        await updateSetting("registration", "closed");
        setModalMessage("Halaman Registrasi ditutup");
        setOpenModal(true);
    };

    const handleOpenRegister = async () => {
        await updateSetting("registration", "open");
        setModalMessage("Halaman Registrasi dibuka");
        setOpenModal(true);
    };


    const handleSave = async () => {
        try {
            const res = await updateAdminProfile(userId, { name, email, password });
            setModalMessage("Profil berhasil diperbarui");
            setOpenModal(true);
        } catch (err) {
            setModalMessage("Terjadi kesalahan saat menyimpan perubahan.");
            setOpenModal(true);
        }
    };
    return (
        <>
            <div className="min-w-2xl mx-auto space-y-6">
                {/* Dashboard Title */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Pengaturan Admin</h1>
                    <div className="space-x-3">
                        <Button className="bg-red-700" onClick={handleCloseRegister}>Close Register</Button>
                        <Button className="bg-blue-700" onClick={handleOpenRegister}>Open Register</Button>
                    </div>
                </div>


                <Card className="p-6">
                    <div className="grid gap-3">
                        <Label htmlFor="name">Nama</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-3 mt-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-3 mt-3">
                        <Label htmlFor="password">Password Baru</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={handleSave}>Simpan Perubahan</Button>
                    </div>
                </Card>
            </div>

            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Notifikasi</DialogTitle>
                        <DialogDescription>{modalMessage}</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </>
    )
}
