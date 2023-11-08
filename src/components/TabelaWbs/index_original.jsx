import { useEffect, useState } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import Toast from "@/components/Toast";

function TabelaWbs(props) {
  const { id } = useParams();

  const { data } = props;

  const [leaders, setLeaders] = useState([]);

  const [packages, setPackages] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(false);

  const sortedPackages = packages.sort((a, b) => a.wbe.localeCompare(b.wbe));
  sortedPackages.forEach((item) => {
    // Verifique se o item é um pai
    item.isParent = item.wbe.split(".").length === 2;
  });

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

    const updatedValue = target.value.replace(",", ".");

    if (!isNaN(updatedValue)) {
      const updatedItem = { ...item, [target.name]: updatedValue };

      const newData = {
        ...updatedData,
        [item.id]: updatedItem,
      };
      setUpdatedData(newData);

      const updatedPackages = [
        ...packages.map((p) => (p.id === item.id ? updatedItem : p)),
      ];
      setPackages(updatedPackages);
    }
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
          novoMaterial: parseFloat(item.material) || 0,
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

  function formatarMoeda(valor) {
    return parseFloat(valor).toFixed(2);
  }

  const $ = require("jquery");
  $.DataTable = require("datatables.net");

  return (
    <>
      <Toast show={toast} toggle={setToast}>
        {errors.length
          ? "Certifique-se de que não deixou nenhum campo vazio."
          : "Mudanças salvas."}
      </Toast>

      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            {sortedPackages.map(
              (item) =>
                item.isParent && (
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="true" href="#">
                      {item.wbe}
                    </a>
                  </li>
                ),
            )}
          </ul>
        </div>
        <div className="card-body">
          <h5 className="card-title">1.1 Air Vehicle</h5>
          <p className="card-text">Valor: R$1.085.000,00 </p>
          <p className="card-text">HH: 10.000 </p>
          <p className="card-text">Material: R$85.000,00 </p>
          <select name="" id="">
            Lider de Projeto 1
          </select>
          {sortedPackages.map(
            (item) =>
              !item.isParent && (
                <a href="">
                  <p className="card-text">
                    {item.wbe} - Valor: R$ {item.valor}
                  </p>
                </a>
              ),
          )}
        </div>
      </div>

      <div className="table-responsive">
        <table className="tabela-wbs table table-bordered">
          <thead>
            <tr className="table-active">
              <th>Atividade(WBE)</th>
              <th>Valor</th>
              <th>HH*</th>
              <th>Material</th>
              <th>Atribuição</th>
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
                  Valor R$
                  <input
                    min={0}
                    step={0.01}
                    name="valor"
                    type="number"
                    value={formatarMoeda(item.valor)}
                    onChange={(e) => update(e, item)}
                  />
                </td>
                <td>
                  <input
                    min={0}
                    name="hh"
                    type="number"
                    value={item.hh}
                    onChange={(e) => update(e, item)}
                  />
                </td>
                <td>
                  R$
                  <input
                    min={0}
                    step={0.01}
                    name="material"
                    type="number"
                    value={formatarMoeda(item.material)}
                    onChange={(e) => update(e, item)}
                  />
                </td>
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
                      <option value={l.lider_de_projeto_id} key={i}>
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
}

export default TabelaWbs;
