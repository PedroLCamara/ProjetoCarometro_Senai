export const UsuarioAutenticado = () => {
    if (localStorage.getItem('usuario-login') !== null) {
        return true;
    }
    else return false
};

export const TokenConvertido = () => {
    if (localStorage.getItem('usuario-login') !== null) {
        
        let Base64 = localStorage.getItem('usuario-login').split('.')[1];
        return JSON.parse( window.atob(Base64) );
    }
    else return null

}