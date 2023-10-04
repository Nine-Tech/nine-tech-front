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

  useEffect(() => {
    let cronogramaData = Object.keys(data).map((key) => {
      const item = data[key];
      return {
        id: key,
        porcentagens: item.porcentagens,
        nome: item.nome,
      };
    });

    setCronograma(cronogramaData);
    setUpdatedData(cronogramaData);
  }, [data]);

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
    let value = target.value < 0 ? 0 : target.value > 100 ? 100 : Number(target.value);
  
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
      const sortedPorcentagens = updatedData.map(item => ({
        ...item,
        porcentagens: item.porcentagens.slice().sort((a, b) => a - b) // ordena crescentemente
      }));
      
      const dataToSave = {
        projeto: { id: projetoId },
        porcentagens: sortedPorcentagens.map((item) => item.porcentagens),
      };
  
      await axios.put(`/cronograma/${projetoId}`, dataToSave);
  
      setCronograma([...updatedData]);
      setIsChanged(false);
      setToast(true);
    } catch (error) {
      setError(true);
      console.error('Erro ao salvar:', error);
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
              <td>{item.nome || ""}</td>

              {item.porcentagens.map((porcentagem, index) => (
                <td key={index}>
                  <input
                    className="form-control form-control-sm"
                    min={0}
                    step={1}
                    max={100}
                    type="number"
                    name="porcentagem"
                    value={porcentagem || 0}
                    onChange={(e) => update(e, item, index)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

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
          ) : (null)} 
          Salvar
        </button>
      </div>
    </>
  );
}

export default TabelaCronograma;
