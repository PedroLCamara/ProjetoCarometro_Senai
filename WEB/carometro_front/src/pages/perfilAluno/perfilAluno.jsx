import { Component } from "react";
import '../../css/perfil.css'
import logo_menor from "../../img/logo_menor.png";
import logo_meninas from "../../img/logo_meninas.png";

export default class Login extends Component {
    render() {
        return (
            <div>
                <header>
                    <div className="container containerHeader">
                        <img class="logo_menor" src={logo_menor} alt="" />

                        <div className="container_header">
                            <h3 className="listagem">Listagem de alunos </h3>
                            <h3 className="perfil">Perfil de alunos</h3>
                        </div>
                    </div>
                </header>

                <main>
                    <img className="logo_meninas" src={logo_meninas} alt="" />
                    <input type="Nome aluno(a)" />
                </main>
            </div>

        );
    }
}