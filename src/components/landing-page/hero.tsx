// components/landing/Hero.tsx

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
    return (
        <section
            id="main"
            className="flex  items-center w-full h-screen dark:bg-gradient-to-t dark:from-black dark:to-gray-900">
            {/* Text Section */}
            <div className="flex flex-col justify-center md:w-1/2 space-y-6 lg:px-12 dark:text-gray-50 px-5 " >
                <h2 className="text-4xl font-bold text-black dark:text-gray-50 animate-in">  Si Penyu</h2>
                <p className="text-lg text-black dark:text-gray-50">
                    Sebuah langkah digital dalam menjaga keberlanjutan ekosistem laut. Si Penyu hadir untuk mempermudah proses pendataan,
                    pengawasan, serta pelaporan konservasi penyu — langsung dari tangan para pejuang lingkungan.
                </p>
                <Button className="text-base px-6 py-6 rounded-full">
                   Lihat Data
                </Button>
            </div>

            {/* Image Section */}
            <div className="relative w-1/2 h-full -mr-5 -mt-32 z-0 hidden md:block ">
                <Image
                    src="https://images.unsplash.com/photo-1501791187590-9ef2612ba1eb?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Anna Wangler from Unsplash"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-xl"
                />
            </div>
        </section>
    );
}
