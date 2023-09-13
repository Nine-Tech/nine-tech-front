import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { useState } from "react";

function BodyHeaderProjeto() {
  const [activeTab, setActiveTab] = useState("Tabela WBE");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="body-header">
      <h3>NOME PROJETO</h3>
      <div className="icons">
        <div className="pencil">
          <FontAwesomeIcon icon={faPencil} className="fa-lg" />
        </div>
        <div className="trash">
          <FontAwesomeIcon icon={faTrash} className="fa-lg" />
        </div>
      </div>
      <hr />
      <div className="opcoes">
        <a
          href="#"
          className={activeTab === "Tabela WBE" ? "active" : ""}
          onClick={() => handleTabClick("Tabela WBE")}
        >
          Tabela WBE
        </a>
        <a
          href="#"
          className={activeTab === "Gantt" ? "active" : ""}
          onClick={() => handleTabClick("Gantt")}
        >
          Gantt
        </a>
        <a
          href="#"
          className={activeTab === "Avanço Projeto" ? "active" : ""}
          onClick={() => handleTabClick("Avanço Projeto")}
        >
          Avanço Projeto
        </a>
      </div>
    </div>
  );
}

export default BodyHeaderProjeto;
