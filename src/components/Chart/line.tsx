import { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';

interface LineChartProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill?: boolean;
  }[];
  title?: string;
}

export const DynamicLineChart: React.FC<LineChartProps> = ({
  labels,
  datasets,
  title = 'Line Chart',
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart<'line', number[], string> | null>(null);

  useEffect(() => {
    // Hapus chart sebelumnya jika ada
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        const config: ChartConfiguration<'line', number[], string> = {
          type: 'line',
          data: {
            labels: labels,
            datasets: datasets,
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: title,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        };

        chartInstanceRef.current = new Chart(ctx, config);
      }
    }

    // Bersihkan chart saat komponen unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [labels, datasets, title]);

  return <canvas ref={chartRef}></canvas>;
};