// app/tentang-kami/page.tsx

import Link from "next/link";
import Navbar from "@/components/another/navbar-all.component";
import Footer from "@/components/another/footer";

export default function TentangKami() {
    return (
        <>
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-16 space-y-12 text-black dark:text-white">
                <section>
                    <h1 className="text-4xl font-bold mb-4">Tentang Si Penyu</h1>
                    <p className="text-lg">
                        Si Penyu adalah sistem informasi yang dikembangkan untuk mendukung konservasi penyu di Indonesia.
                        Melalui platform ini, pengguna dapat melakukan pendataan, pengawasan, dan pelaporan aktivitas konservasi
                        secara digital. Kami percaya bahwa teknologi dapat menjadi jembatan untuk menciptakan ekosistem laut yang
                        lebih lestari.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Terima Kasih</h2>
                    <p className="text-base">
                        Kami mengucapkan terima kasih sebesar-besarnya kepada pihak yang telah menjadi inisiator dan sponsor awal,
                        yaitu Pertamina Patra Niaga dan Universitas Brawijaya. Terima kasih juga terhadap Pokmaswas Pantai Taman Kili Kili sebagai tempat uji coba sistem ini.
                        Dukungan mereka menjadi pondasi penting dalam pengembangan awal platform ini.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Buku Panduan</h2>
                    <p className="text-base mb-2">
                        Untuk memahami cara kerja dan alur penggunaan sistem Si Penyu, Anda dapat membaca buku panduan kami melalui link berikut:
                    </p>
                    <Link
                        href="#"
                        className="inline-block bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
                        target="_blank"
                    >
                        Baca Buku Panduan
                    </Link>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Update Mendatang</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Perbaikan tampilan </li>
                        <li>Dashboard analitik real-time untuk visualisasi data konservasi.</li>
                        <li>Fitur Sponsor untuk pihak konservasi</li>
                    </ul>
                </section>
            </main>
            <Footer />

        </>
    );
}
