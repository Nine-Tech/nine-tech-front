import React from 'react'
import logo from "@/assets/images/9tech-logo.png";
import { Link } from "react-router-dom";


const Navbar = () => {

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

    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/"><img src={logo} alt="9tech-logo" width="90"></img></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active fs-5 fw-bold" aria-current="page" href="/">Home</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>




        </>
    )
}

export default Navbar

/*  <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <img src={logo} alt="9tech-logo" width="90"></img>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse">{buttons()}</div>
            </nav> */