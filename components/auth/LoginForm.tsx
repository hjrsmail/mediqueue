"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Form from "next/form";
import { useActionState, useEffect, useState } from "react";
import { signInCredentials } from "@/lib/actions";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export function LoginForm() {

    const Router = useRouter();

    const [state, formAction] = useActionState(signInCredentials, null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (state?.success && state.redirectTo) {
            window.location.href = state.redirectTo; 
        }
    }, [state]);


    return (
        <>
            <Form action={formAction} className="flex flex-col">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Login</h1>
                    <p className="text-muted-foreground text-sm">
                        Masukkan email dan password Anda
                    </p>
                </div>

                {state?.message ? (
                    <div className="p-3 rounded-lg mb-4 text-sm text-destructive bg-destructive/20 italic mt-4 ">
                        <span className="font-medium">{state?.message}</span>
                    </div>
                ) : null}

                {/* Email */}
                <div className="grid gap-3 mt-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@mail.com"
                        required
                    />
                </div>
                <div aria-atomic="true" aria-live="polite">
                    <span className="text-sm text-red-500">{state?.error?.email}</span>
                </div>

                {/* Password */}

                <div className="grid gap-3 mt-3">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="pr-10" // beri ruang kanan untuk tombol
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div aria-atomic="true" aria-live="polite">
                    <span className="text-sm text-red-500">{state?.error?.password}</span>
                </div>

                <Button type="submit" className="w-full mt-4">
                    Login
                </Button>
            </Form>

            <Button asChild variant="outline" className="w-full mt-3">
                <Link href="/">Kembali</Link>
            </Button>

            <div className="text-center text-sm mt-3">
                Belum punya akun?{" "}
                <Link href="/register" className="underline underline-offset-4">
                    Daftar
                </Link>
            </div>
        </>
    );
}
