"use client";

import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

export const QueueEvidence = ({
    antrian,
    formattedNomor,
}: {
    antrian: any;
    formattedNomor: string;
    
}) => {
    const printRef = useRef<HTMLDivElement>(null);

    // const downloadPDF = async () => {
    //     const element = printRef.current;
    //     if (!element) return;

    //     const canvas = await html2canvas(element, { scale: 2 });
    //     const imgData = canvas.toDataURL("image/png");

    //     const pdf = new jsPDF({
    //         orientation: "portrait",
    //         unit: "mm",
    //         format: "a6",
    //     });

    //     const pageWidth = pdf.internal.pageSize.getWidth();
    //     const pageHeight = pdf.internal.pageSize.getHeight();

    //     const imgProps = pdf.getImageProperties(imgData);
    //     const pdfWidth = pageWidth;
    //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //     const yOffset = (pageHeight - pdfHeight) / 2;

    //     pdf.addImage(imgData, "PNG", 0, yOffset, pdfWidth, pdfHeight);
    //     pdf.save(`Bukti-Antrian-${formattedNomor}.pdf`);
    // };

    return (
        <div className="p-6 md:p-1 h-screen place-content-center">
            <div
                ref={printRef}
                className="max-w-md mx-auto p-6 mt-10 rounded-2xl shadow-xl text-center space-y-6 bg-blue-100 text-blue-900 print:bg-white print:text-black print:shadow-none"
            >
                <h1 className="text-3xl font-bold tracking-wide">Bukti Antrian</h1>

                <div className="text-6xl font-extrabold text-blue-700">{formattedNomor}</div>

                <QRCodeCanvas value={antrian.id} size={128} className="mx-auto" />

                <div className="space-y-1 text-blue-800 text-base font-medium mt-4">
                    <p>
                        Nama: <span className="font-semibold">{antrian.pasien.fullname}</span>
                    </p>
                    <p>
                        NIK:{" "}
                        <span className="font-mono text-sm tracking-wider">
                            {antrian.pasien.nik}
                        </span>
                    </p>
                    <p>
                        Poli Tujuan:{" "}
                        <span className="font-semibold">{antrian.poli.name}</span>
                    </p>
                    <p>
                        Tanggal Daftar:{" "}
                        <span>
                            {new Date(antrian.createdAt).toLocaleDateString("id-ID", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-6 print:hidden">
                <button
                    onClick={() => window.print()}
                    className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all"
                >
                    Cetak
                </button>
                {/* <button
                    onClick={downloadPDF}
                    className="px-5 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-all"
                >
                    Download PDF
                </button> */}
            </div>

            <div className="flex justify-center gap-4 mt-6 print:hidden text-center">
                <h1 className="text-md font-bold leading-relaxed text-gray-600">
                    Silakan cetak bukti antrian atau simpan gambar sebagai bukti pendaftaran
                </h1>
            </div>
        </div>
    );
};
