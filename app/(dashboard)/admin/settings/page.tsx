import { auth } from "@/auth";
import ClientSettings from "@/components/dashboard/admin/SettingAdminClient";

export default async function AdminSettingsPage() {
  const session = await auth();

  return (
    <ClientSettings
      userId={session?.user?.id ?? ""}
      initialName={session?.user?.name ?? ""}
      initialEmail={session?.user?.email ?? ""}
    />
  );
}
