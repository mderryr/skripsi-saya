import React from 'react';
import moment from 'moment';
import { LogData } from '@/types';

interface HalamanKeduaProps {
  dataBulanan:LogData[]
}

export const HalamanKedua: React.FC<HalamanKeduaProps> = ({ dataBulanan }) => {
  
    return (
        <div style={{
          maxWidth: '210mm', // Lebar A4
          margin: '0 auto',
          padding: '10mm', // Margin kertas
          fontFamily: 'Arial, sans-serif',
          fontSize: '10px' // Ukuran font lebih kecil
        }}>
          <div style={{ marginBottom: '10px' }}>
            <h1 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '8px',
              textAlign: 'center',
              borderBottom: '1px solid #ddd',
              paddingBottom: '5px'
            }}>
              Data Log Aktivitas Penyu
            </h1>
            <p style={{
              color: '#666',
              marginBottom: '10px',
              textAlign: 'justify',
              fontSize: '9px'
            }}>
              Laporan komprehensif ini menggambarkan serangkaian aktivitas konservasi penyu, 
              mulai dari proses penyu naik bertelur hingga pelepasan tukik. Setiap entri 
              mencerminkan dedikasi tim dalam menjaga keberlangsungan siklus hidup penyu.
            </p>
          </div>
  
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #ddd',
              fontSize: '9px'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f4f4f4' }}>
                  <th style={{
                    border: '1px solid #ddd',
                    padding: '4px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}>Tanggal</th>
                  <th style={{
                    border: '1px solid #ddd',
                    padding: '4px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}>Aktivitas</th>
                  <th style={{
                    border: '1px solid #ddd',
                    padding: '4px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {dataBulanan.map((log, index) => (
                  <tr 
                    key={index} 
                    style={{ 
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
                      transition: 'background-color 0.3s ease'
                    }}
                  >
                    <td style={{
                      border: '1px solid #ddd',
                      padding: '3px',
                      textAlign: 'center'
                    }}>
                      {log.tanggal}
                    </td>
                    <td style={{
                      border: '1px solid #ddd',
                      padding: '3px',
                      textAlign: 'center'
                    }}>
                      {log.aktivitas}
                    </td>
                    <td style={{
                      border: '1px solid #ddd',
                      padding: '3px',
                      textAlign: 'center'
                    }}>
                      {log.jumlah}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          {/* Tambahkan footer untuk nomor halaman */}
          <div style={{
            marginTop: '10px',
            textAlign: 'center',
            fontSize: '8px',
            color: '#666',
            borderTop: '1px solid #ddd',
            paddingTop: '5px'
          }}>
            Halaman 2 dari 2
          </div>
        </div>
      );
    };

  export default HalamanKedua;