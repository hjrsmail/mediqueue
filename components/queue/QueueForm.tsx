"use client";

import { useState, useEffect, useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { queueCredentials } from "@/lib/actions";
import { QueueSchema } from "@/lib/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select";
import Form from "next/form";

// Types
type QueueFormFields = z.infer<typeof QueueSchema>;
type QueueFormState = {
    error?: string | Partial<Record<keyof QueueFormFields, string[]>>;
    success?: boolean;
    redirectTo?: string;
} | null;

interface DataPoli {
    id: string;
    name: string;
}

const QueueForm = ({ dataPoli }: { dataPoli: DataPoli[] }) => {
    const router = useRouter();

    const [nik, setNik] = useState("");
    const [fullname, setFullName] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [poli, setPoli] = useState("");

    const [state, formAction] = useActionState<QueueFormState, FormData>(
        async (_prevState, formData) => {
            const result = await queueCredentials(_prevState, formData);

            if (
                result?.error &&
                typeof result.error === "object" &&
                !Array.isArray(result.error)
            ) {
                if (result.error.nik) setNik("");
                if (result.error.fullname) setFullName("");
                if (result.error.phonenumber) setPhoneNumber("");
                if (result.error.address) setAddress("");
                if (result.error.poli) setPoli("");
            }

            return result;
        },
        null
    );


    useEffect(() => {
        if (state?.success && state.redirectTo) {
            router.push(state.redirectTo);
        }
    }, [state]);


    return (
        <Card className="w-full p-8 bg-blue-500/10 backdrop-blur-md shadow-md rounded-xl gap-y-2">
            <div className="text-start">
                <h1 className="text-3xl font-bold">Pendaftaran Antrian</h1>
                <p className="text-muted-foreground text-md">
                    Silakan isi data diri Anda untuk dapat mengambil antrian
                </p>
            </div>

            <Form action={formAction} className="mt-3">
                {/* NIK */}
                <div className="grid gap-3">
                    <Label htmlFor="nik">NIK</Label>
                    <Input
                        id="nik"
                        name="nik"
                        placeholder="Masukkan NIK Anda"
                        value={nik}
                        required
                        onChange={(e) => setNik(e.target.value)}
                    />
                </div>

                {/* Message error */}
                <div aria-atomic="true" aria-live="polite">
                    <span className="text-sm text-red-500">{(state?.error as any)?.nik?.[0]}</span>
                </div>

                {/* Nama Lengkap */}
                <div className="grid gap-3 mt-3">
                    <Label htmlFor="fullname">Nama Lengkap</Label>
                    <Input
                        id="fullname"
                        name="fullname"
                        placeholder="Masukkan Nama Lengkap Anda"
                        value={fullname}
                        required
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                {/* Message error */}
                <div aria-atomic="true" aria-live="polite">
                    <span className="text-sm text-red-500">{(state?.error as any)?.fullname?.[0]}</span>
                </div>

                {/* Nomor Telepon */}
                <div className="grid gap-3 mt-3">
                    <Label htmlFor="phonenumber">Nomor Telepon</Label>
                    <Input
                        id="phonenumber"
                        name="phonenumber"
                        placeholder="Masukkan Nomor Telepon Anda"
                        value={phonenumber}
                        required
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                {/* Message error */}
                <div aria-atomic="true" aria-live="polite">
                    <span className="text-sm text-red-500">{(state?.error as any)?.phonenumber?.[0]}</span>
                </div>

                {/* Alamat */}
                <div className="grid gap-3 mt-3">
                    <Label htmlFor="address">Alamat</Label>
                    <Input
                        id="address"
                        name="address"
                        placeholder="Masukkan Alamat Anda"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                {/* Message error */}
                <div aria-atomic="true" aria-live="polite">
                    <span className="text-sm text-red-500">{(state?.error as any)?.address?.[0]}</span>
                </div>

                {/* Poli */}
                <div className="grid gap-3 mt-3">
                    <Label htmlFor="poli">Pilih Poli Tujuan</Label>
                    <Select name="poli" value={poli} onValueChange={setPoli}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="--Pilih Poli--" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {dataPoli.map((item) => (
                                    <SelectItem key={item.id} value={item.id}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <input type="hidden" name="poli" value={poli} />
                </div>
                {/* Message error */}
                <div aria-atomic="true" aria-live="polite">
                    <span className="text-sm text-red-500">{(state?.error as any)?.poli?.[0]}</span>
                </div>

                <Button type="submit" className="w-full mt-3">
                    Dapatkan Antrian
                </Button>
            </Form>

            <Button variant="outline" className="w-full mt-1">
                <Link href="/">Kembali</Link>
            </Button>
        </Card>
    );
};

export default QueueForm;
