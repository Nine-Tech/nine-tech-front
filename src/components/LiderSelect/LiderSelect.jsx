import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Toast from "@/components/Toast";

const LiderSelect = (props) => {
  const { id } = useParams();
  const { data } = props;
  const [packages, setPackages] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(false);

  useEffect(() => {
    window.axios.get(`upload/${id}`).then(({ data }) => {
      setPackages(data);
    });
  }, [id]);

  useEffect(() => {
    window.axios.get(`lider/listar`).then(({ data }) => {
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
        console.log(item);

        let data = {
          liderDeProjeto: parseInt(item.liderDeProjeto),
        };

        return new Promise((resolve, reject) => {
          window.axios
            .put(`upload/${k}`, data)
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

      <div className="table-responsive">
        <table className="tabela-wbs table table-bordered">
          <thead>
            <tr className="table-active">
              <th>Atividade(WBE)</th>
              <th>Atribuição</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((item) => (
              <tr key={item.id}>
                <td>{item.wbe}</td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    aria-label="small select example"
                    value={item.liderDeProjeto || ""}
                    name="liderDeProjeto"
                    onChange={(e) => update(e, item)}
                  >
                    <option disabled value={""}>
                      Selecione o Grupo Responsável
                    </option>
                    {leaders.map((l, i) => (
                      <option value={l.id} key={i}>
                        {l.nome}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
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
          ) : (
            "Salvar"
          )}
        </button>
      </div>
    </>
  );
};

export default LiderSelect;
