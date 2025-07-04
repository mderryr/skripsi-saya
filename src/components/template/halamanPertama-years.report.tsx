'use client'

import React, { CSSProperties } from 'react';
import moment from 'moment';

interface LaporanKEEProps {
  data: {
    idDok: string;
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


const ReportYearsPageOne: React.FC<LaporanKEEProps> = ({ data }) => {

  return (
    <div 
      style={{
        ...styles.container,
        minHeight: '297mm', // Pastikan tinggi penuh
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between' // Distribusi konten
      }}
    >
      <div>
        {/* Bagian header tetap sama */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            Laporan Tahunan KEE Pantai Taman Kili-Kili
          </h1>
        </div>
{/* Bagian metadata tetap sama */}
<div style={styles.metaData}>
          <div style={styles.metaLeft}>
            <p><strong>Lokasi:</strong> {"Pantai Taman Kili-Kili"}</p>
            <p><strong>ID Dokumen:</strong> {data.idDok}</p>
            <p><strong>Halaman:</strong> 1 dari 3</p>
            <p><strong>Untuk:</strong> Pembaca Laporan</p>
          </div>
        </div>

        {/* Konten utama */}
        <div style={styles.content}>
          {/* Paragraf dan konten lainnya */}
          <p style={styles.paragraph}>
            Laporan ini disusun berdasarkan hasil kegiatan konservasi penyu yang telah dilaksanakan di Pantai Taman Kili-Kili selama tahun {data.Tahun}. Kami menyusun laporan ini sebagai bentuk pertanggungjawaban dan dokumentasi resmi dari upaya pelestarian lingkungan yang telah dilakukan.
          </p>

          {/* Tambahkan paragraf tambahan jika perlu */}
          <p style={styles.paragraph}>
            Dalam upaya konservasi, kami telah melakukan berbagai kegiatan yang bertujuan untuk melindungi dan melestarikan populasi penyu di wilayah ini. Setiap langkah yang kami ambil didasarkan pada pendekatan ilmiah dan praktik terbaik dalam konservasi lingkungan.
          </p>

          {/* Tabel data tetap sama */}
          <h2 style={{fontSize: '12px', marginBottom: '5px'}}>Data Konservasi Tahunan</h2>
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

        <p style={styles.paragraph}>
            Komitmen kami terhadap konservasi penyu tidak hanya sebatas pada penyelamatan telur dan tukik, namun juga meliputi edukasi masyarakat, penelitian berkelanjutan, dan upaya perlindungan habitat.
          </p>
        </div>
      </div>

        {/* Footer dengan posisi di bawah */}
        <div
          style={{
            ...styles.footer,
            marginTop: 'auto' // Dorong ke bawah
          }}
        >
          <p>
            {"Trenggalek"}, {moment(data.TanggalDibuat).format('DD MMMM YYYY')}
          </p>
          <p>Pokmaswas</p>
          <p>Halaman 1 dari 3</p>
        </div>
      </div>

  );
};

export default ReportYearsPageOne