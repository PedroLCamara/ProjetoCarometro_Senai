import { Component } from "react";
import '../../css/perfil.css';
import logo_menor from "../../img/logo_menor.png";
import logo_meninas from "../../img/logo_meninas.png";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TokenConvertido, UsuarioAutenticado } from '../../services/auth';
import axios from "axios";

export const PerfilAluno = () => {
    const { idAluno } = useParams();
    const [Aluno, setAluno] = useState({});
    const [Comentario, setComentario] = useState('');
    const [Comentarios, setComentarios] = useState([]);

    const navigate = useNavigate();

    const ExcluirAluno = async (e) => {
        e.preventDefault()
        await axios.delete('http://localhost:5000/api/Aluno/' + idAluno, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            if (resposta.status == 204) {
                navigate('/Listagem')
            }
        }).catch((erro) => console.log(erro))
    }

    const PreencherAluno = async () => {
        await axios.get('http://localhost:5000/api/Aluno/porid/' + idAluno, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            if (resposta.status == 200) {
                console.log(resposta.data)
                setAluno(resposta.data)
            }
            else {
                navigate('/Listagem')
            }
        }).catch((erro) => {
            console.log(erro);
        })
    }

    const PreencherComentarios = async () => {
        await axios.get('http://localhost:5000/api/Comentario/' + idAluno, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            console.log(resposta.data);
            setComentarios(resposta.data);
        })
    }

    useEffect(async () => {
        await PreencherAluno();
        PreencherComentarios();
        console.log(TokenConvertido());
    }, [])

    const Comentar = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/Comentario/' + idAluno, {
            "idUsuario": parseInt(TokenConvertido().jti),
            "descricao": Comentario
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            console.log(resposta)
            alert('Comentario publicado!')
        }).catch((erro) => console.log(erro))
        PreencherComentarios();
    }

    return (
        <div>
            <Header />
            <main className="MainPerfil ContainerGrid">
                <img className="logo_meninas" src={'http://localhost:5000/StaticFiles/Images/' + Aluno.urlimg}></img>
                <div className="ContainerPerfil">
                    <div className="DadosPerfil">
                        <span>{Aluno.nomeAluno}</span>
                        <span>{Aluno.rm}</span>
                        {
                            Aluno.idTurmaNavigation != undefined && <span>{Aluno.idTurmaNavigation.descricaoTurma}</span>
                        }
                        {
                            Aluno.dataNascimento != undefined && <span>{new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(Aluno.dataNascimento.split('T')[0]))}</span>
                        }
                        <span>{Aluno.cpf}</span>
                        <span>{Aluno.telefoneCel}</span>
                        <span>{Aluno.telefoneFixo}</span>
                        <span>{Aluno.emailAluno}</span>
                        <span>{Aluno.emailResponsavel}</span>
                    </div>
                    <form className="FormularioComentario" onSubmit={(e) => Comentar(e)}>
                        <input value={Comentario} onChange={(e) => setComentario(e.target.value)} type="text" placeholder="Insira um comentario..." className="InputComentario"></input>
                        <button type="submit"></button>
                    </form>
                    <div className="InputsPerfil">
                        <button className="BtnExcluir" onClick={(e) => ExcluirAluno(e)}>Excluir</button>
                    </div>
                    <h2 className="TituloComentarios">Comentarios</h2>
                    {
                        Comentarios[0] != undefined && Comentarios.map((c) => {
                            return (
                                <span className="Comentario" key={c.idComentario}>{c.descricao}</span>
                            )
                        })
                    }
                </div>
            </main>
            <Footer />
        </div>

    );
}

export default PerfilAluno;