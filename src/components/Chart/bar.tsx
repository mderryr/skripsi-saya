'use client'

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface BarChartProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
  title?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  labels, 
  datasets, 
  title = 'Bar Chart'
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart<'bar', number[], string> | null>(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar',
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
                text: title
              }
            },
            scales: {
              x: {
                stacked: true, // Set stacked to true if you want to stack the bars
              },
              y: {
                beginAtZero: true,
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [labels, datasets, title]);

  return <canvas ref={chartRef}></canvas>;
};