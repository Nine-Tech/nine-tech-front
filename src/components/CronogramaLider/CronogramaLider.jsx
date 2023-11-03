import React, { useEffect, useState } from "react";
import Toast from "@/components/Toast";
import { useParams } from "react-router-dom";

const CronogramaLider = (props) => {
  const { id } = useParams();
  const { data, idProjeto } = props;

  const [isChanged, setIsChanged] = useState(false);
  const [cronograma, setCronograma] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [subpacote, setSubpacote] = useState();
  const [projeto, setProjeto] = useState();
  const [idDoProjeto, setIdDoProjeto] = useState();

  useEffect(() => {
    window.axios.get(`subpacotes/${id}`).then(({ data }) => {
      setSubpacote(data);
      setIdDoProjeto(subpacote[0].pacotes?.projeto?.id)
    });

  });

  useEffect(() => {
    if (idDoProjeto) { // Check if idDoProjeto has a valid value
      window.axios.get(`projeto/${idDoProjeto}`).then(({ data }) => {
        setProjeto(data);
      });
    }
  }, [idDoProjeto]);
  

  console.log(projeto);

  useEffect(() => {
    if (!data) {
      let cronogramaVazio = {
        id: 0,
        mes1: 0,
        mes2: 0,
        mes3: 0,
        mes4: 0,
        mes5: 0,
        mes6: 0,
        mes7: 0,
        mes8: 0,
        mes9: 0,
        mes10: 0,
        mes11: 0,
        mes12: 0,
        id_projeto: idProjeto,
      };
      setCronograma(cronogramaVazio);
      setUpdatedData(cronogramaVazio);
    } else {
      setCronograma(data);
      setUpdatedData(data);
    }
  }, [data]);

  const reset = () => {
    let updateData = { ...cronograma };
    setUpdatedData(updateData);
    if (isChanged) setIsChanged(false);
    if (error) setError(false);
  };

  const update = (e, item) => {
    if (!isChanged) setIsChanged(true);
    const target = e.target;
    const updatedDataCopy = { ...updatedData };
    updatedDataCopy[item] =
      target.value < 0 ? 0 : target.value > 100 ? 100 : Number(target.value);
    setUpdatedData(updatedDataCopy);
  };

  const save = async () => {
    setLoading(true);
    try {
      if (updatedData.id === 0) {
        const cronogramaCriar = {
          id_projeto: idProjeto,
          mes1: updatedData.mes1,
          mes2: updatedData.mes2,
          mes3: updatedData.mes3,
          mes4: updatedData.mes4,
          mes5: updatedData.mes5,
          mes6: updatedData.mes6,
          mes7: updatedData.mes7,
          mes8: updatedData.mes8,
          mes9: updatedData.mes9,
          mes10: updatedData.mes10,
          mes11: updatedData.mes11,
          mes12: updatedData.mes12,
        };
        await window.axios.post(`cronograma/${id}`, cronogramaCriar);
      } else {
        const cronogramaAlterar = {
          id: updatedData.id,
          id_projeto: idProjeto,
          mes1: updatedData.mes1,
          mes2: updatedData.mes2,
          mes3: updatedData.mes3,
          mes4: updatedData.mes4,
          mes5: updatedData.mes5,
          mes6: updatedData.mes6,
          mes7: updatedData.mes7,
          mes8: updatedData.mes8,
          mes9: updatedData.mes9,
          mes10: updatedData.mes10,
          mes11: updatedData.mes11,
          mes12: updatedData.mes12,
        };
        await window.axios.put(`/cronograma/${id}`, cronogramaAlterar);
      }

      window.axios
        .get(`cronograma/${id}`)
        .then(({ data }) => {
          setCronograma(data);
          setUpdatedData(data);
        })
        .catch((error) => {
          console.error("Erro na requisição:", error);
        });
      setIsChanged(false);
      setToast(true);
    } catch (error) {
      setError(true);
      console.error("Erro ao salvar:", error);
    } finally {
      setLoading(false);
    }
  };

  const calcularMeses = (dataInicio, dataFinal) => {
    const inicio = new Date(dataInicio);
    const final = new Date(dataFinal);
    const meses = [];
    while (inicio <= final) {
      meses.push(
        new Date(inicio).toLocaleString("default", { month: "short" }),
      );
      inicio.setMonth(inicio.getMonth() + 1);
    }
    return meses;
  };

  const meses = calcularMeses(projeto?.data_inicio, projeto?.data_final);

  return (
    <>
      <Toast show={toast} toggle={setToast}>
        {error
          ? "Erro ao salvar as alterações"
          : "Alterações salvas com sucesso."}
      </Toast>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              {meses.map((mes, index) => (
                <td key={index}>{mes}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr key={updatedData.id || 0}>
              {meses.map((mes, index) => (
                <td key={index}>
                  <input
                    className="form-control form-control-sm"
                    min={0}
                    step={1}
                    max={100}
                    type="number"
                    name={`porcentagem_${index}`}
                    value={updatedData[`mes${index + 1}`] || 0}
                    onChange={(e) => update(e, `mes${index + 1}`)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 d-flex justify-content-end">
        <button
          className="btn btn-secondary"
          disabled={!isChanged}
          onClick={reset}
        >
          Desfazer alterações
        </button>
        <button
          className="btn btn-primary ms-3"
          disabled={!isChanged}
          onClick={save}
        >
          {loading ? (
            <div
              role="status"
              className="spinner-border"
              style={{ width: "1rem", height: "1rem" }}
            />
          ) : null}
          Salvar
        </button>
      </div>
    </>
  );
};

export default CronogramaLider;