"use client";
import Footer from "@/components/another/footer";
import Navbar from "@/components/another/navbar-all.component";
import { useQuery } from "@tanstack/react-query";
import { DynamicLineChart, BarChart, convertChartToDataUrl, downloadChartBinary } from '@/components/Chart';
import { TIME } from '@/env/time.mjs';
import { getReportByYear } from '@/services/report';
import { queryKeys } from "@/services";
import EmptyView from '@/components/another/empty-view.component';
import { Button } from "@/components/ui/button";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ViewPedataanAll() {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.tahunan.all,
    queryFn: () => getReportByYear(),
    gcTime: TIME.CACHE.LONG,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  // Mengambil data dari response
  const yearlyData = data?.data; // Asumsikan data adalah array dari objek tahunan
  if (!Array.isArray(yearlyData)) {
    return (<EmptyView />)
  }

  // Menyiapkan data untuk chart
  const years = yearlyData.map(item => item.Tahun.toString());
  const penyuNaikBertelur = yearlyData.map(item => item.PenyuNaikBertelur);
  const penyuNaikTakBertelur = yearlyData.map(item => item.PenyuNaikTakBertelur);
  const totalTelurDiselamatkan = yearlyData.map(item => item.TotalTelurDiselamatkan);
  const totalTelurMenetas = yearlyData.map(item => item.TotalTelurMenetas);
  const totalTelurTakMenetas = yearlyData.map(item => item.TotalTelurTakMenetas);
  const totalTukikMati = yearlyData.map(item => item.TotalTukikMati);
  const totalTukikDilepaskan = yearlyData.map(item => item.TotalTukikDilepaskan);

  const downloadCharts = async () => {
    const element = document.getElementById('halamanLaporan');
    if (element) {
      const pdf = new jsPDF();
      const charts = element.querySelectorAll('canvas'); // Ambil semua canvas chart
  
      const margin = 15; // Margin untuk PDF
      const imgWidth = 180; // Lebar gambar
      const imgHeight = 100; // Tinggi gambar
      const titleFontSize = 16; // Ukuran font untuk judul
      const subtitleFontSize = 14; // Ukuran font untuk sub judul
      const descriptionFontSize = 12; // Ukuran font untuk deskripsi
      const additionalInfoFontSize = 10; // Ukuran font untuk informasi tambahan
  
      for (let i = 0; i < charts.length; i++) {
        const chart = charts[i];
  
        // Mengonversi canvas chart menjadi gambar
        const canvasImage = await html2canvas(chart);
        const imgData = canvasImage.toDataURL('image/png');
  
        // Menambahkan keterangan untuk setiap chart
        let title = '';
        let subtitle = '';
        let description = '';
        let additionalInfo = '';
  
        // Menentukan keterangan dan informasi tambahan berdasarkan indeks chart
        switch (i) {
          case 0:
            title = 'Penyu Naik Bertelur dan Tidak Bertelur per Tahun';
            subtitle = 'Statistik Penyu';
            description = 'Grafik ini menunjukkan jumlah penyu yang naik bertelur dan tidak bertelur setiap tahun.';
            additionalInfo = 'Data ini diambil dari pengamatan.';
            break;
          case 1:
            title = 'Telur Diselamatkan per Tahun';
            subtitle = 'Statistik Penyelamatan';
            description = 'Grafik ini menunjukkan total telur yang diselamatkan setiap tahun.';
            additionalInfo = 'Telur diselamatkan dari berbagai lokasi penyu bertelur.';
            break;
          case 2:
            title = 'Telur Menetas dan Tidak Menetas per Tahun';
            subtitle = 'Statistik Penetasan';
            description = 'Grafik ini menunjukkan jumlah telur yang menetas dan tidak menetas setiap tahun.';
            additionalInfo = 'Menunjukkan tingkat keberhasilan penetasan telur.';
            break;
          case 3:
            title = 'Tukik Mati per Tahun';
            subtitle = 'Statistik Kematian';
            description = 'Grafik ini menunjukkan jumlah tukik yang mati setiap tahun.';
            additionalInfo = 'Data ini mencakup berbagai penyebab kematian.';
            break;
          case 4:
            title = 'Tukik Dilepaskan per Tahun';
            subtitle = 'Statistik Pelepasan';
            description = 'Grafik ini menunjukkan jumlah tukik yang dilepaskan setiap tahun.';
            additionalInfo = 'Tukik dilepaskan ke habitat alami mereka.';
            break;
          default:
            break;
        }
  
        // Menambahkan judul chart
        pdf.setFontSize(titleFontSize);
        pdf.text(title, margin, pdf.internal.pageSize.getHeight() - 200); // Menambahkan judul di atas gambar
  
        // Menambahkan sub judul
        pdf.setFontSize(subtitleFontSize);
        pdf.text(subtitle, margin, pdf.internal.pageSize.getHeight() - 185); // Menambahkan sub judul di bawah judul
  
        // Menambahkan garis pemisah
        pdf.setDrawColor(0, 0, 0); // Warna garis hitam
        pdf.setLineWidth(0.5);
        pdf.line(margin, pdf.internal.pageSize.getHeight() - 180, pdf.internal.pageSize.getWidth() - margin, pdf.internal.pageSize.getHeight() - 180); // Garis horizontal
  
        // Menambahkan gambar ke PDF
        pdf.addImage(imgData, 'PNG', margin, pdf.internal.pageSize.getHeight() - 160, imgWidth, imgHeight); // Sesuaikan posisi dan ukuran gambar
  
        // Menambahkan deskripsi di bawah gambar
        pdf.setFontSize(descriptionFontSize);
        pdf.text(description, margin, pdf.internal.pageSize.getHeight() - 50); // Menambahkan deskripsi di bawah gambar
  
        // Menambahkan informasi tambahan
        pdf.setFontSize(additionalInfoFontSize);
        pdf.text(additionalInfo, margin, pdf.internal.pageSize.getHeight() - 35); // Menambahkan informasi tambahan di bawah deskripsi
  
        // Tambahkan halaman baru hanya jika bukan grafik terakhir
        if (i < charts.length - 1) {
          pdf.addPage(); // Tambahkan halaman baru untuk grafik berikutnya
        }
      }
  
      // Mengunduh PDF
      pdf.save('charts.pdf');
    }
  };


  return (
    <>
      <Navbar />
      <div className="p-4 space-y-8" id="halamanLaporan">
        {/* Judul Besar */}
        <h1 className="text-3xl font-bold text-center mb-6">
          Grafik Pendataan Penyu Di KEE Pantai Kili Kili
        </h1>

        {/* Chart 1: Bar Chart Penyu Naik Bertelur dan Tidak Bertelur */}
        <div className="max-w-2xl mx-auto">
          <BarChart
            labels={years}
            datasets={[
              {
                label: 'Penyu Naik Bertelur',
                data: penyuNaikBertelur,
                backgroundColor: 'rgba(75, 192, 192, 0.8)', // Gelap
              },
              {
                label: 'Penyu Naik Tak Bertelur',
                data: penyuNaikTakBertelur,
                backgroundColor: 'rgba(255, 99, 132, 0.8)', // Gelap
              },
            ]}
            title="Penyu Naik Bertelur dan Tidak Bertelur per Tahun"
          />
        </div>

        {/* Chart 2: Line Chart Telur Diselamatkan */}
        <div className="max-w-2xl mx-auto">
          <DynamicLineChart
            labels={years}
            datasets={[
              {
                label: 'Total Telur Diselamatkan',
                data: totalTelurDiselamatkan,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.4)', // Gelap
                fill: true,
              },
            ]}
            title="Telur Diselamatkan per Tahun"
          />
        </div>

        {/* Chart 3: Bar Chart Telur Menetas dan Tidak Menetas */}
        <div className="max-w-2xl mx-auto">
          <BarChart
            labels={years}
            datasets={[
              {
                label: 'Total Telur Menetas',
                data: totalTelurMenetas,
                backgroundColor: 'rgba(75, 192, 192, 0.8)', // Gelap
              },
              {
                label: 'Total Telur Tak Menetas',
                data: totalTelurTakMenetas,
                backgroundColor: 'rgba(255, 99, 132, 0.8)', // Gelap
              },
            ]}
            title="Telur Menetas dan Tidak Menetas per Tahun"
          />
        </div>

        {/* Chart 4: Line Chart Tukik Mati */}
        <div className="max-w-2xl mx-auto">
          <DynamicLineChart
            labels={years}
            datasets={[
              {
                label: 'Total Tukik Mati',
                data: totalTukikMati,
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.4)', // Gelap
                fill: true,
              },
            ]}
            title="Tukik Mati per Tahun"
          />
        </div>

        {/* Chart 5: Line Chart Tukik Dilepas */}
        <div className="max-w-2xl mx-auto">
          <DynamicLineChart
            labels={years}
            datasets={[
              {
                label: 'Total Tukik Dilepaskan',
                data: totalTukikDilepaskan,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.4)', // Gelap
                fill: true,
              },
            ]}
            title="Tukik Dilepaskan per Tahun"
          />
        </div>

        {/* Tombol Download */}
        <div className="flex justify-center mt-6">
          <Button
            onClick={downloadCharts}
            variant="default"
            className="px-4 py-2  "
          >
            Download Grafik
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
