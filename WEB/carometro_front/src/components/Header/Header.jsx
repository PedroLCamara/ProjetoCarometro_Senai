import '../../css/perfil.css';
import { Link } from 'react-router-dom';
import logo_menor from "../../img/logo_menor.png";

export const Header = () => {

    return (
        <header>
            <div className="container containerHeader">
                <img className="logo_menor" src={logo_menor} alt="" />

                <div className="container_header">
                    <Link to="/Listagem">
                        <h3 className="listagem">Listagem de alunos </h3>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;