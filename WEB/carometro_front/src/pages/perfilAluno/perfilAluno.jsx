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
import { GetAsFile, IsFileSet, WebcamCapture } from "../../components/Webcam/Webcam";

export const PerfilAluno = () => {
    const { idAluno } = useParams();
    const [Aluno, setAluno] = useState({});
    const [Comentario, setComentario] = useState('');
    const [Comentarios, setComentarios] = useState([]);

    const [IdTurma, setIdTurma] = useState(0);
    const [Nome, setNome] = useState('');
    const [Rm, setRm] = useState('');
    const [DtNasc, setDtNasc] = useState('');
    const [Cpf, setCpf] = useState('');
    const [Telefone, setTelefone] = useState('');
    const [TelFixo, setTelFixo] = useState('');
    const [EmailAluno, setEmailAluno] = useState('');
    const [EmailResponsavel, setEmailResponsavel] = useState('');
    const [IsLoading, setIsLoading] = useState(false);
    const [ListaTurma, setListaTurma] = useState([]);

    const navigate = useNavigate();

    const ExcluirAluno = async (e) => {
        e.preventDefault()
        var AlunoUrlImg = Aluno.urlimg;
        var AlunoUrlImgArray = AlunoUrlImg.split(".");
        var urlDeletar = AlunoUrlImgArray[0];
        console.log(urlDeletar);
        setIsLoading(true);
        await axios.delete('http://localhost:5000/api/Aluno/' + idAluno, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then(async (resposta) => {
            if (resposta.status == 204) {
                await axios({
                    method: 'delete',
                    url: 'https://carometro-g7.cognitiveservices.azure.com/face/v1.0/facelists/testes/persistedFaces/' + urlDeletar,
                    headers: {
                        'Ocp-Apim-Subscription-Key': '2d6af2ccdff543aaa2ded6dc19b89e68',
                    }
                }).then((resposta) => {
                    console.log(resposta.data)
                }).catch((erro) => {
                    console.log(erro)
                })
                setIsLoading(false)
                navigate('/Listagem')
            }
        }).catch((erro) => {
            setIsLoading(false)
            if (erro.toJSON().status === 401 || erro.toJSON().status === 403) {
                localStorage.removeItem('usuario-login');
                navigate('/login')
            }
            console.log(erro)
        })
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
            if (erro.toJSON().status === 401 || erro.toJSON().status === 403) {
                localStorage.removeItem('usuario-login');
                navigate('/login')
            }
            console.log(erro)
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
        console.log(TokenConvertido().jti);
        await PreencherAluno();
        PreencherComentarios();
        ListarTurmas();
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
        }).catch((erro) => {
            if (erro.toJSON().status === 401 || erro.toJSON().status === 403) {
                localStorage.removeItem('usuario-login');
                navigate('/login')
            }
            console.log(erro)
        })
        PreencherComentarios();
    }

    const CadastrarAluno = async (event) => {
        setIsLoading(true);
        event.preventDefault()
        if (IsFileSet() == undefined) {
            setIsLoading(false);
            alert('Tire uma foto com a webcam!');
        }
        else {
            let ErroSalvo;
            var FaceDetectada = await DetectarFace();
            var SucessoCadastro = true;
            var IdImg;
            if (FaceDetectada === undefined) {
                setIsLoading(false);
                alert("Imagem inválida: Insira uma foto com rosto visível");
            }
            else if (IdTurma === 0) {
                setIsLoading(false);
                alert("Selecione uma turma válida!")
            }
            else {
                let urlImgAntiga = Aluno.urlimg;
                await axios({
                    method: 'post',
                    url: 'https://carometro-g7.cognitiveservices.azure.com/face/v1.0/facelists/testes/persistedFaces?detectionModel=detection_03',
                    data: GetAsFile(),
                    headers: {
                        'Ocp-Apim-Subscription-Key': '2d6af2ccdff543aaa2ded6dc19b89e68',
                        'Content-Type': 'application/octet-stream'
                    }
                }).then((resposta) => {
                    IdImg = resposta.data.persistedFaceId;
                }).catch((erro) => {
                    console.log(erro)
                })
                console.log(GetAsFile());
                var formData = new FormData();
                formData.append('idTurma', IdTurma);
                formData.append('nomeAluno', Nome);
                formData.append('rm', Rm);
                formData.append('dataNascimento', DtNasc);
                formData.append('cpf', Cpf);
                formData.append('telefoneCel', Telefone);
                formData.append('telefoneFixo', TelFixo);
                formData.append('emailAluno', EmailAluno);
                formData.append('emailResponsavel', EmailResponsavel);
                formData.append('urlImg', IdImg);
                formData.append('arquivo', GetAsFile());

                await axios({
                    method: "put",
                    url: "http://localhost:5000/api/Aluno/" + Aluno.idAluno,
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
                    },
                })
                    .then((resposta) => {
                        console.log(resposta);
                        alert("Aluno atualizado com sucesso!")
                        PreencherAluno();
                    }).catch((erro) => {
                        ErroSalvo = erro;
                        SucessoCadastro = false
                    })
                if (SucessoCadastro === false) {
                    await axios({
                        method: 'delete',
                        url: 'https://carometro-g7.cognitiveservices.azure.com/face/v1.0/facelists/testes/persistedFaces/' + IdImg,
                        headers: {
                            'Ocp-Apim-Subscription-Key': '2d6af2ccdff543aaa2ded6dc19b89e68',
                        }
                    }).then((resposta) => {
                        console.log(resposta.data)
                    }).catch((erro) => {
                        console.log(erro)
                    })

                    if (ErroSalvo.toJSON().status === 401 || ErroSalvo.toJSON().status === 403) {
                        localStorage.removeItem('usuario-login');
                        navigate('/login')
                    }
                    console.log(ErroSalvo)
                }
                else{
                    await axios({
                        method: 'delete',
                        url: 'https://carometro-g7.cognitiveservices.azure.com/face/v1.0/facelists/testes/persistedFaces/' + urlImgAntiga.split(".")[0],
                        headers: {
                            'Ocp-Apim-Subscription-Key': '2d6af2ccdff543aaa2ded6dc19b89e68',
                        }
                    }).then((resposta) => {
                        console.log(resposta.data)
                    }).catch((erro) => {
                        console.log(erro)
                    })
                }
                setIsLoading(false);
            }
        }
    }

    const DetectarFace = async () => {
        var FaceDetectada;
        await axios({
            method: 'post',
            url: 'https://carometro-g7.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_03&faceIdTimeToLive=86400',
            data: GetAsFile(),
            headers: {
                'Ocp-Apim-Subscription-Key': '2d6af2ccdff543aaa2ded6dc19b89e68',
                'Content-Type': 'application/octet-stream'
            }
        }).then((resposta) => {
            FaceDetectada = resposta.data[0]
        }).catch((erro) => {
            console.log(erro)
        })
        return FaceDetectada
    }

    const ListarTurmas = async () => {
        axios.get('http://localhost:5000/api/Turma', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            setListaTurma(resposta.data)
            console.log(resposta.data)
        }).catch((erro) => {
            if (erro.toJSON().status === 401 || erro.toJSON().status === 403) {
                localStorage.removeItem('usuario-login');
                navigate('/login')
            }
            console.log(erro)
        })
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
                        {
                            IsLoading == false &&
                            <button className="BtnExcluir" onClick={(e) => ExcluirAluno(e)}>Excluir</button>
                        }
                        {
                            IsLoading == true &&
                            <button className="BtnExcluir" disabled>Carregando...</button>
                        }
                    </div>
                    <h2 className="TituloComentarios">Comentarios</h2>
                    {
                        Comentarios[0] != undefined && Comentarios.map((c) => {
                            return (
                                <div className="Comentario" key={c.idComentario}>
                                    <span className="ComentarioUsuario">{c.idUsuarioNavigation.nomeUsuario + ":"}</span>
                                    <span className="ComentarioDescricao">{c.descricao}</span>   
                                </div>
                            )
                        })
                    }
                </div>
            </main>
            <form onSubmit={(form) => CadastrarAluno(form)} className="FormCadastro FormAtt">
                            <div className="DadoCadastro">
                                <WebcamCapture />
                                <div className='AlinhamentoInputsBotaoCadastro'>
                                    <div className="InputsCadastro">
                                        <select className="CampoCadastro" value={IdTurma} onChange={(select) => setIdTurma(select.target.value)}>
                                            <optgroup>
                                                <option value={0}>Selecione uma turma</option>
                                                {
                                                    ListaTurma != undefined &&
                                                    ListaTurma.map((turma) => {
                                                        return (
                                                            <option value={turma.idTurma}>{turma.descricaoTurma}</option>
                                                        )
                                                    })
                                                }
                                            </optgroup>
                                        </select>
                                        <input className="CampoCadastro" type={"text"} value={Nome} onChange={(input) => setNome(input.target.value)} placeholder="Nome do aluno(a)" required></input>
                                        <input className="CampoCadastro" type={"text"} value={Rm} onChange={(input) => setRm(input.target.value)} placeholder="RM do aluno(a)" required></input>
                                        <input className="CampoCadastro" type={"date"} value={DtNasc} onChange={(input) => setDtNasc(input.target.value)} placeholder="Data de nascimento do aluno(a)" required></input>
                                        <input className="CampoCadastro" type={"text"} value={Cpf} onChange={(input) => setCpf(input.target.value)} placeholder="CPF do aluno(a)" required></input>
                                        <input className="CampoCadastro" type={"text"} value={Telefone} onChange={(input) => setTelefone(input.target.value)} placeholder="Telefone do aluno(a)" required></input>
                                        <input className="CampoCadastro" type={"text"} value={TelFixo} onChange={(input) => setTelFixo(input.target.value)} placeholder="Telefone fixo do aluno(a)" required></input>
                                        <input className="CampoCadastro" type={"email"} value={EmailAluno} onChange={(input) => setEmailAluno(input.target.value)} placeholder="Email do aluno(a)" required></input>
                                        <input className="CampoCadastro" type={"email"} value={EmailResponsavel} onChange={(input) => setEmailResponsavel(input.target.value)} placeholder="Email do responsável do aluno(a)" required></input>
                                    </div>
                                    {
                                        IsLoading === true && <button className="botao_cadastrar"> Loading </button>
                                    }

                                    {
                                        IsLoading === false && <button className="botao_cadastrar" type="submit">
                                            Atualizar
                                        </button>
                                    }
                                </div>
                            </div>
                        </form>
            <Footer />
        </div>

    );
}

export default PerfilAluno;