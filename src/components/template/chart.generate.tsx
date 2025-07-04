
import { Chart, registerables } from 'chart.js';
import ChartjsImage from 'chartjs-to-image';
import { View, StyleSheet, Image } from '@react-pdf/renderer';

Chart.register(...registerables);

interface GrafikKonservasiProps {
  dataBulanan: {
    PenyuNaikBertelur: number;
    PenyuNaikTakBertelur: number;
    TotalTelurMenetas: number;
    TotalTelurTakMenetas: number;
  };
}

const GrafikKonservasi: React.FC<GrafikKonservasiProps> = ({ dataBulanan }) => {

  const myChart = new ChartjsImage();

  const GrafikMenetas =(dataIn: GrafikKonservasiProps["dataBulanan"])=> myChart.setConfig({
    type: 'pie',
        data: {
          labels: ['Telur Menetas', 'Telur Tidak Menetas'],
          datasets: [{
            data: [dataIn.TotalTelurMenetas, dataIn.TotalTelurTakMenetas],
            backgroundColor: ['#3498DB', '#F1C40F'],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: true,
              text: 'Status Penetasan Telur',
            }
          }
        }
  })
  const GrafikNaik = (dataIn: GrafikKonservasiProps["dataBulanan"])=>myChart.setConfig({
    type: 'pie',
    data: {
      labels: ['Telur Menetas', 'Telur Tidak Menetas'],
      datasets: [{
        data: [dataIn.TotalTelurMenetas, dataIn.TotalTelurTakMenetas],
        backgroundColor: ['#3498DB', '#F1C40F'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Status Penetasan Telur',
        }
      }
    }
  })

  // Styles untuk tata letak grafik
const styles = StyleSheet.create({
  grafikContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 250,
    marginVertical: 20
  },
  grafikItem: {
    width: '48%',
    padding: 10
  }
});


  return (
    <View style={styles.grafikContainer}>
      <View style={styles.grafikItem}>
        <Image src={GrafikNaik(dataBulanan).toDataUrl().then((data:any)=>data)} style={{ width: '100%', height: '100%' }} />
      </View>
      <View style={styles.grafikItem}>
      <Image src={GrafikMenetas(dataBulanan).toDataUrl().then((data:any)=>data)} style={{ width: '100%', height: '100%' }} />

      </View>
    </View>
  );
};


export default GrafikKonservasi;