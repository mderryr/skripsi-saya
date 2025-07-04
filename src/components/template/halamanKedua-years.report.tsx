'use client'

import React, { CSSProperties } from 'react';
import { namaBulanPanjang } from '@/utils/nama-bulan.utils'

interface LogsData {
  json: {
    [month: string]: {
      PenyuNaikBertelur: number;
      PenyuNaikTakBertelur: number;
      TotalTelurDiselamatkan: number;
      TotalTelurMenetas: number;
      TotalTelurTakMenetas: number;
      TotalTukikDilepaskan: number;
      TotalTukikMati: number;
    };
  };
}

interface ReportProps {
  logsData: LogsData;
}
const styles: { [key: string]: CSSProperties } = {
  pageContainer: {
    width: '210mm',       // Lebar A4 standar
    maxWidth: '210mm',    // Maksimum lebar tetap 210mm
    height: '297mm',      // Tinggi A4 standar
    margin: '0 auto',     // Pusatkan secara horizontal
    padding: '10mm',      // Padding di sekitar konten
    boxSizing: 'border-box', // Pastikan padding tidak menambah ukuran total
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Distribusi vertikal
    overflow: 'hidden',  // Cegah konten meluap
  },
  content: {
    flex: '1',           // Biarkan konten mengisi ruang tersedia
    overflowY: 'auto',   // Scroll vertikal jika konten terlalu panjang
  },
  header: {
    width: '100%',
    textAlign: 'center',
    marginBottom: '15px',
    paddingBottom: '10px',
    borderBottom: '1px solid #e0e0e0',
  },
  title: {
    fontSize: '16px',
    color: '#2c3e50',
    margin: 0,
    fontWeight: 600,
  },
  subtitle: {
    fontSize: '12px',
    color: '#7f8c8d',
    marginTop: '5px',
  },
  footer: {
    width: '100%',
    textAlign: 'center',
    padding: '5mm 0',
    marginTop: 'auto',    // Dorong ke bawah
    borderTop: '1px solid #e0e0e0', // Garis pemisah ringan
    fontSize: '8px',
    color: '#666',
},
  dataTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    boxShadow: '0 2px 3px rgba(0,0,0,0.1)',
  },
  dataTableTh: {
    backgroundColor: '#f0f4f8',
    color: '#2c3e50',
    fontWeight: 'bold',
    padding: '10px',
    textAlign: 'left',
    borderBottom: '2px solid #e0e0e0',
    fontSize: '10px',
    textTransform: 'uppercase',
  },
  dataTableTd: {
    padding: '8px',
    borderBottom: '1px solid #f1f3f5',
    fontSize: '9px',
    verticalAlign: 'middle',
    color: '#333',
  },
  tableRow: {
    transition: 'background-color 0.3s ease',
  },
  // Variasi warna untuk sel dengan kondisi berbeda
  positiveValue: {
    color: '#2ecc71', // Hijau untuk nilai positif
    fontWeight: 'bold',
  },
  negativeValue: {
    color: '#e74c3c', // Merah untuk nilai nol/negatif
    fontWeight: 'bold',
  },
  neutralValue: {
    color: '#3498db', // Biru untuk nilai netral
  }
};

