import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Toast from "@/components/Toast";
import "./style.scss";

const LiderTabelaWBE = (props) => {
  const { id } = useParams();

  const { data } = props;

  const [leaders, setLeaders] = useState([]);

  const [packages, setPackages] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(false);

  useEffect(() => {
    window.axios.get(`lider`).then(({ data }) => {
      setLeaders(data);
    });

    setPackages(
      data.map((i) => {
        return { ...i, liderDeProjeto: i.liderDeProjeto?.lider_de_projeto_id };
      }),
    );
  }, [id, data]);

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
            .put(`wbe/${k}`, data)
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
    <div>
      <Toast show={toast} toggle={setToast}>
        {errors.length
          ? "Certifique-se de que não deixou nenhum campo vazio."
          : "Mudanças salvas."}
      </Toast>

      <div className="d-flex justify-content-end align-items-center mb-3">
        <span className="small">{/* Variavel aqui */}0%</span>
        <div className="progress w-25">
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr className="table-active">
            <th>Nome</th>
            <th>Execução</th>
            <th>Peso</th>
            <th>Data Prevista</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((item) => (
            <tr
              key={item.id}
              className={errors.includes(item.id) ? "error" : ""}
            >
              <td>{item.wbe}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiderTabelaWBE;
