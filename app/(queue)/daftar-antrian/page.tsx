import QueueForm from '@/components/queue/QueueForm'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'

export default async function QueueRegistrationPage() {

    const dataPoli = await prisma.poli.findMany();
    return (
        <div className="bg-gradient-to-tr from-blue-400 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl w-full items-center">
                {/* Image Section */}
                <div className="hidden lg:block">
                    <Image
                        src="/images/bg-auth.webp"
                        alt="Ilustrasi Antrian"
                        priority
                        width={500}
                        height={500}
                        className=" object-cover h-full w-full "
                    />
                </div>

                {/* Form Section */}
                <QueueForm dataPoli={dataPoli}  />
            </div>
        </div>
    )
}
