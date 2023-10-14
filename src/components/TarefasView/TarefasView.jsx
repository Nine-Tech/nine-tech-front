import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Toast from "@/components/Toast";

import axios from "axios";

const TarefaLiderView = (props) => {
  const { subpacoteId } = useParams();
  const { data } = props;
  const [tasks, setTasks] = useState([]);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    axios
      .get(`tarefas/subpacote/${subpacoteId}`)
      .then(({ data }) => {
        if (Array.isArray(data)) {
          data = data.map((tarefa) => ({
            ...tarefa,
            dataFormatada: new Date(tarefa.data).toLocaleDateString("pt-BR"),
          }));
          setTasks(data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar tarefas:", error);
      });
  }, [subpacoteId, data]);

  return (
    <>
      <Toast show={toast} toggle={setToast}>
        Alterações salvas com sucesso!
      </Toast>

      <div className="table-responsive">
        {tasks.length ? (
          <table className="table table-bordered">
            <thead>
              <tr className="table-active">
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Execução</th>
                <th>Peso</th>
                <th>Data Prevista</th>
                <th>Valor</th>
                <th>HH*</th>
                <th>Material</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((t, index) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.nome}</td>
                  <td>{t.descricao}</td>
                  <td>{t.execucao ? "1" : "0"}</td>
                  <td>{t.peso}</td>
                  <td>{t.dataFormatada}</td>
                  <td>{t.valor}</td>
                  <td>{t.hh}</td>
                  <td>{t.material}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center p-5">
            No momento não existem tarefas criadas para esse Pacote, por favor
            volte mais tarde!
          </div>
        )}
      </div>
    </>
  );
};

export default TarefaLiderView;
