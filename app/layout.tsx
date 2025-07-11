import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sistem Informasi Antrian Rumah Sakit",
    template: "%s | SIARS",
  },
  description: "Kelola antrian pasien rumah sakit dengan mudah, cepat, dan efisien.",
  keywords: ["antrian", "rumah sakit", "sistem informasi", "pasien", "dokter", "layanan medis"],
  authors: [{ name: "Tim SIARS", url: "https://siars.example.com" }],
  openGraph: {
    title: "Sistem Informasi Antrian Rumah Sakit",
    description: "Platform manajemen antrian pasien berbasis web.",
    url: "https://siars.example.com",
    siteName: "SIARS",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sistem Informasi Antrian Rumah Sakit",
    description: "Kelola antrian pasien rumah sakit secara efisien.",
    creator: "@siars_official",
  },
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
