"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

import { useEffect, useState } from "react";
import { Bar as BarChart, Line } from "react-chartjs-2";
import { JumlahMenetas } from "@/logic/tukik-pendataan";
import "@/styles/grafik.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);



export default function GrafikView({
  title,
  Value,
  Loading,
  Bar = false
}: any) {
  
  const options = {
    // responsive: false,
    // showTooltips: false,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        fullSize: true,
      },
    },
  };
  if (Loading) {
    return (
      <div
        role="status"
        className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
      >
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5">
        </div>
        <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700">
        </div>
        <div className="flex items-baseline mt-4 space-x-6">
          <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700">
          </div>
          <div className="w-full h-56 bg-gray-200 rounded-t-lg dark:bg-gray-700">
          </div>
          <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700">
          </div>
          <div className="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-700">
          </div>
          <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700">
          </div>
          <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700">
          </div>
          <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700">
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if(Bar){ return (
    <div className="px-20 py-12">
      <BarChart
        id="canvas-container"
        height={480}
        options={options}
        data={Value}
      />
    </div>
  );
  }

  return (
    <div className="px-20 py-12">
      <Line
        id="canvas-container"
        height={480}
        options={options}
        data={Value}
      />
    </div>
  );
}
