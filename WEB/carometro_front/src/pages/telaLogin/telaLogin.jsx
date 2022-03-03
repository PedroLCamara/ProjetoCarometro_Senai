import '../../css/estilo.css';
import { Component } from "react";
import imgfundo from '../../img/fundo_login.png'
import logo from '../../img/logo.png'
export default class Login extends Component {
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
                                <input type="text" name="" id="" />
                               
                            </div>
                    </div>
                    
                </main>
            </div>
        );
    }
}
