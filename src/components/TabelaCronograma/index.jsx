import React, { useEffect, useState } from "react";
import Toast from "@/components/Toast";
import { useParams } from "react-router-dom";

const TabelaCronograma = (props) => {
  const { id: projetoId } = useParams();
  const { data, idProjeto } = props;

  const [cronograma, setCronograma] = useState([]);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.axios.get(
          `cronograma/cronogramaprojetoestimado/${projetoId}`,
        );
        const data = response.data;
        setCronograma(data);
        console.log("Meses");
        console.log(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, [projetoId]);

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
          <table className="table table-bordered">
            <thead>
              <tr className="table-active">
                {cronograma.map((item, index) => (
                  <th
                    className="text-center"
                    key={index}
                  >{`Mês ${item.mes}`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {cronograma.map((item, index) => (
                  <td className="text-center" key={index}>
                    {item.porcentagem} %
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-5">
          No momento não existem cronogramas atribuídos neste Projeto, por favor
          volte mais tarde!
        </div>
      )}
    </>
  );
};

export default TabelaCronograma;
