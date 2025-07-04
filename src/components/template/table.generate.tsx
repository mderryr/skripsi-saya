import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import {
    PenyuNaik,
    TelurDikerami as Diinkubasi,
    TelurMenetas,
    Inkubasi as Dirawat,
    TukikMati,
    Pelepasan
} from '@/types'
import moment from 'moment';

Font.register({
  family: 'Helvetica',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/fonts/fa-solid-900.ttf',
});

interface LogData {
  tanggal: string;
  aktivitas: string;
  jumlah: number;
}

interface HalamanKeduaProps {
  dataBulanan: {
    penyuNaik: PenyuNaik[];
    telurDikerami: Diinkubasi[];
    telurMenetas: TelurMenetas[];
    inkubasi: Dirawat[];
    tukikMati: TukikMati[];
    pelepasan: Pelepasan[];
  };
}

export const HalamanKedua: React.FC<HalamanKeduaProps> = ({ dataBulanan }) => {
    const generateLogs = (): LogData[] => {
      const logs: LogData[] = [];
  
      // Log Penyu Naik (Bertelur dan Tidak Bertelur)
      dataBulanan.penyuNaik.forEach(item => 
        logs.push({
          tanggal: moment(item.tanggalData).format('YYYY-MM-DD'),
          aktivitas: item.penyuBertelur ? 'Penyu Naik Bertelur' : 'Penyu Naik Tidak Bertelur',
          jumlah: item.jumlahPenyu || 0
        })
      );
  
      // Log Telur Dikerami
      dataBulanan.telurDikerami.forEach(item => 
        logs.push({
          tanggal: moment(item.tanggalData).format('YYYY-MM-DD'),
          aktivitas: 'Telur Dikerami',
          jumlah: item.telurBaik || 0
        })
      );
  
      // Log Telur Menetas dan Tidak Menetas
      dataBulanan.telurMenetas.forEach(item => 
        logs.push({
          tanggal: moment(item.tanggalData).format('YYYY-MM-DD'),
          aktivitas: item.telurMenetas ? 'Telur Menetas' : 'Telur Tidak Menetas',
          jumlah: item.telurMenetas ? item.telurMenetas : item.telurRusak || 0
        })
      );
  
      // Log Inkubasi
      dataBulanan.inkubasi.forEach(item => 
        logs.push({
          tanggal: moment(item.tanggalData).format('YYYY-MM-DD'),
          aktivitas: 'Dirawat',
          jumlah: item.JumlahTukik
        })
      );
  
      // Log Tukik Mati
      dataBulanan.tukikMati.forEach(item => 
        logs.push({
          tanggal: moment(item.tanggalData).format('YYYY-MM-DD'),
          aktivitas: 'Tukik Mati',
          jumlah: item.penyuMati ||0
        })
      );
  
      // Log Pelepasan Tukik
      dataBulanan.pelepasan.forEach(item => 
        logs.push({
          tanggal: moment(item.tanggalData).format('YYYY-MM-DD'),
          aktivitas: 'Pelepasan Tukik',
          jumlah: item.JumlahTukik
        })
      );
  
      // Urutkan log dari tanggal termuda ke tertua
      return logs.sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
    };
  
    const logs = generateLogs();
  
    return (
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Data Log Aktivitas Penyu</Text>
          <Text style={styles.subTitle}>
            Laporan komprehensif ini menggambarkan serangkaian aktivitas konservasi penyu, 
            mulai dari proses penyu naik bertelur hingga pelepasan tukik. Setiap entri 
            mencerminkan dedikasi tim dalam menjaga keberlangsungan siklus hidup penyu.
          </Text>
        </View>
  
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Tanggal</Text>
            <Text style={styles.tableHeaderCell}>Aktivitas</Text>
            <Text style={styles.tableHeaderCell}>Jumlah</Text>
          </View>
          {logs.map((log, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{log.tanggal}</Text>
              <Text style={styles.tableCell}>{log.aktivitas}</Text>
              <Text style={styles.tableCell}>{log.jumlah}</Text>
            </View>
          ))}
        </View>
      </Page>
    );
  };
  
// Styles untuk tata letak halaman
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 12,
    marginBottom: 10,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
  },
  tableHeaderCell: {
    width: '33.33%',
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    width: '33.33%',
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
  },
});
