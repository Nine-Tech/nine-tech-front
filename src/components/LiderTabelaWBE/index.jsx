import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Toast from "@/components/Toast";
import "./style.scss";

const LiderTabelaWBE = (props) => {
  const { id } = useParams();
  const { data } = props;

  const pathParts = location.pathname.split("/");
  const idLiderProjeto = pathParts[2];
  const idProjeto = pathParts[4];

  const [leaders, setLeaders] = useState([]);

  const [packages, setPackages] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(false);

  const [progressoMensal, setProgresso] = useState([]);

  useEffect(() => {
    window.axios.get(`lider`).then(({ data }) => {
      setLeaders(data);
    });
    window.axios
      .get(`progressaomensal/${idLiderProjeto}/${idProjeto}`)
      .then(({ data: progressoMensal }) => {
        setProgresso(progressoMensal);
      });
    setPackages(
      data.map((i) => {
        const matchingProgressItem = progressoMensal.find(
          (progressItem) => progressItem[1] === i.id,
        );

        // Verifique se há um elemento correspondente em progressoMensal
        if (matchingProgressItem) {
          console.log("matchingProgressItem:")
          console.log(matchingProgressItem);
          // Adicione as propriedades do elemento correspondente a i
          i.peso = matchingProgressItem[0].peso;
          i.execucao = matchingProgressItem[0].execucao;
          i.data = matchingProgressItem[0].data;
          i.idProgresso = matchingProgressItem[0].id;
          i.existe = true
        }

        return i;
      }),
    );
  }, [id, data, idLiderProjeto, idProjeto]);

  const reset = () => {
    const resetPackages = [...data];

    setPackages(resetPackages);
    setErrors([]);
    setIsChanged(false);
  };

  const update = (e, item) => {
    if (!isChanged) setIsChanged(true);
    const target = e.target;
    console.log("target.name");
    console.log(target.name);
    let updatedItem;
    if (target.name == "execucao") {
      if (target.value == 0) {
        updatedItem = { ...item, [target.name]: false };
      } else {
        updatedItem = { ...item, [target.name]: true };
      }
    } else {
      updatedItem = { ...item, [target.name]: target.value };
    }
    console.log("updatedItem");
    console.log(updatedItem);
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
        console.log("item:")
        console.log(item.id);
        let data = {
          peso: parseFloat(item.peso) || 0,
          execucao: parseFloat(item.execucao) || 0,
          data: item.data,
          id_wbe: parseFloat(item.id) || 0,
        };
        console.log("data:");
        console.log(data);

        if (item.existe){
          return new Promise((resolve, reject) => {
            window.axios
              .put(`progressaomensal/${item.idProgresso}`, data)
              .then(resolve)
              .catch();
          });
        } else {
          return new Promise((resolve, reject) => {
            window.axios
              .post(`progressaomensal`, data)
              .then(resolve);
          });
        }

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
              <td>
                <input
                  className="form-control form-control-sm"
                  min={0}
                  step={1}
                  max={1}
                  value={item?.execucao ? "1" : "0"}
                  type="number"
                  name="execucao"
                  onChange={(e) => update(e, item)}
                />
              </td>
              <td>
                <input
                  className="form-control form-control-sm"
                  min={0}
                  step={1}
                  max={100}
                  value={item?.peso || 0}
                  type="number"
                  name="peso"
                  onChange={(e) => update(e, item)}
                />
              </td>
              <td>
                <input
                  className="form-control form-control-sm"
                  type="date"
                  name="data"
                  value={item?.data || ""}
                  onChange={(e) => update(e, item)}
                />
              </td>
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
          ) : (
            "Salvar"
          )}
        </button>
      </div>
    </div>
  );
};

export default LiderTabelaWBE;
