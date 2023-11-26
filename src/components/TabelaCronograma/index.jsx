import React, { useEffect, useState } from "react";
import Toast from "@/components/Toast";
import { useParams } from "react-router-dom";

const TabelaCronograma = (props) => {
  const { id: projetoId } = useParams();
  const { data, idProjeto, dataInicio, dataFinal } = props;

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

        // Calcular os nomes dos meses com base na data de início do projeto e na data final do cronograma
        const dataInicioProjeto = new Date(dataInicio);
        const dataFinalProjeto = new Date(dataFinal); // Adicionando a data final do projeto
        const nomesDosMeses = calcularMeses(
          dataInicioProjeto,
          dataFinalProjeto,
        );

        setMeses(nomesDosMeses);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, [projetoId, dataInicio, dataFinal]); // Adicionando dataFinal à lista de dependências

  // Função para calcular os meses entre a data de início e final
  const calcularMeses = (dataInicio, dataFinal) => {
    const inicio = new Date(dataInicio);
    const final = new Date(dataFinal);
    const meses = [];

    while (inicio <= final) {
      const nomeAbreviado = inicio.toLocaleString("default", {
        month: "short",
      });
      meses.push(
        nomeAbreviado.charAt(0).toUpperCase() + nomeAbreviado.slice(1),
      );
      inicio.setMonth(inicio.getMonth() + 1);
    }

    return meses;
  };

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
                  <th className="text-center" key={index}>
                    {nomeDoMes}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {meses.map((nomeDoMes, index) => {
                  const itemDoMes = cronograma.find(
                    (item) => item.mes === index + 1,
                  );

                  return (
                    <td key={index}>
                      <div className="input-group mb-3">
                        <input
                          className="form-control form-control-sm text-end"
                          min={0}
                          step={1}
                          max={100}
                          name={`porcentagem_${index}`}
                          value={itemDoMes ? itemDoMes.porcentagem : 0}
                        />
                        <label
                          className="input-group-text"
                          htmlFor="inputGroupSelect02"
                        >
                          %
                        </label>
                      </div>
                    </td>
                  );
                })}
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
