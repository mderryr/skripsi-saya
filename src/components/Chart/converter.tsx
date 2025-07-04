import ChartJSImage from 'chartjs-to-image';
import { Chart, ChartConfiguration } from 'chart.js/auto';


export interface ChartConfig {
  type: string;
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string | string[];
    }>;
  };
  options?: any;
  width?: number;
  height?: number;
}

  
export async function convertChartToBinary(config: ChartConfig): Promise<any> {
    try {
      // Buat instance ChartJSImage
      const myChart = new ChartJSImage();
  
      // Konstruksi konfigurasi yang kompatibel
      const chartConfig = {
        type: config.type,
        data: config.data,
        options: config.options || {},
        width: config.width || 400,
        height: config.height || 300
      };
  
      // Gunakan metode yang tersedia
      myChart.setConfig(chartConfig);
  
      // Konversi ke binary
      const buffer = await myChart.toBinary();
  
      return buffer;
    } catch (error) {
      console.error('Gagal mengonversi chart ke binary:', error);
      return null;
    }
  }
  
  export async function convertChartToDataUrl(config: ChartConfig): Promise<string | null> {
    try {
      // Buat instance ChartJSImage
      const myChart = new ChartJSImage();
  
      // Konstruksi konfigurasi yang kompatibel
      const chartConfig = {
        type: config.type,
        data: config.data,
        options: config.options || {},
        width: config.options?.width || 400,
        height: config.options?.height || 300
      };
  
      // Gunakan metode setConfig
      myChart.setConfig(chartConfig);
  
      // Konversi ke data URL
      const dataUrl = await myChart.toDataUrl();
  
      return dataUrl;
    } catch (error) {
      console.error('Gagal mengonversi chart ke data URL:', error);
      return null;
    }
  }

  
    // Fungsi tambahan untuk mengunduh binary
    export function downloadChartBinary(binary: string, filename: string = 'chart.png') {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${binary}`;
      link.download = filename;
      link.click();
    }