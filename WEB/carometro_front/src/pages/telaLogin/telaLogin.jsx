import '../../css/estilo.css';
import { Component } from "react";
import imgfundo from '../../img/fundo_login.png'
import logo from '../../img/logo.png'
import axios from 'axios';
import { UsuarioAutenticado } from '../../services/auth';
import { Navigate } from 'react-router-dom';

export default class Login extends Component {


  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      erroMensagem: '',
      isLoading: false,
      redirectTo: null,
    };
  }

  
  efetuaLogin = (event) => {
    event.preventDefault();
    console.log('logando')
    this.setState({ erroMensagem: '', isLoading: true });

    axios.post('http://localhost:5000/api/Login', {
      email: this.state.email,
      senha: this.state.senha,
    })

      .then((resposta) => {
        if (resposta.status === 200) {

          localStorage.setItem('usuario-login', resposta.data.token);
          this.setState({ isLoading: false });
          this.setState({redirectTo : "/Listagem"});
        }
      })

      .catch(() => {
        this.setState({
          erroMensagem: 'E-mail ou senha inválidos, corrija NOVAMENTE',
          isLoading: false,
        });
      });

  }

  atualizaStateCampo = (campo) => {
    this.setState({ [campo.target.name]: campo.target.value });
  };




  render() {
    if (this.state.redirectTo != null) {
      return(
        <Navigate to={this.state.redirectTo} />
      )
    }
    return (
      <div >
        <main>
          <form onSubmit={this.efetuaLogin}>
            <div class="principal">
              <div>
                <img class="fundo" src={imgfundo} alt="" />
              </div>
              <div className="insersao">
                <img class="logo" src={logo} alt="" />
                <div>
                  <input value={this.state.email} onChange={this.atualizaStateCampo} class="inputU" type="email" name="email" />
                </div>
                <div>
                  <input value={this.state.senha} onChange={this.atualizaStateCampo} class="inputS" type="password" name="senha" />
                </div>
                <div>
                  {
                    this.state.isLoading === true && <button className="botaoentrar" id="btn-login"> Loading </button>
                  }

                  {
                    this.state.isLoading === false && <button className="botaoentrar" id="btn-login" type="submit"
                      disabled={this.state.email === '' || this.state.senha === '' ? 'none' : ''} >
                      Logar
                    </button>
                  }
                </div>
              </div>


            </div>
          </form>

        </main>
        <footer class="headerL">
          <div class="classeH">
            <div class="divH">
              <h3>Contatos: </h3>
              <p>(11) 91789-8675</p>
              <p>(11) 2754-5468</p>
            </div>
            <div class="divH2">
              <h3>Endereço: </h3>
              <p>Rua Barão de limeira , 34</p>


            </div>
          </div>
        </footer>
      </div>
    );
  }
}