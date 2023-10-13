import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Toast from "@/components/Toast";

import axios from "axios";

const TarefaLider = (props) => {

    const { id } = useParams();
    const { data } = props;
    const [tasks, setTasks] = useState([]);
    const [newTasks, setNewTasks] = useState([]);
    const [isChanged, setIsChanged] = useState(false);
    const [toast, setToast] = useState(false);
    const [deleteToast, setDeleteToast] = useState(false);
    const [salvarToast, setSalvarToast] = useState(false);
    const [errors, setErrors] = useState([]);
    const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    axios
      .get(`tarefas/subpacote/${id}`)
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
  }, [id, data]);

  const buscarTarefas = () => {
    axios
      .get(`tarefas/subpacote/${id}`)
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
  };

  const adicionarTarefa = () => {
    const novaTarefa = {
      nome: "",
      descricao: "",
      execucao: 0,
      valor: "",
      peso: "",
      data: "",
      hh: "",
      material: "",
    };
    setNewTasks([...newTasks, novaTarefa]);
  };

  function formatarDataParaArray(dataString) {
    const [dia, mes, ano] = dataString.split("/").map(Number);
    return [ano, mes, dia];
  }


    function formatarMoeda(valor) {
        const formatador = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2, 
        });

        return formatador.format(valor);
    }

    const salvarTarefas = () => {
        newTasks.forEach((tarefa) => {
            const dataFormatada = formatarDataParaArray(tarefa.data);
            const materialComoNumero = tarefa.material !== "" ? parseFloat(tarefa.material) : null;
            const novaTarefaParaSalvar = {
                descricao: tarefa.descricao,
                data: dataFormatada,
                hh: tarefa.hh,
                material: materialComoNumero,
                nome: tarefa.nome,
                peso: tarefa.peso,
                execucao: tarefa.execucao,
                subpacotes: {
                    id: id
                }
            };

            axios.post("tarefas", novaTarefaParaSalvar)
                .then((response) => {
                    console.log("Nova tarefa foi salva com sucesso.", response.data);
                    buscarTarefas();
                    setSalvarToast(true);
                })
                .catch((error) => {
                    console.error("Erro ao salvar a nova tarefa.", error);
                });
        });
    });

    setNewTasks([]);


        tasks.forEach((tarefa) => {
            const dataConvertida = tarefa.dataFormatada.split('/').reverse().join('-');
            const materialComoNumero = tarefa.material !== "" ? parseFloat(tarefa.material) : null;
            axios.put(`tarefas/${tarefa.id}`, {
                descricao: tarefa.descricao,
                data: dataConvertida,
                hh: tarefa.hh,
                material: materialComoNumero,
                valor: tarefa.valor,
                nome: tarefa.nome,
                peso: tarefa.peso,
                execucao: tarefa.execucao
            })
                .then((response) => {
                    console.log(`Tarefa ${tarefa.id} foi atualizada com sucesso.`, response.data);
                    buscarTarefas();
                    setToast(true);
                })
                .catch((error) => {
                    console.error(`Erro ao atualizar a tarefa ${tarefa.id}.`, error);
                });
        });
    });
  };

  const reset = () => {
    setTasks(data);
    setNewTasks([]);
    setErrors([]);
    setIsChanged(false);
    buscarTarefas();
  };


    const apagarTarefa = (tarefa) => {
        if (tarefa.id) {
            // Se a tarefa tem um ID, ela já existe no banco de dados e pode ser excluída
            axios.delete(`tarefas/${tarefa.id}`)
                .then((response) => {
                    console.log(`Tarefa ${tarefa.id} foi apagada com sucesso.`, response.data);
                    buscarTarefas();
                    setDeleteToast(true);                   
                })
                .catch((error) => {
                    console.error(`Erro ao apagar a tarefa ${tarefa.id}.`, error);
                });
        } else {
            // Se a tarefa não tem um ID, então é uma nova tarefa
            const updatedNewTasks = newTasks.filter((newTask) => newTask !== tarefa);
            setNewTasks(updatedNewTasks);
        }
    }
    

  // Função para alterar os campos das tarefas existentes
  const handleChange = (index, field, value) => {
    setIsChanged(true);

    const updatedTasks = [...tasks];
    if (field === "data") {
      updatedTasks[index].dataFormatada = value;
    } else {
      updatedTasks[index][field] = value;
    }
    setTasks(updatedTasks);
  };

  // Função para alterar os campos das novas tarefas
  const handleNewTaskChange = (index, field, value) => {
    const updatedNewTasks = [...newTasks];
    updatedNewTasks[index][field] = value;
    setNewTasks(updatedNewTasks);
  };


    return (
        <>
            <Toast show={toast} toggle={setToast}>
                {errors.length
                    ? "Erro ao atualizar Atividade(s)"
                    : "Alterações salvas com sucesso!"}
            </Toast>

            <Toast show={deleteToast} toggle={() => setDeleteToast(false)}>
            {errors.length
                    ? "Erro ao excluir Atividade!"
                    : "Atividade Excluída com Sucesso!"}                
            </Toast>

            <Toast show={salvarToast} toggle={() => setSalvarToast(false)}>
            {errors.length
                    ? "Erro ao salvar Atividade!"
                    : "Atividade Inserida com Sucesso!"}                
            </Toast>


            <div className="d-flex justify-content-end">
                <button
                    className="btn btn-primary mb-2"
                    onClick={adicionarTarefa}>Adicionar Tarefa</button>
            </div>

      <div className="table-responsive">
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
              <th>Ação</th>
            </tr>
          </thead>

                    <tbody>
                        {tasks.map((t, index) => (
                            <tr key={t.id} className={errors.includes(t.id) ? "error" : ""}>
                                <td>{t.id}</td>
                                <td>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={t.nome}
                                        onChange={(e) => handleChange(index, "nome", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={t.descricao}
                                        onChange={(e) => handleChange(index, "descricao", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-control"
                                        value={t.execucao ? "1" : "0"}
                                        onChange={(e) => handleChange(index, "execucao", e.target.value === "1")}
                                    >
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        className="form-control"
                                        type="text"
                                        value={t.peso}
                                        onChange={(e) => handleChange(index, "peso", e.target.value)}
                                    >
                                        <option disabled value={""}>-</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="5">5</option>
                                        <option value="8">8</option>
                                        <option value="13">13</option>
                                        <option value="21">21</option>
                                        <option value="34">34</option>
                                        <option value="55">55</option>
                                        <option value="89">89</option>
                                        <option value="100">100</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={tasks[index].dataFormatada}
                                        onChange={(e) => handleChange(index, "data", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={formatarMoeda(t.valor)}
                                        readOnly={true}
                                        onChange={(e) => handleChange(index, "valor", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        type="number"
                                        value={t.hh}
                                        onChange={(e) => handleChange(index, "hh", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={isEditing ? t.material : formatarMoeda(t.material)}
                                        onChange={(e) => handleChange(index, "material", e.target.value)}
                                        onFocus={() => setIsEditing(true)}
                                        onBlur={() => setIsEditing(false)}
                                    />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => apagarTarefa(t)}>Excluir</button>
                                </td>
                            </tr>
                        ))}

                        {newTasks.map((t, index) => (
                            <tr key={`new-${index}`}>
                                <td>Novo</td>
                                <td>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={t.nome}
                                        onChange={(e) => handleNewTaskChange(index, "nome", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={t.descricao}
                                        onChange={(e) => handleNewTaskChange(index, "descricao", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-control"
                                        value={t.execucao ? "1" : "0"}
                                        onChange={(e) => handleNewTaskChange(index, "execucao", e.target.value === "1")}
                                    >
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        className="form-control"
                                        type="text"
                                        value={t.peso}
                                        onChange={(e) => handleNewTaskChange(index, "peso", e.target.value)}
                                    >
                                        <option disabled value={""}>-</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="5">5</option>
                                        <option value="8">8</option>
                                        <option value="13">13</option>
                                        <option value="21">21</option>
                                        <option value="34">34</option>
                                        <option value="55">55</option>
                                        <option value="89">89</option>
                                        <option value="100">100</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={t.data}
                                        onChange={(e) => handleNewTaskChange(index, "data", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={formatarMoeda(t.valor)}
                                        readOnly={true}
                                        onChange={(e) => handleNewTaskChange(index, "valor", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        type="number"
                                        value={t.hh}
                                        onChange={(e) => handleNewTaskChange(index, "hh", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={isEditing ? t.material : formatarMoeda(t.material)}
                                        onChange={(e) => handleNewTaskChange(index, "material", e.target.value)}
                                        onFocus={() => setIsEditing(true)}
                                        onBlur={() => setIsEditing(false)}
                                    />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-success"
                                        onClick={salvarTarefas}>Salvar</button>
                                    {/* <button
                                    className="btn btn-danger"
                                    onClick={() => apagarTarefa(t)}>Excluir</button> */}
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
                    onClick={salvarTarefas}>Salvar Alterações</button>
            </div>


        </>
    );
};

export default TarefaLider;
