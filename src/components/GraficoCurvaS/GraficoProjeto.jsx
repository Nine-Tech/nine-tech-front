import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export function GraficoProjeto() {
  const { id } = useParams();

  const [cronogramaSubpacote, setCronogramaSubpacote] = useState([]);
  const [cronogramaRealSubpacote, setCronogramaRealSubpacote] = useState([]);
  const [projeto, setProjeto] = useState([]);

  useEffect(() => {
    window.axios
      .get(`cronograma/cronogramaprojetoestimado/${id}`)
      .then(({ data }) => {
        setCronogramaSubpacote(data);
      });

    window.axios
      .get(`cronograma/cronogramaprojetoestimado/ultimosdias/${id}`)
      .then(({ data }) => {
        setCronogramaRealSubpacote(data);
      });

    window.axios.get(`projeto/${id}`).then(({ data }) => {
      setProjeto(data);
    });
  }, [id]);

  // Função para calcular os meses entre a data de início e a data final do projeto
  function calcularMeses(dataInicio, dataFinal) {
    const inicio = new Date(dataInicio);
    const final = new Date(dataFinal);

    const meses = [];
    while (inicio <= final) {
      meses.push(
        new Date(inicio).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
      );
      inicio.setMonth(inicio.getMonth() + 1);
    }

    return meses;
  }

  const meses = calcularMeses(projeto.data_inicio, projeto.data_final);

  // Configuração do gráfico
  const porcentagens = cronogramaSubpacote.map((item) => item.porcentagem);
  const porcentagemReal = cronogramaRealSubpacote.map(
    (item) => item.porcentagem,
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Gráfico de Curva S",
      },
    },
    scales: {
      x: {
        type: "category",
        position: "bottom",
      },
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const data = {
    labels: meses,
    datasets: [
      {
        label: "Porcentagem Real",
        data: porcentagemReal,
        fill: false,
        borderColor: "blue",
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Porcentagem Planejada",
        data: porcentagens,
        fill: false,
        borderColor: "green",
        cubicInterpolationMode: "monotone",
      },
    ],
  };

  return (
    <>

    
       <div className="w-75 mx-auto border shadow">
         <h3 className="text-center m-3">Gráfico de Curva S</h3> 
         
               {porcentagens.length && porcentagemReal.length && meses.length && (
          <Line options={options} data={data} />
               )}
       </div>


    </>
  );

}
