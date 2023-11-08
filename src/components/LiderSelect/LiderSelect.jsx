import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Toast from "@/components/Toast";
import ExcelDownloadButton from "../ExportExcel/ExportExcel";

const LiderSelect = (props) => {
  const { id } = useParams();
  const { data } = props;
  const [packages, setPackages] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [selectedLeader, setSelectedLeader] = useState(""); // Adicione o estado para o líder selecionado
  const [isChanged, setIsChanged] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    // Obtenha os líderes de projeto
    window.axios.get(`lider`).then(({ data }) => {
      setLeaders(data);
    });

    // Obtenha os pacotes
    window.axios.get(`upload/todosfilhos/${id}`).then(({ data }) => {
      setPackages(data);
      console.log(data);
    });
  }, [id]);

  const reset = () => {
    // Reset do estado de pacotes
    setPackages(data);
    setErrors([]);
    setIsChanged(false);
  };

  const update = (e, item) => {
    if (!isChanged) setIsChanged(true);
    const target = e.target;
    const selectedLeaderId = parseInt(target.value, 10);

    // Encontre o objeto líder de projeto correspondente ao ID selecionado
    const selectedLeaderObj = leaders.find((l) => l.id === selectedLeaderId);

    const updatedItem = {
      ...item,
      liderDeProjeto: selectedLeaderObj || selectedLeaderId, // Use o objeto ou o ID
    };

    // Atualize o estado de pacotes com o novo valor de liderDeProjeto
    const updatedPackages = packages.map((p) =>
      p.id === item.id ? updatedItem : p,
    );
    setPackages(updatedPackages);

    console.log(updatedPackages);

    // Atualize o líder de projeto selecionado
    setSelectedLeader(selectedLeaderId);
  };

  const save = () => {
    setLoading(true);
    setErrors([]);

    const promises = packages
      .filter((item) => {
        // Verifique se o pacote foi alterado e se o líder de projeto não é nulo
        return (
          item.liderDeProjeto !== undefined && item.liderDeProjeto !== null
        );
      })
      .map((item) => {
        const data = {
          liderDeProjeto: parseInt(selectedLeader),
        };

        return new Promise((resolve, reject) => {
          window.axios
            .put(`subpacotes/${item.liderDeProjeto.id}/${item.id}`)
            .then(resolve)
            .catch(() => reject(item.id));
        });
      });

    Promise.allSettled(promises)
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
              <tr key={item.nome}>
                <td>{item.nome}</td>
                <td>
                  {item.liderDeProjeto !== undefined ? (
                    <select
                      className="form-select form-select-sm"
                      aria-label="small select example"
                      value={item.liderDeProjeto ? item.liderDeProjeto.id : ""}
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
                  ) : (
                    " - "
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 d-flex justify-content-end">
        <ExcelDownloadButton rota={"teste"}></ExcelDownloadButton>
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
