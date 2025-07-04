'use client'

import React, { CSSProperties, useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { DynamicDoughnutChart } from '@/components/Chart/doughnat';
import moment from 'moment';
import {convertChartToDataUrl} from '@/components/Chart/converter';

interface LaporanKEEProps {
  data: {
    idDok: string;
    Bulan: number;
    Tahun: number;
    PenyuNaikTakBertelur: number;
    PenyuNaikBertelur: number;
    TotalTelurDiselamatkan: number;
    TotalTelurMenetas: number;
    TotalTelurTakMenetas: number;
    TotalTukikMati: number;
    TotalTukikDilepaskan: number;
    TanggalDibuat: Date;
    Tempat: string;
  }
}

const HalamanPertama: React.FC<LaporanKEEProps> = ({ data }) => {

 // State untuk menyimpan data URL chart
 const [penyuNaikChartDataUrl, setPenyuNaikChartDataUrl] = useState<string | null>(null);
 const [penetasanTelurChartDataUrl, setPenetasanTelurChartDataUrl] = useState<string | null>(null);

 // Effect untuk mengonversi chart ke data URL
 useEffect(() => {
   const loadChartDataUrls = async () => {
     // Konfigurasi chart Komposisi Penyu Naik
     const penyuNaikChartConfig = {
       type: 'doughnut',
       data: {
         labels: ['Penyu Naik Bertelur', 'Penyu Naik Tak Bertelur'],
         datasets: [{
           label: 'Komposisi Penyu Naik',
           data: [data.PenyuNaikBertelur, data.PenyuNaikTakBertelur],
           backgroundColor: ['#36A2EB', '#FF6384']
         }]
       },
       options: {
         responsive: false,
         width: 400,
         height: 300
       }
     };

     // Konfigurasi chart Komposisi Penetasan Telur
     const penetasanTelurChartConfig = {
       type: 'doughnut',
       data: {
         labels: ['Telur Menetas', 'Telur Tak Menetas'],
         datasets: [{
           label: 'Komposisi Penetasan Telur',
           data: [data.TotalTelurMenetas, data.TotalTelurTakMenetas],
           backgroundColor: ['#4CAF50', '#F44336']
         }]
       },
       options: {
         responsive: false,
         width: 400,
         height: 300
       }
     };

     // Konversi chart ke data URL
     const penyuNaikDataUrl = await convertChartToDataUrl(penyuNaikChartConfig);
     const penetasanTelurDataUrl = await convertChartToDataUrl(penetasanTelurChartConfig);

     // Set state dengan data URL chart
     setPenyuNaikChartDataUrl(penyuNaikDataUrl);
     setPenetasanTelurChartDataUrl(penetasanTelurDataUrl);
   };

   loadChartDataUrls();
 }, [data]);

 const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: '210mm', // Lebar A4
    margin: '0 auto',
    padding: '10mm', // Margin kertas
    fontSize: '11px', // Ukuran font lebih kecil
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '5px'
  },
  title: {
    textAlign: 'center',
    fontSize: '16px', // Diperkecil
    color: '#333',
    fontWeight: 'bold'
  },
  metaData: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    backgroundColor: '#f4f4f4',
    padding: '5px',
    borderRadius: '3px',
    fontSize: '9px' // Diperkecil
  },
  metaLeft: {
    width: '100%'
  },
  content: {
    lineHeight: 1.4 // Diperapat
  },
  paragraph: {
    marginBottom: '8px', // Diperkecil
    textAlign: 'justify',
    fontSize: '10px' // Diperkecil
  },
  dataTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '10px',
    fontSize: '9px' // Diperkecil
  },
  dataTableTd: {
    border: '1px solid #ddd',
    padding: '4px', // Diperkecil
    fontSize: '9px'
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  chart: {
    width: '48%'
  },
  chartTitle: {
    textAlign: 'center',
    marginBottom: '5px',
    fontSize: '10px'
  },
  footer: {
    textAlign: 'right',
    marginTop: '15px',
    borderTop: '1px solid #ddd',
    paddingTop: '10px',
    fontSize: '9px'
  },
  signature: {
    marginTop: '5px',
    fontWeight: 'bold',
    borderBottom: '1px solid #333',
    display: 'inline-block',
    paddingBottom: '3px',
    fontSize: '9px'
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          Laporan KEE Pantai Taman Kili-Kili
        </h1>
      </div>

      <div style={styles.metaData}>
        <div style={styles.metaLeft}>
          <p><strong>Lokasi:</strong> {"Pantai Taman Kili-Kili"}</p>
          <p><strong>ID Dokumen:</strong> {data.idDok}</p>
          <p><strong>Halaman:</strong> 1 dari 2</p>
          <p><strong>Untuk:</strong> Pembaca Laporan</p>
        </div>
      </div>

      <div style={styles.content}>

        <p style={styles.paragraph}>
          Berdasarkan hasil kegiatan konservasi penyu yang dilaksanakan di Pantai Taman Kili-Kili pada bulan {new Date(data.Tahun, data.Bulan - 1).toLocaleString('id-ID', { month: 'long' })} {data.Tahun}, kami menyusun laporan ini sebagai bentuk pertanggungjawaban dan dokumentasi resmi kegiatan pelestarian lingkungan.
        </p>

        <p>
          Laporan ini disusun untuk memberikan gambaran komprehensif tentang
          kegiatan konservasi penyu yang telah dilaksanakan selama satu bulan
          di Pantai Taman Kili-Kili.
        </p>

        <h2>Data Konservasi</h2>
        <table style={styles.dataTable}>
          <tbody>
            <tr>
              <td style={styles.dataTableTd}>Penyu Naik Bertelur</td>
              <td style={styles.dataTableTd}>{data.PenyuNaikBertelur}</td>
            </tr>
            <tr>
              <td style={styles.dataTableTd}>Penyu Naik Tak Bertelur</td>
              <td style={styles.dataTableTd}>{data.PenyuNaikTakBertelur}</td>
            </tr>
            <tr>
              <td style={styles.dataTableTd}>Total Telur Diselamatkan</td>
              <td style={styles.dataTableTd}>{data.TotalTelurDiselamatkan}</td>
            </tr>
            <tr>
              <td style={styles.dataTableTd}>Total Telur Menetas</td>
              <td style={styles.dataTableTd}>{data.TotalTelurMenetas}</td>
            </tr>
            <tr>
              <td style={styles.dataTableTd}>Total Telur Tak Menetas</td>
              <td style={styles.dataTableTd}>{data.TotalTelurTakMenetas}</td>
            </tr>
            <tr>
              <td style={styles.dataTableTd}>Total Tukik Mati</td>
              <td style={styles.dataTableTd}>{data.TotalTukikMati}</td>
            </tr>
            <tr>
              <td style={styles.dataTableTd}>Total Tukik Dilepaskan</td>
              <td style={styles.dataTableTd}>{data.TotalTukikDilepaskan}</td>
            </tr>
          </tbody>
        </table>

        <div style={styles.chartContainer}>
        <div style={styles.chart}>
          <h3 style={styles.chartTitle}>Komposisi Penyu Naik</h3>
          {penyuNaikChartDataUrl ? (
            <Image 
              src={penyuNaikChartDataUrl}
              alt="Komposisi Penyu Naik"
              width={400}
              height={300}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <DynamicDoughnutChart
              labels={['Penyu Naik Bertelur', 'Penyu Naik Tak Bertelur']}
              data={[data.PenyuNaikBertelur, data.PenyuNaikTakBertelur]}
              title="Komposisi Penyu Naik"
              backgroundColor={['#36A2EB', '#FF6384']}
            />
          )}
        </div>
        <div style={styles.chart}>
          <h3 style={styles.chartTitle}>Komposisi Penetasan Telur</h3>
          {penetasanTelurChartDataUrl ? (
            <Image 
              src={penetasanTelurChartDataUrl}
              alt="Komposisi Penetasan Telur"
              width={400}
              height={300}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <DynamicDoughnutChart
              labels={['Telur Menetas', 'Telur Tak Menetas']}
              data={[data.TotalTelurMenetas, data.TotalTelurTakMenetas]}
              title="Komposisi Penetasan Telur"
              backgroundColor={['#4CAF50', '#F44336']}
            />
          )}
        </div>
      </div>

        <p style={styles.paragraph}>
          Semoga upaya konservasi yang kami lakukan dapat memberikan kontribusi
          positif bagi pelestarian habitat penyu di Pantai Taman Kili-Kili.
          Kami berharap keberadaan penyu tetap terjaga dan berkembang dengan baik.
        </p>

        <div style={styles.footer}>
          <p>
            {"Trenggalek"}, {moment(data.TanggalDibuat).format('DD MMMM YYYY')}
          </p>
          <p>Pokmaswas</p>
          {/* <div style={styles.signature}>
            <p>Seluruh Pokmaswas</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HalamanPertama
