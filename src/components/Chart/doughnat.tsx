'use client'

import { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';


interface DoughnutChartProps {
  labels: string[];
  data: number[];
  title?: string;
  backgroundColor?: string[];
}


export const DynamicDoughnutChart: React.FC<DoughnutChartProps> = ({
  labels, 
  data, 
  title = 'Chart',
  backgroundColor = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)']
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart<'doughnut', number[], string> | null>(null);

  useEffect(() => {
    // Hapus chart sebelumnya jika ada
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        const config: ChartConfiguration<'doughnut', number[], string> = {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              label: 'Data',
              data: data,
              backgroundColor: backgroundColor
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: title
              }
            }
          }
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
  }, [labels, data, title, backgroundColor]);

  return <canvas ref={chartRef}></canvas>;
};


// export const DoughnutChart = () => {
//     const chartRef = useRef<HTMLCanvasElement>(null);
  
//     useEffect(() => {
//       if (chartRef.current) {
//         const ctx = chartRef.current.getContext('2d');
        
//         if (ctx) {
//           new Chart(ctx, {
//             type: 'doughnut',
//             data: {
//               labels: ['Red', 'Blue', 'Yellow'],
//               datasets: [{
//                 label: '# of Votes',
//                 data: [12, 19, 3],
//                 backgroundColor: [
//                   'rgb(255, 99, 132)',
//                   'rgb(54, 162, 235)',
//                   'rgb(255, 205, 86)'
//                 ]
//               }]
//             },
//             options: {
//               responsive: true,
//               plugins: {
//                 legend: {
//                   position: 'top',
//                 },
//                 title: {
//                   display: true,
//                   text: 'Chart.js Doughnut Chart'
//                 }
//               }
//             }
//           });
//         }
//       }
//     }, []);
  
//     return <canvas ref={chartRef}></canvas>;
//   }

