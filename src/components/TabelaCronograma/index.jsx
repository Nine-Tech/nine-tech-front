import { useEffect, useState } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import Toast from "@/components/Toast";

function TabelaCronograma(props) {
  const { data } = props;

  const [leaders, setLeaders] = useState([]);

  const [packages, setPackages] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(false);

  const reset = () => {
    const resetPackages = [...data];

    setPackages(resetPackages);
    setErrors([]);
    setIsChanged(false);
  };

  const update = (e, item) => {
    if (!isChanged) setIsChanged(true);
    const target = e.target;

    const updatedItem = { ...item, [target.name]: target.value };
    if (target.type === "number" && target.value < 0)
      updatedItem[target.name] = 0;

    const newData = {
      ...updatedData,
      [item.id]: updatedItem,
    };
    setUpdatedData(newData);

    const updatedPackages = [
      ...packages.map((p) => (p.id === item.id ? updatedItem : p)),
    ];
    setPackages(updatedPackages);
  };

  const save = () => {
    setLoading(true);
    setErrors([]);

    Promise.allSettled([
      ...Object.keys(updatedData).map((k) => {
        let item = updatedData[k];

        let data = {
          novoHH: parseFloat(item.hh) || 0,
          novoValor: parseFloat(item.valor) || 0,
          novoLiderDeProjetoId: parseInt(item.liderDeProjeto),
          novoProjetoId: parseInt(item.projeto?.id),
        };

        return new Promise((resolve, reject) => {
          window.axios
            .put(`wbe/atualizar/${k}`, data)
            .then(resolve)
            .catch(() => reject(item.id));
        });
      }),
    ])
      .then((results) =>
        setErrors(
          results.filter((r) => r.status === "rejected").map((r) => r.reason),
        ),
      )
      .finally(() => {
        setIsChanged(false);
        setLoading(false);
        setToast(true);
      });
  };

  return (
    <>
      <Toast show={toast} toggle={setToast}>
        {errors.length
          ? "Certifique-se de que não deixou nenhum campo vazio."
          : "Mudanças salvas."}
      </Toast>

      <table className="table table-bordered">
        <thead>
          <tr className="table-active">
            <th>Atividade(WBE)</th>
            <th colSpan="12">Avanço de Horas Planejado</th>
          </tr>
        </thead>
        <tbody>
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
          ) : (
            "Salvar"
          )}
        </button>
      </div>
    </>
  );
}

export default TabelaCronograma;
