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
      setIdDoProjeto(1);
    });
  }, [id]);

  useEffect(() => {
    if (idDoProjeto) {
      // Check if idDoProjeto has a valid value
      window.axios.get(`projeto/${idDoProjeto}`).then(({ data }) => {
        setProjeto(data);
      });
    }
  }, [idDoProjeto]);

  useEffect(() => {
    if (!data) {
      let cronogramaVazio = {
        id: 0,
        mes1: 0,
        mes2: 0,
        mes3: 0,
        mes4: 0,
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
    let updateData = [...cronograma];
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
    console.log(updatedDataCopy)
  };

  const save = async () => {
    setLoading(true);

    // Create the JSON data object to send to the backend
    const jsonData = {
      id_projeto: idProjeto,
      porcentagens: Object.keys(updatedData).map((key) => updatedData[key]),
    };

    console.log(jsonData);

    try {
      // If the cronograma is new, send a POST request to create it
      if (updatedData.id === 0) {
        await window.axios.post(`cronograma/${id}`, jsonData);
      } else {
        // If the cronograma already exists, send a PUT request to update it
        await window.axios.put(`/cronograma/${id}`, jsonData);
      }

      // After the cronograma has been saved, fetch the updated data from the backend
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
      /* setLoading(false); */
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