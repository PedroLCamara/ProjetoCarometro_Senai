import '../../css/perfil.css';

export const Footer = () => {
    return (
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
    )
}

export default Footer;