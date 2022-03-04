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
                    <div className="container_main">

                        <img className="logo_meninas" src={logo_meninas} alt="" />

                        <div className="container_input">
                            <div className="unica">
                                <h4>Nome aluno(a)</h4>
                                <input type="Nome aluno(a)" />
                            </div>
                            <div className="unica">
                                <h4>Rm do aluno(a)</h4>
                                <input type="Rm do aluno(a)" />
                            </div>
                            <div className="unica">
                                <h4>Turma do aluno(a)</h4>
                                <input type="Turma do aluno(a)" />
                            </div>
                        </div>
                    </div>

                    <div className="container_input2">
                        <div>
                            <h4>Data Nascimento</h4>
                            <input type="Data Nascimento" />
                        </div>
                        <div>
                            <h4>CPF do aluno(a)</h4>
                            <input type="CPF do aluno(a)" />
                        </div>
                    </div>

                    <div className="container_input3">
                        <div>
                            <h4>Telefone do responsavel</h4>
                            <input type="Telefone do responsavel" />
                        </div>
                        <div>
                            <h4>Telefone  fixo</h4>
                            <input type="Telefone  fixo" />
                        </div>
                    </div>

                    <div className="container_input4">
                        <div>
                            <h4>Email do aluno(a)</h4>
                            <input type="Email do aluno(a)" />
                        </div>
                        <div>
                            <h4>email do responsavel</h4>
                            <input type="email do responsavel" />
                        </div>
                    </div>

                    <div className="container_comentario">
                        <h4>Faça seu comentario</h4>
                        <div>
                        <input type="Faça seu comentario" />
                        </div>
                    </div>

                    <div className="input_salvar">
                        <div>
                            <button>Alterar</button>
                        </div>

                        <div>
                            <button>Salvar</button>
                        </div>

                        <div>
                            <button>Excluir</button>
                        </div>
                    </div>


                </main>
            </div>

        );
    }
}
