'use client';

import { createPasien } from "@/lib/data-admin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useActionState, useRef } from "react";

type CreatePasienResult = {
    success?: boolean;
    error?: string;
    data?: any;
} | null; // penting!

export function CreatePasienModal({
    open,
    onClose,
    onSuccess,
}: {
    open: boolean;
    onClose: () => void;
    onSuccess: (newPoli: any) => void;
}) {
    const [state, formAction] = useActionState<CreatePasienResult, FormData>(
        async (_prevState, formData) => {
            const result = await createPasien(formData);
            if (result.success && result.data) {
                onSuccess(result.data);
                onClose();
            }
            return result;
        },
        null
    );

    const ref = useRef<HTMLFormElement>(null);
    if (ref.current) {
        ref.current.reset();
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Pasien</DialogTitle>
                </DialogHeader>

                <form ref={ref} action={formAction} className="space-y-4">
                    <Input name="name" placeholder="Nama Pasien" required />
                    <Input name="nik" placeholder="NIK" required />
                    <Input name="phone" placeholder="Nomor Telepon" required />
                    <Input name="address" placeholder="Alamat Pasien" required />

                    {/* Cegah error jika state masih null */}
                    {state?.error && (
                        <p className="text-red-500 text-sm">{state.error}</p>
                    )}

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Batal
                        </Button>
                        <Button type="submit">Simpan</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
