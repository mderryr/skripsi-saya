// components/landing/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Si Penyu</h3>
          <p className="text-sm">
            Sistem informasi pendataan, pengawasan, dan pelaporan konservasi penyu Indonesia.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Beranda</Link></li>
            <li><Link href="/pendataan" className="hover:underline">Pendataan</Link></li>
            <li><Link href="/tentang-kami" className="hover:underline">Tentang Kami</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Kontak</h4>
          <p className="text-sm">Email: -</p>
          <p className="text-sm">Telepon: +62 813-3216-0311</p>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Si Penyu. Semua Hak Dilindungi.
      </div>
    </footer>
  );
}
