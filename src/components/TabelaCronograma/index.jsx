import React, { useEffect, useState } from "react";
import Toast from "@/components/Toast";
import { useParams } from "react-router-dom";

const TabelaCronograma = (props) => {
  const { id: projetoId } = useParams();
  const { data, idProjeto, dataInicio } = props;

  const [cronograma, setCronograma] = useState([]);
  const [meses, setMeses] = useState([]);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.axios.get(
          `cronograma/cronogramaprojetoestimado/${projetoId}`,
        );
        const data = response.data;
        setCronograma(data);
  
        // Calcular os nomes dos meses com base na data de início do projeto
        const dataInicioProjeto = new Date(dataInicio);
        const nomesDosMeses = data.map((item) => {
          const mesDaData = new Date(dataInicioProjeto.getFullYear(), dataInicioProjeto.getMonth() + item.mes - 1, 1);
          const nomeAbreviado = mesDaData.toLocaleString('pt-BR', { month: 'short' });
          return nomeAbreviado.charAt(0).toUpperCase() + nomeAbreviado.slice(1);
        });
        setMeses(nomesDosMeses);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
  
    fetchData();
  }, [projetoId, dataInicio]);

  useEffect(() => {
    window.axios.get(`projeto/${idProjeto}`).then(({ data }) => {
      setProjeto(data);
      console.log("Meses Projeto");
      console.log(data);
    });
  }, [idProjeto]);

  return (
    <>
      <Toast show={toast} toggle={setToast} />

      {cronograma.length ? (
        <div className="table-responsive">
          <h3 className="mb-3">Cronograma</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                {meses.map((nomeDoMes, index) => (
                  <th className="text-center" key={index}>{nomeDoMes}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {cronograma.map((item, index) => (
                  <td key={index}>
                  <div className="input-group mb-3">
                    <input
                      className="form-control form-control-sm text-end"
                      min={0}
                      step={1}
                      max={100}
                      name={`porcentagem_${index}`}
                      value={item.porcentagem}
                    />
                    <label
                      className="input-group-text"
                      for="inputGroupSelect02"
                    >
                    %
                    </label>
                  </div>
                </td>                  
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-5">
          No momento não existem cronogramas atribuídos neste Projeto!
        </div>
      )}
    </>
  );
};

export default TabelaCronograma;