export const ReportYearsPageTwo: React.FC<ReportProps> = ({ logsData }) => {
  const months = Object.keys(logsData.json).sort((a, b) => {
    // Split kunci menjadi tahun dan bulan
    const [yearA, monthA] = a.split('-');
    const [yearB, monthB] = b.split('-');

    // Pertama, urutkan berdasarkan tahun
    if (yearA !== yearB) {
      return parseInt(yearA) - parseInt(yearB);
    }

    // Kemudian urutkan berdasarkan bulan numerik
    return parseInt(monthA) - parseInt(monthB);
  });

  // Menyusun data tahun untuk tukik menetas dan tidak menetas
  const yearlyData: { [year: string]: { menetas: number; tidakMenetas: number } } = {};
  months.forEach(month => {
    const year = month.split('-')[0]; // Ambil tahun dari bulan
    const menetas = logsData.json[month].TotalTelurMenetas;
    const tidakMenetas = logsData.json[month].TotalTelurTakMenetas;

    if (!yearlyData[year]) {
      yearlyData[year] = { menetas: 0, tidakMenetas: 0 };
    }

    yearlyData[year].menetas += menetas;
    yearlyData[year].tidakMenetas += tidakMenetas;
  });

  return (
    <div
      style={{
        ...styles.pageContainer,
        minHeight: '297mm', // Pastikan tinggi penuh
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <div style={styles.header}>
          <h1 style={styles.title}>
            Laporan Konservasi Penyu
          </h1>
          <h2 style={styles.subtitle}>
            Halaman 2: Detail Bulanan
          </h2>
        </div>

        <table style={{
          ...styles.dataTable,
          marginBottom: '20px' // Tambah margin bawah
        }}>
          <thead>
            <tr>
              <th style={{
                ...styles.dataTableTh,
                backgroundColor: '#f0f4f8',
                color: '#2c3e50',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}>Bulan</th>
              <th style={styles.dataTableTh}>Penyu Naik Bertelur</th>
              <th style={styles.dataTableTh}>Penyu Naik Tak Bertelur</th>
              <th style={styles.dataTableTh}>Total Telur Diselamatkan</th>
              <th style={styles.dataTableTh}>Total Telur Menetas</th>
              <th style={styles.dataTableTh}>Total Telur Tak Menetas</th>
              <th style={styles.dataTableTh}>Total Tukik Mati</th>
              <th style={styles.dataTableTh}>Total Tukik Dilepaskan</th>
            </tr>
          </thead>
          <tbody>
            {months.map((month, index) => (
              <tr
                key={month}
                // Tambahkan warna selang-seling dan hover effect
                style={{
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                  transition: 'background-color 0.3s ease'
                }}
              >
                <td style={{
                  ...styles.dataTableTd,
                  fontWeight: 'bold',
                  color: '#2c3e50'
                }}>
                  {month}
                </td>
                <td style={{
                  ...styles.dataTableTd,
                  color: logsData.json[month].PenyuNaikBertelur > 0
                    ? '#2ecc71' // Hijau untuk nilai positif 
                    : '#e74c3c' // Merah untuk nol atau negatif
                }}>
                  {logsData.json[month].PenyuNaikBertelur}
                </td>
                {/* Lakukan hal serupa untuk kolom lainnya */}
                <td style={{
                  ...styles.dataTableTd,
                  color: logsData.json[month].PenyuNaikTakBertelur > 0
                    ? '#3498db' // Biru untuk nilai positif
                    : '#e74c3c' // Merah untuk nol atau negatif
                }}>
                  {logsData.json[month].PenyuNaikTakBertelur}
                </td>
                <td style={{
                  ...styles.dataTableTd,
                  fontWeight: 'bold',
                  color: '#2980b9' // Warna biru untuk data diselamatkan
                }}>
                  {logsData.json[month].TotalTelurDiselamatkan}
                </td>
                <td style={{
                  ...styles.dataTableTd,
                  fontWeight: 'bold',
                  color: '#2980b9' // Warna biru untuk data Menetas
                }}>
                  {logsData.json[month].TotalTelurMenetas}
                </td>
                <td style={{
                  ...styles.dataTableTd,
                  fontWeight: 'bold',
                  color: '#2980b9' // Warna biru untuk data tak Menetas
                }}>
                  {logsData.json[month].TotalTelurTakMenetas || 0}
                </td>
                <td style={{
                  ...styles.dataTableTd,
                  fontWeight: 'bold',
                  color: '#2980b9' // Warna biru untuk data diselamatkan
                }}>
                  {logsData.json[month].TotalTukikMati}
                </td>

                <td style={{
                  ...styles.dataTableTd,
                  fontWeight: 'bold',
                  color: '#2980b9' // Warna biru untuk data diselamatkan
                }}>
                  {logsData.json[month].TotalTukikDilepaskan}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        {/* Tambahkan ringkasan atau paragraf tambahan */}
        <div style={{
          ...styles.content,
          padding: '0 10px',
          fontSize: '10px',
          marginTop: '20px'
        }}>
          <h3 style={{
            fontSize: '12px',
            color: '#2c3e50',
            borderBottom: '1px solid #e0e0e0',
            paddingBottom: '5px'
          }}>
            Catatan Tambahan
          </h3>
          <p style={styles.paragraph}>
            Tabel di atas menunjukkan rincian aktivitas konservasi penyu selama periode pelaporan.
            Setiap baris mewakili data bulanan yang mencakup informasi kunci seperti jumlah penyu
            yang naik, telur yang diselamatkan, dan tukik yang dilepaskan.
          </p>
          <p style={styles.paragraph}>
            Analisis data menunjukkan variasi signifikan dalam aktivitas penyu setiap bulannya.
            Faktor seperti musim, kondisi cuaca, dan upaya konservasi mempengaruhi hasil
            perlindungan penyu di wilayah ini.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        ...styles.footer,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}>
        <p>Halaman 3 dari 3 - Laporan Akhir Konservasi</p>
      </div>
    </div>
  );
};

export default ReportYearsPageTwo
