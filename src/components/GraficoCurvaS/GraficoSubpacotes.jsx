import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Configuração do gráfico

const porcentagens = [0, 20, 40, 60, 80, 100]; // Valores de 0 a 100
const porcentagemReal = [10, 30, 50, 70, 90, 75]; // Valores reais
const porcentagemPlanejada = [5, 25, 45, 65, 85, 80]; // Valores planejados

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Gráfico de Curva S',
    },
  },
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
      ticks: {
        stepSize: 20, // Mostra um tick a cada 20%
      },
    },
    y: {
      min: 0,
      max: 100,
    },
  },
};

const data = {
  labels: porcentagens,
  datasets: [
    {
      label: 'Porcentagem Real',
      data: porcentagemReal,
      fill: false,
      borderColor: 'blue',
      cubicInterpolationMode: 'monotone', // Faz a linha ficar curva
    },
    {
      label: 'Porcentagem Planejada',
      data: porcentagemPlanejada,
      fill: false,
      borderColor: 'green',
      cubicInterpolationMode: 'monotone', // Faz a linha ficar curva
    },
  ],
};

export function App() {
  return <Line options={options} data={data} width={50} height={25}/>;
}
