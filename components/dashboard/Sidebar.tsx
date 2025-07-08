"use client"

import * as React from "react"
import {
    ClipboardList,
    Command,
    Hospital,
    LayoutDashboard,
    Cog,
    Stethoscope,
    UserCog,
} from "lucide-react"

import { NavProjects } from "@/components/dashboard/Navbar"
import { NavSecondary } from "@/components/dashboard/Navbar"
import { NavUser } from "@/components/dashboard/Navbar"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    role: "admin" | "petugas"
    user: {
        name: string
        email: string
        avatar?: string
    }
}

export function AppSidebar({ role, user, ...props }: AppSidebarProps) {

    // Menu utama sesuai role
    const navUtama = role === "admin"
        ? [
            { name: "Dashboard", url: "/admin", icon: LayoutDashboard },
            { name: "Data Poli", url: "/admin/poli", icon: Hospital },
            { name: "Data Petugas", url: "/admin/petugas", icon: UserCog },
            { name: "Data Pasien", url: "/admin/pasien", icon: ClipboardList },
            { name: "Data Dokter", url: "/admin/dokter", icon: Stethoscope },
        ]
        : [
            { name: "Dashboard", url: "/petugas", icon: LayoutDashboard },
            { name: "Data Antrian", url: "/petugas/antrian", icon: ClipboardList },
        ]

    // Optional: Menu bawah
    const navSecondary = [
        {
            title: "Pengaturan",
            url: `/${role}/settings`,
            icon: Cog,
        },
    ]

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={`/${role}`}>
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">SIRS</span>
                                    <span className="truncate text-xs capitalize">{role}</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavProjects projects={navUtama} />
                <NavSecondary items={navSecondary} className="mt-auto" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}
