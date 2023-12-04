import { useEffect, useState } from "react";
import Toast from "@/components/Toast";
import "./style.scss";
import { useParams } from "react-router-dom";

function TabelaCronograma(props) {
  const { id: projetoId } = useParams();

  const { data } = props;

  const [isChanged, setIsChanged] = useState(false);
  const [cronograma, setCronograma] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(false);

  async function fetchData() {
    try {
      const response = await window.axios.get(`cronograma/pacote/${projetoId}`);
      const data = response.data;
      setCronograma(data);
      setUpdatedData(data);
      console.log(data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [projetoId]);

  const reset = () => {
    let updateData = [...cronograma];
    setUpdatedData(updateData);
    if (isChanged) setIsChanged(false);
    if (error) setError(false);
  };

  const update = (e, item, index) => {
    if (!isChanged) setIsChanged(true);
    const target = e.target;

    let updateRow = { ...item };
    let value =
      target.value < 0 ? 0 : target.value > 100 ? 100 : Number(target.value);

    updateRow.porcentagens = [
      ...item.porcentagens.slice(0, index),
      value,
      ...item.porcentagens.slice(index + 1),
    ];

    let updateData = [
      ...cronograma.map((i) => (i.id === updateRow.id ? updateRow : i)),
    ];

    setUpdatedData(updateData);
  };

  const save = async () => {
    setLoading(true);

    try {
      const sortedPorcentagens = updatedData.map((item) => ({
        ...item,
        porcentagens: item.porcentagens.slice().sort((a, b) => a - b), // ordena crescentemente
      }));

      const dataToSave = {
        projeto: { id: projetoId },
        porcentagens: sortedPorcentagens.map((item) => item.porcentagens),
      };

      await window.axios.put(`/cronograma/${projetoId}`, dataToSave);

      setCronograma([...updatedData]);
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

      {updatedData.length ? (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr className="table-active">
                <th>Atividade(WBE)</th>
                <th colSpan="12">Avanço de Horas Planejado</th>
              </tr>
              <tr>
                <td></td>
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
              {updatedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.subpacote.nome || ""}</td>
                  <td>{item.mes1}</td>
                  <td>{item.mes2}</td>
                  <td>{item.mes3}</td>
                  <td>{item.mes4}</td>
                  <td>{item.mes5}</td>
                  <td>{item.mes6}</td>
                  <td>{item.mes7}</td>
                  <td>{item.mes8}</td>
                  <td>{item.mes9}</td>
                  <td>{item.mes10}</td>
                  <td>{item.mes11}</td>
                  <td>{item.mes12}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-5">
          No momento não existem cronogramas atribuidos neste Projeto, por favor
          volte mais tarde!
        </div>
      )}

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
}

export default TabelaCronograma;
