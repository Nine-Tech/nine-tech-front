import { useEffect, useState } from "react";
import Toast from "@/components/Toast";
import { useParams } from "react-router-dom";

const CronogramaLider = (props) => {
  const { id } = useParams();

  const { data, idProjeto } = props;

  console.log("id", idProjeto);
  console.log("data", data);

  const [isChanged, setIsChanged] = useState(false);
  const [cronograma, setCronograma] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(false);

  useEffect(() => {
    console.log(data);
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
      console.log("aqui: ", cronogramaVazio);
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
    console.log("updatedData");
    console.log(updatedData);
    const updatedDataCopy = { ...updatedData };
    console.log("updatedDataCopy");
    console.log(updatedDataCopy);
    updatedDataCopy[item] =
      target.value < 0 ? 0 : target.value > 100 ? 100 : Number(target.value);
    setUpdatedData(updatedDataCopy);
  };

  const save = async () => {
    setLoading(true);
    try {
      if (updatedData.id == 0) {
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
        console.log("cronogramaCriar");

        console.log(cronogramaCriar);
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
        console.log("cronogramaAlterar");

        console.log(cronogramaAlterar);
        await window.axios.put(`/cronograma/${id}`, cronogramaAlterar);
      }

      window.axios
        .get(`cronograma/${id}`)
        .then(({ data }) => {
          setCronograma(data);
          setUpdatedData(data);
          console.log("volta do get", data);
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
              <td>JAN</td>
              <td>FEV</td>
              <td>MAR</td>
              <td>ABR</td>
              <td>MAI</td>
              <td>JUN</td>
              <td>JUL</td>
              <td>AGO</td>
              <td>SET</td>
              <td>OUT</td>
              <td>NOV</td>
              <td>DEZ</td>
            </tr>
          </thead>
          <tbody>
            <tr key={updatedData.id || 0}>
              <td>
                <input
                  className="form-control form-control-sm"
                  min={0}
                  step={1}
                  max={100}
                  type="number"
                  name="porcentagem"
                  value={updatedData.mes1 || 0}
                  onChange={(e) => update(e, "mes1")}
                />
              </td>
              <td>
                <input
                  className="form-control form-control-sm"
                  min={0}
                  step={1}
                  max={100}
                  type="number"
                  name="porcentagem"
                  value={updatedData.mes2 || 0}
                  onChange={(e) => update(e, "mes2")}
                />
              </td>
              <td>
                <input
                  className="form-control form-control-sm"
                  min={0}
                  step={1}
                  max={100}
                  type="number"
                  name="porcentagem"
                  value={updatedData.mes3 || 0}
                  onChange={(e) => update(e, "mes3")}
                />
              </td>
              <td>
                <input
                  className="form-control form-control-sm"
                  min={0}
                  step={1}
                  max={100}
                  type="number"
                  name="porcentagem"
                  value={updatedData.mes4 || 0}
                  onChange={(e) => update(e, "mes4")}
                />
              </td>
              <td>
                <input
                  className="form-control form-control-sm"
                  min={0}
                  step={1}
                  max={100}
                  type="number"
                  name="porcentagem"
                  value={updatedData.mes5 || 0}
                  onChange={(e) => update(e, "mes5")}
                />
              </td>
              <td>
                <input
                  className="form-control form-control-sm"
                  min={0}
                  step={1}
                  max={100}
                  type="number"
                  name="porcentagem"
                  value={updatedData.mes6 || 0}
                  onChange={(e) => update(e, "mes6")}
                />
              </td>
              <td>
                <input
                  className="form-control form-control-sm"
                  min={0}
                  step={1}
                  max={100}
                  type="number"
                  name="porcentagem"
                  value={updatedData.mes7 || 0}
                  onChange={(e) => update(e, "mes7")}
                />
              </td>
              <td>
                <input
                  className="form-control form-control-sm"
                  min={0}
                  step={1}
                  max={100}
                  type="number"
                  name="porcentagem"
                  value={updatedData.mes8 || 0}
                  onChange={(e) => update(e, "mes8")}
                />
              </td>
              <td>
                <input
                  className="form-control form-control-sm"
                  min={0}
                  step={1}
                  max={100}
                  type="number"
                  name="porcentagem"
                  value={updatedData.mes9 || 0}
                  onChange={(e) => update(e, "mes9")}
                />
              </td>
              <td>
                <input
                  className="form-control form-control-sm"
                  min={0}
                  step={1}
                  max={100}
                  type="number"
                  name="porcentagem"
                  value={updatedData.mes10 || 0}
                  onChange={(e) => update(e, "mes10")}
                />
              </td>
              <td>
                <input
                  className="form-control form-control-sm"
                  min={0}
                  step={1}
                  max={100}
                  type="number"
                  name="porcentagem"
                  value={updatedData.mes11 || 0}
                  onChange={(e) => update(e, "mes11")}
                />
              </td>
              <td>
                <input
                  className="form-control form-control-sm"
                  min={0}
                  step={1}
                  max={100}
                  type="number"
                  name="porcentagem"
                  value={updatedData.mes12 || 0}
                  onChange={(e) => update(e, "mes12")}
                />
              </td>
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
