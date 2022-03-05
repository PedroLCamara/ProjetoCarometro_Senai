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
                        <img className="logo_menor" src={logo_menor} alt="" />

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
                                {/* <h4>Nome aluno(a)</h4> */}
                                <input type="name" placeholder="Nome do Aluno" />
                            </div>
                            <div className="unica">
                                {/* <h4>Rm do aluno(a)</h4> */}
                                <input type="text" placeholder="Rm do Aluno(a)" />
                            </div>
                            <div className="unica">
                                {/* <h4>Turma do aluno(a)</h4> */}
                                <input type="Text" placeholder="Turma do Aluno" />
                            </div>
                        </div>
                    </div>

                    <div className="container_input2">
                        <div>
                            {/* <h4>Data Nascimento</h4> */}
                            <input type="Data" placeholder="Data de Nascimento" />
                        </div>
                        <div>
                            {/* <h4>CPF do aluno(a)</h4> */}
                            <input type="Text" placeholder="CPF do aluno(a)" />
                        </div>
                    </div>

                    <div className="container_input3">
                        <div>
                            {/* <h4>Telefone do responsavel</h4> */}
                            <input type="text"placeholder="Telefone do Responsavel"/>
                        </div>
                        <div>
                            {/* <h4>Telefone  fixo</h4> */}
                            <input type="text" placeholder="Telefone Fixo"/>
                        </div>
                    </div>

                    <div className="container_input4">
                        <div>
                            {/* <h4>Email do aluno(a)</h4> */}
                            <input type="E-mail" placeholder="E-mail do Aluno(a)" />
                        </div>
                        <div>
                            {/* <h4>email do responsavel</h4> */}
                            <input type="E-mail" placeholder="E-mail do responsavel" />
                        </div>
                    </div>

                    <div className="container_comentario">
                        <div>
                            <input type="text"  placeholder="Faça seu Comentário"/>
                        </div>
                    </div>

                    <div className="botao_salvar">
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

                    <footer className="container_footer">
                        <div className="contatos-endereco container">
                            <div className="contatos">
                                <h3>Contatos: </h3>
                                <p>(11) 91789-8675</p>
                                <p>(11) 2754-5468</p>
                            </div>
                            <div className="endereco">
                               <h3>Endereço: </h3>
                               <p>Rua Barão de limeira , 34</p>
                            </div>
                        </div>
                    </footer>


                </main>
            </div>

        );
    }
}
