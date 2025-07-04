// components/landing/Features.tsx

import { LucideShieldCheck, LucideSearchCheck, LucideBarChart2, LucideSmartphone } from "lucide-react";
import {NeonDivider} from '@/components/another/devider.component'
const features = [
    {
        icon: LucideSearchCheck,
        title: "Pendataan Lengkap",
        description: "Catat semua aktivitas konservasi penyu secara real-time dan terstruktur.",
    },
    {
        icon: LucideShieldCheck,
        title: "Pengawasan Terintegrasi",
        description: "Pantau aktivitas dan progres konservasi dari satu platform terpadu.",
    },
    {
        icon: LucideBarChart2,
        title: "Laporan Otomatis",
        description: "Bangun laporan otomatis dengan visualisasi data yang mudah dipahami."
    },
    {
        icon: LucideSmartphone,
        title: "Akses Multi-Device",
        description: "Gunakan Si Penyu dari perangkat apa pun — desktop, tablet, hingga smartphone."
    },
];

export default function Features() {
    return (
        <section className="relative w-full h-screen flex items-center bg-white dark:bg-black">
            <NeonDivider />
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-12">
                    Fitur Unggulan Si Penyu
                </h2>
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="rounded-2xl shadow-md p-6 text-center border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-xl transition"
                        >
                            <feature.icon className="h-10 w-10 mx-auto mb-4 text-black dark:text-white" />
                            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
