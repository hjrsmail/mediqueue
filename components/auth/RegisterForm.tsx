"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { RegisterSchema } from "@/lib/zod";
import { signUpCredentials } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Form from "next/form";

// Types
type RegisterFormFields = z.infer<typeof RegisterSchema>;
type RegisterFormState = {
    error?: Partial<Record<keyof RegisterFormFields, string[]>>;
    success?: boolean;
} | null;

export function RegisterForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [state, formAction] = useActionState<RegisterFormState, FormData>(
        async (_prevState, formData) => {
            const result = await signUpCredentials(_prevState, formData);

            if (result?.error) {
                if (result.error.email) setEmail("");
                if (result.error.name) setName("");
                if (result.error.password) setPassword("");
                if (result.error.confirmPassword) setConfirmPassword("");
            }

            return result;
        },
        null
    );

    useEffect(() => {
        if (state?.success) {
            router.push("/login");
        }
    }, [state]);

    return (
        <>
            <Form action={formAction} className="flex flex-col">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Register</h1>
                    <p className="text-muted-foreground text-sm">
                        Masukkan data diri Anda
                    </p>
                </div>

                {/* Email */}
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" name="email" placeholder="example@mail.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                {/* Message error */}
                <div aria-atomic="true" aria-live="polite">
                    <span className="text-sm text-red-500">{state?.error?.email}</span>
                </div>

                {/* Name */}
                <div className="grid gap-3 mt-3">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" type="text" name="name" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                {/* Message error */}
                <div aria-atomic="true" aria-live="polite">
                    <span className="text-sm text-red-500">{state?.error?.name}</span>
                </div>

                {/* Password */}
                <div className="grid gap-3 mt-3">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-sm underline-offset-2 hover:underline">
                            Lupa password?
                        </a>
                    </div>
                    <Input id="password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
                </div>
                {/* Message error */}
                <div aria-atomic="true" aria-live="polite">
                    <span className="text-sm text-red-500">{state?.error?.password}</span>
                </div>

                {/* Confirm Password */}
                <div className="grid gap-3 mt-3">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" required />
                </div>
                {/* Message error */}
                <div aria-atomic="true" aria-live="polite">
                    <span className="text-sm text-red-500">{state?.error?.confirmPassword}</span>
                </div>

                {/* Button */}
                <Button type="submit" className="w-full mt-3">
                    Register
                </Button>
            </Form>
            <Button asChild variant="outline" className="w-full mt-2">
                <Link href="/login">Kembali</Link>
            </Button>

            <div className="text-center text-sm mt-2">
                Sudah punya akun?{" "}
                <Link href="/login" className="underline underline-offset-4">
                    Login
                </Link>
            </div>
        </>
    );
}
