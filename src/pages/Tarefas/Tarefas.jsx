import { useEffect } from "react";
import "./style.scss";

const Tarefas = () => {

  useEffect(() => {
    window.axios.get("");
  }, []);

  return (

  <>
  <h1>Tarefas</h1>
  </>

  )
};

export default Tarefas;
