import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; 

const TarefaLider = (props) => {
    const { id } = useParams();
    const { data } = props;
    const [tasks, setTasks] = useState([]);
    const [newTasks, setNewTasks] = useState([]); 
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get(`tarefas/subpacote/${id}`)
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
        axios.get(`tarefas/subpacote/${id}`)
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
            peso: "",
            data: "",
            hh: "",
            material: "",
            valor: ""
        };
        setNewTasks([...newTasks, novaTarefa]);
    };

    function formatarDataParaArray(dataString) {
        const [dia, mes, ano] = dataString.split('/').map(Number);
        return [ano, mes, dia];
    }

    
    const salvarTarefas = () => {
        newTasks.forEach((tarefa) => {
            const dataFormatada = formatarDataParaArray(tarefa.data);
            const novaTarefaParaSalvar = {
                descricao: tarefa.descricao,
                data: dataFormatada,
                hh: tarefa.hh,
                material: tarefa.material,
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
                })
                .catch((error) => {
                    console.error("Erro ao salvar a nova tarefa.", error);
                });
        });

        setNewTasks([]);

        tasks.forEach((tarefa) => {
            const dataConvertida = tarefa.dataFormatada.split('/').reverse().join('-');
            axios.put(`tarefas/${tarefa.id}`, {
                descricao: tarefa.descricao,
                data: dataConvertida,
                hh: tarefa.hh,
                material: tarefa.material,
                valor: tarefa.valor,
                nome: tarefa.nome,
                peso: tarefa.peso,
                execucao: tarefa.execucao
            })
                .then((response) => {
                    console.log(`Tarefa ${tarefa.id} foi atualizada com sucesso.`, response.data);
                })
                .catch((error) => {
                    console.error(`Erro ao atualizar a tarefa ${tarefa.id}.`, error);
                });
            buscarTarefas();
        });
    };

    const apagarTarefa = (tarefa) => {
        if (tarefa.id) {
            // Se a tarefa existe ele apaga a tarefa
            axios.delete(`tarefas/${tarefa.id}`)
                .then((response) => {
                    console.log(`Tarefa ${tarefa.id} foi apagada com sucesso.`, response.data);
                    buscarTarefas();
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
                                            value={t.valor}
                                            onChange={(e) => handleChange(index, "valor", e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={t.hh}
                                            onChange={(e) => handleChange(index, "hh", e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={t.material}
                                            onChange={(e) => handleChange(index, "material", e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => apagarTarefa(t)}>Apagar</button>
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
                                            value={t.valor}
                                            onChange={(e) => handleNewTaskChange(index, "valor", e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={t.hh}
                                            onChange={(e) => handleNewTaskChange(index, "hh", e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={t.material}
                                            onChange={(e) => handleNewTaskChange(index, "material", e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => apagarTarefa(t)}>Apagar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
                <button onClick={salvarTarefas}>Salvar Tarefas</button>
            </>
        );
    };


    export default TarefaLider;
