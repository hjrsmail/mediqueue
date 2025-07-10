
import { QueueEvidence } from "@/components/queue/QueueEvidence";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function BuktiAntrian({ params }: PageProps) {

    const { id } = await params;

    const antrian = await prisma.antrian.findUnique({
        where: { id },
        include: {
            pasien: true,
            poli: true,
        },
    });

    if (!antrian) return notFound();

    function formattedAntrian(code: string, nomor: number) {
        return `${code}${nomor.toString().padStart(3, "0")}`;
    }

    const formattedNomor = formattedAntrian(antrian.poli.code, antrian.nomor);

    return <QueueEvidence antrian={antrian} formattedNomor={formattedNomor} />;
}
