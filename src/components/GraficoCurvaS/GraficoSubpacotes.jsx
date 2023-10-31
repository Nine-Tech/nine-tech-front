import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function App() {
  const { id, subpacoteId } = useParams();

  const [cronogramaSubpacote, setCronogramaSubpacote] = useState([]);
  const [projeto, setProjeto] = useState([]);

  useEffect(() => {
    window.axios.get(`cronograma/cronogramaestimado/${subpacoteId}`)
      .then(({ data }) => {
        setCronogramaSubpacote(data);
      });

    window.axios.get(`projeto/${id}`)
      .then(({ data }) => {
        setProjeto(data);
      });
  }, [subpacoteId, id]);

  // Função para calcular os meses entre a data de início e a data final do projeto
  function calcularMeses(dataInicio, dataFinal) {
    const inicio = new Date(dataInicio);
    const final = new Date(dataFinal);

    const meses = [];
    while (inicio <= final) {
      meses.push(new Date(inicio).toLocaleString('default', { month: 'short', year: 'numeric' }));
      inicio.setMonth(inicio.getMonth() + 1);
    }

    return meses;
  }

  const meses = calcularMeses(projeto.data_inicio, projeto.data_final);

  // Configuração do gráfico
  const porcentagens = cronogramaSubpacote.map(item => item.porcentagem);
  const porcentagemReal = [0, 0, 5, 10, 30, 50, 70, 80, 90, 100, 100]; // Valores reais

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
        type: 'category',
        position: 'bottom',
      },
      y: {
        min: -10,
        max: 110,
      },
    },
  };

  const data = {
    labels: meses,
    datasets: [
      {
        label: 'Porcentagem Real',
        data: porcentagemReal,
        fill: false,
        borderColor: 'blue',
        cubicInterpolationMode: 'monotone',
      },
      {
        label: 'Porcentagem Planejada',
        data: porcentagens,
        fill: false,
        borderColor: 'green',
        cubicInterpolationMode: 'monotone',
      },
    ],
  };

  return <Line className="grafico" options={options} data={data} />;
}
