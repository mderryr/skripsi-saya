'use client'

import React, { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


// Definisikan tipe props dengan array halaman
interface ReportButtonProps {
  halaman: React.ReactElement[]; // Array dari halaman
  namaFile?: string;
  styleHalaman?: React.CSSProperties; // Opsional: style kustom untuk setiap halaman
}

export default function ReportButton({
  halaman,
  namaFile = "Laporan.pdf",
  styleHalaman // Style default jika tidak disediakan
}: ReportButtonProps) {

  // Default style halaman jika tidak diberikan
  const defaultStyleHalaman: React.CSSProperties = {
    width: '210mm',
    minHeight: '297mm',
    maxHeight: '297mm',
    display: 'flex',
    flexDirection: 'column',
    padding: '10mm',
    boxSizing: 'border-box',
    position: 'relative',
    pageBreakAfter: 'always', // Pastikan page break
    overflow: 'hidden'
  };


  const downloadPDF = async () => {
    const element = document.getElementById('halamanLaporan');

    if (element) {
      const pages = element.querySelectorAll('.page-break');

      // Log jumlah halaman
      console.log('Jumlah Halaman:', pages.length);

      const pdf = new jsPDF({
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      });

      for (const [index, page] of Array.from(pages).entries()) {
        const canvas = await html2canvas(page as HTMLElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          width: 794,
          height: 1123
        });

        const imgData = canvas.toDataURL('image/jpeg');

        // Log setiap proses konversi halaman
        console.log(`Memproses Halaman ${index + 1}`);

        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);

        if (index < pages.length - 1) {
          pdf.addPage();
        }
      }

      pdf.save(namaFile);
    }
  };
  useEffect(() => {
    // Memastikan konten dimuat dengan benar
    console.log('Halaman yang akan di-export:', halaman);
  }, [halaman]);

  return (
    <section className="pt-20 md:pt-24 lg:pt-28 px-4">
      {/* Tombol Navigasi */}
      <div className="flex justify-between items-center mb-4">
        <Link href="/admin/proses">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Kembali
          </Button>
        </Link>

        <Button type='button' onClick={downloadPDF}>
          Download Laporan
        </Button>
      </div>
      {/* Wrapper untuk halamanLaporan */}
      <div style={{
        width: '100%', // Sesuaikan dengan lebar perangkat
        height: 'auto', // Sesuaikan dengan tinggi perangkat
        overflow: 'auto', // Tambahkan scroll jika konten melebihi tinggi
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px', // Tambahkan padding untuk tampilan lebih baik
        boxSizing: 'border-box',
        backgroundColor: 'white', // Pastikan background putih untuk wrapper
        position: 'relative' // Pastikan posisi relative untuk elemen di dalamnya
      }}>
        <div
          id="halamanLaporan"
          style={{
            display: 'block',
            width: '100%', // Sesuaikan lebar dengan perangkat
            maxWidth: '210mm', // Maksimal lebar A4
            backgroundColor: 'white', // Pastikan background putih
            padding: '10mm', // Tambahkan padding untuk konten
            height: 'auto', // Biarkan tinggi otomatis agar tidak terpotong
          }}
        >
          {halaman.map((HalamanComponent, index) => (
            <div
              key={index}
              className="page-break"
              style={{
                ...defaultStyleHalaman,
                ...(styleHalaman || {}),
                pageBreakAfter: 'always',
                minHeight: '297mm',
                height: 'auto', // Biarkan tinggi otomatis agar tidak terpotong
                overflow: 'hidden',
                backgroundColor: 'white' // Pastikan background putih
              }}
            >
              {HalamanComponent}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}