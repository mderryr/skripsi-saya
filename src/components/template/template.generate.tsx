import {ReportBulanan as PenyimpananBulanan } from '@/types'
import { StyleSheet, Document, Page, View, Text, Image } from '@react-pdf/renderer';
import GrafikKonservasi from './chart.generate';

const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: 11,
      paddingTop: 30,
      paddingLeft: 60,
      paddingRight: 60,
      lineHeight: 1.5,
    },
    header: {
      textAlign: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 12,
      color: '#555',
    },
    metaData: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      borderBottom: '1px solid #000',
      paddingBottom: 10,
    },
    metaDataText: {
      fontSize: 9,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    paragraf: {
      textAlign: 'justify',
      marginBottom: 10,
    },
    dataTable: {
      border: '1px solid #000',
      padding: 10,
      marginBottom: 20,
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottom: '1px solid #ccc',
      paddingVertical: 5,
    },
    logo: {
      width: 100,
      height: 100,
      alignSelf: 'center',
      marginBottom: 20,
    },
    penutup: {
      marginTop: 20,
      padding: 15,
      backgroundColor: '#F4F6F7', // Optional: memberi warna latar belakang ringan
      borderRadius: 5, // Optional: memberi sudut membulat
    },
    tandaTangan: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      borderTopWidth: 1,
      borderTopColor: '#000',
      paddingTop: 10,
    },
    tandaTanganKiri: {
      width: '40%',
      alignItems: 'center',
    },
    tandaTanganKanan: {
      width: '40%',
      alignItems: 'center',
    },
    namaPenandaTangan: {
      marginTop: 5,
      fontSize: 10,
      fontWeight: 'bold',
    }
  });
  
  // Fungsi untuk membuat logo/ilustrasi sederhana


interface LaporanBulananProps {
    bulan: number;
    tahun: number;
    dataBulanan: PenyimpananBulanan;
  }
  
 export  function HalamanPertamaLaporan({
    bulan, 
    tahun, 
    dataBulanan
  }: LaporanBulananProps) {
  
    return (

          <Page style={styles.page}>
            <View style={styles.header}>
              
              <Text style={styles.title}>
                LAPORAN BULANAN KONSERVASI EKOSISTEM EVERTEBRATA (KEE)
                PANTAI KILI KILI
              </Text>
              <Text style={styles.subtitle}>
                {bulan} {tahun}
              </Text>
            </View>
    
            <View style={styles.metaData}>
              <View>
                <Text style={styles.metaDataText}>Kode Laporan: {dataBulanan.idDok}</Text>
                <Text style={styles.metaDataText}>Tanggal Dibuat: {dataBulanan.TanggalDibuat.toLocaleDateString()}</Text>
              </View>
              <View>
                <Text style={styles.metaDataText}>Lokasi: Pantai Kili Kili</Text>
                <Text style={styles.metaDataText}>Koordinat: -8.123456, 113.654321</Text>
              </View>
            </View>

          <GrafikKonservasi dataBulanan={dataBulanan} />
          
          <View style={styles.penutup}>
              <Text style={styles.paragraf}>
                Laporan ini mencerminkan dedikasi tim konservasi dalam menjaga 
                keseimbangan ekosistem pesisir dan memberikan perlindungan 
                terhadap spesies yang rentan di kawasan Pantai Kili Kili.
              </Text>
              
              <Text style={styles.paragraf}>
                Kami mengucapkan terima kasih kepada seluruh pihak yang telah 
                berkontribusi dalam upaya konservasi penyu. Semoga kerja keras 
                dan komitmen kita dapat memberikan dampak positif bagi pelestarian 
                keanekaragaman hayati di wilayah pesisir.
              </Text>

            </View>
          </Page>
    );
  }


              {/* <View style={styles.tandaTangan}>
                <View style={styles.tandaTanganKiri}>
                  <Text>Mengetahui,</Text>
                  <Text style={styles.namaPenandaTangan}>Kepala Konservasi</Text>
                </View>
                <View style={styles.tandaTanganKanan}>
                  <Text>Dibuat Oleh,</Text>
                  <Text style={styles.namaPenandaTangan}>Koordinator Lapangan</Text>
                </View>
              </View> */}