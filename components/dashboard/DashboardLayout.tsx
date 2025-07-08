import { auth } from "@/auth";
import { AppSidebar } from "@/components/dashboard/Sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return redirect("/login"); // atau tampilkan null
  }

  const role = session.user.role?.toLowerCase(); // convert ke lowercase

  // Hanya izinkan role yang dikenal
  if (role !== "admin" && role !== "petugas") {
    return redirect("/unauthorized");
  }

  // console.log("Role:", role)
  // console.log("User:", session.user)
  // console.log("session.user:", session.user)

  return (
    <SidebarProvider>

      <AppSidebar
        role={role} // 👈 type-safe, dijamin hanya admin atau petugas
        user={{
          name: session.user.name ?? "User",
          email: session.user.email ?? "no-email",
          avatar: session.user.image ?? "/default-avatar.png",
        }}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
