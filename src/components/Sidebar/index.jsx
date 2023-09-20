import { Link } from "react-router-dom";
import "./style.scss";

const Sidebar = () => {
  const buttons = () => {
    let options = [
      { link: "", name: "Home", icon: "" },
      // { link: "pacotes", name: "Pacotes", icon: "" },
      // { link: "projetos", name: "Projetos", icon: "" },
      // { link: "tarefas", name: "Tarefas", icon: "" },
    ];

    return options.map((opt) => (
      <Link to={opt.link} className="btn text-start py-3" key={opt.name}>
        <i className={opt.icon} />
        <span>{opt.name}</span>
      </Link>
    ));
  };

  return <div className="sidebar p-4">{buttons()}</div>;
};

export default Sidebar;
