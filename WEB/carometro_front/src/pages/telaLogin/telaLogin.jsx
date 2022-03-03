import '../../css/estilo.css';
import { Component } from "react";
import imgfundo from '../../img/fundo_login.png'
import logo from '../../img/logo.png'
export default class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
          email: '',
          senha: '',
          erroMensagem: '',
          isLoading: false,
        };
      }
    
      efetuaLogin = (event) => {
        event.preventDefault();
        console.log('logando')
        this.setState({ erroMensagem: '', isLoading: true });
    
        // axios.post('http://192.168.18.9:5000/api/Login', {
        //   email: this.state.email,
        //   senha: this.state.senha,
        // })
    
        axios.post('http://192.168.18.9:5000/api/Login', {
          email: this.state.email,
          senha: this.state.senha,
        })
    
          .then((resposta) => {
            if (resposta.status === 200) {
    
              localStorage.setItem('usuario-login', resposta.data.token);
              this.setState({ isLoading: false })
    
              let base64 = localStorage.getItem('usuario-login').split('.')[1];
    
    
              console.log(base64)
    
              if (parseJwt().role === '1') {
    
                this.props.history.push('/');
                console.log('logado: ' + usuarioAutenticado());
              } else if (parseJwt().role === '2') {
                this.props.history.push('/');
              } 
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
        return (
            <div >
                <main>
                    <div class="principal">
                            <div>
                                <img class="fundo" src={imgfundo} alt="" />
                            </div>
                            <div className="insersao">
                                <img class="logo" src={logo} alt="" />
                                <div>
                                        <input class="inputU" type="text" name="Usuario" id="" />
                                </div>
                                <div>
                                        <input class="inputS" type="text" name="Senha" id="" />
                                </div> 
                                <div>
                                        <button class="botaoentrar">LOGIN</button>
                                </div>                        
                            </div>
                            
                            
                    </div>
                    
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
