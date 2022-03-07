import { useState, useEffect } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import '../../css/listagem.css';
import { TokenConvertido, UsuarioAutenticado } from '../../services/auth';
import { GetAsFile, IsFileSet, WebcamCapture } from "../../components/Webcam/Webcam";
import { GetAsFileBusca, IsFileSetBusca, WebcamCaptureBusca } from "../../components/WebcamBusca/WebcamBusca";
import { useNavigate, Link } from 'react-router-dom';
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export const Listagem = () => {
    const [listaAlunos, setListaAlunos] = useState([]);
    const [ListaTurma, setListaTurma] = useState([]);
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
    const [IdTurmaListagem, setIdTurmaListagem] = useState(0);
    const [QueryBusca, setQueryBusca] = useState('');
    const navigate = useNavigate();

    const BuscarPorQuery = async (e) => {
        e.preventDefault();
        await axios.get('http://localhost:5000/api/Aluno/por-nome/' + QueryBusca, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then(async (resposta) => {
            if (resposta.data.length > 0) {
                console.log(resposta.data)
                setListaAlunos(resposta.data)
            }
            else {
                await axios.get('http://localhost:5000/api/Aluno', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                    },
                }).then((resposta) => {
                    setListaAlunos(resposta.data)
                    console.log(resposta.data)
                }).catch((erro) => {
                    if (erro.toJSON().status === 401 || erro.toJSON().status === 403) {
                        localStorage.removeItem('usuario-login');
                        navigate('/login')
                    }
                    console.log(erro)
                })
                alert('Não há alunos com este nome!');
            }
        })
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

    const ListarAlunos = async () => {
        axios.get('http://localhost:5000/api/Aluno', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            setListaAlunos(resposta.data)
            console.log(resposta.data)
        }).catch((erro) => {
            if (erro.toJSON().status === 401 || erro.toJSON().status === 403) {
                localStorage.removeItem('usuario-login');
                navigate('/login')
            }
            console.log(erro)
        })
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
                    method: "post",
                    url: "http://localhost:5000/api/Aluno",
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
                    },
                })
                    .then((resposta) => {
                        console.log(resposta);
                        alert("Aluno cadatrado com sucesso!")
                        ListarAlunos();
                    }).catch((erro) => {
                        ErroSalvo = erro;
                        console.log(erro)
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
                }
                setIsLoading(false);
            }
        }
    }

    const DetectarFaceBusca = async () => {
        var retorno;
        const img = GetAsFileBusca();
        await axios({
            method: 'post',
            url: 'https://carometro-g7.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_03&faceIdTimeToLive=86400',
            data: img,
            headers: {
                'Ocp-Apim-Subscription-Key': '2d6af2ccdff543aaa2ded6dc19b89e68',
                'Content-Type': 'application/octet-stream'
            }
        }).then((resposta) => {
            console.log(resposta.data[0]);
            retorno = resposta.data[0];
        }).catch((erro) => {
            console.log(erro)
        })
        return retorno;
    }

    const RetornarFaceSimilar = async (ListaPossiveisFaces) => {
        let FaceSimilar;
        await ListaPossiveisFaces.forEach(async (item) => {
            if (item.confidence > 0.5) {
                if (FaceSimilar == undefined) {
                    FaceSimilar = item
                }
                else if (item.confidence > FaceSimilar.confidence) {
                    FaceSimilar = item
                }
            }
        });
        return FaceSimilar
    }

    const AcharAluno = async (event) => {
        var FaceSimilar;
        var ListaPossiveisFaces;
        var FaceDetectada;
        event.preventDefault()
        if (IsFileSetBusca() == false) {
            alert('Capture uma foto!')
        }
        else {
            FaceDetectada = await DetectarFaceBusca();
            if (FaceDetectada === undefined) {
                alert("Imagem inválida: Insira uma foto com rosto visível");
            }
            else {
                await axios.post('https://carometro-g7.cognitiveservices.azure.com/face/v1.0/findsimilars',
                    {
                        "faceId": FaceDetectada.faceId,
                        "faceListId": "testes"
                    },
                    {
                        headers: {
                            'Ocp-Apim-Subscription-Key': '2d6af2ccdff543aaa2ded6dc19b89e68'
                        }
                    }).then((resposta) => {
                        ListaPossiveisFaces = resposta.data
                    }).catch((erro) => {
                        console.log(erro)
                    });

                FaceSimilar = await RetornarFaceSimilar(ListaPossiveisFaces)

                console.log(FaceSimilar)

                if (FaceSimilar != undefined) {
                    axios.get("http://localhost:5000/api/Aluno/porimagem/" + FaceSimilar.persistedFaceId, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                        }
                    }).then(async (resposta) => {
                        let alunoBusca = await resposta.data;
                        let idAlunoBusca = await alunoBusca.idAluno;
                        if (resposta.data != undefined) {
                            navigate('/perfilAluno/' + idAlunoBusca)
                        }
                        else alert("Face não reconhecida!");
                    }).catch((erro) => {
                        if (erro.toJSON().status === 401 || erro.toJSON().status === 403) {
                            localStorage.removeItem('usuario-login');
                            navigate('/login')
                        }
                        console.log(erro)
                    })
                }
                else alert("Face não reconhecida!");
            }
        }
    }

    useEffect(async () => {
        await ListarTurmas();
        await ListarAlunos();
        console.log(UsuarioAutenticado())
    }, [])


    if (TokenConvertido().Role === "2") {
        render()
        return (
            <div>
                <Header />
                <main className="tela_listagem">
                    <div className='ContainerListagem'>
                        <h1 className="h1_listagem">Listagem de Alunos</h1>
                        <div className='BoxPesquisas'>
                            <form onSubmit={(e) => BuscarPorQuery(e)}>
                                <input value={QueryBusca} onChange={(e) => setQueryBusca(e.target.value)} placeholder="Pesquisar Aluno" className='InputPesquisa'></input>
                                <button type='submit' className='BotaoPesquisa'></button>
                            </form>
                            <select className="InputPesquisa" value={IdTurmaListagem} onChange={(select) => setIdTurmaListagem(select.target.value)}>
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
                            <div>
                                <button onClick={(e) => AcharAluno(e)} type="submit" className='TextoWebcam'>Pesquisar por imagem</button>
                                <WebcamCaptureBusca />
                            </div>
                        </div>
                        {
                            IdTurmaListagem == 0 &&
                            listaAlunos.map((aluno) => {
                                return (
                                    <Link className='ContainerAlunoListado' key={aluno.idAluno} to={"/perfilAluno/" + aluno.idAluno}>
                                        <div className='BoxInterno'>
                                            <img src={'http://localhost:5000/StaticFiles/Images/' + aluno.urlimg} alt="" />
                                            <div className='BoxDadosAluno'>
                                                <div>
                                                    <p>{aluno.nomeAluno}</p>
                                                    <p>{new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(aluno.dataNascimento.split('T')[0]))}</p>
                                                </div>
                                                <div>
                                                    <p>{ListaTurma.find(t => t.idTurma == aluno.idTurma).descricaoTurma}</p>
                                                    <p>{aluno.emailAluno}</p>
                                                    <p>{aluno.rm}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                        {
                            IdTurmaListagem != 0 &&
                            listaAlunos.filter(c => c.idTurma == IdTurmaListagem).map((aluno) => {
                                return (
                                    <Link className='ContainerAlunoListado' key={aluno.idAluno} to={"/perfilAluno/" + aluno.idAluno}>
                                        <div className='BoxInterno'>
                                            <img src={'http://localhost:5000/StaticFiles/Images/' + aluno.urlimg} alt="" />
                                            <div className='BoxDadosAluno'>
                                                <div>
                                                    <p>{aluno.nomeAluno}</p>
                                                    <p>{new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(aluno.dataNascimento.split('T')[0]))}</p>
                                                </div>
                                                <div>
                                                    <p>{ListaTurma.find(t => t.idTurma == aluno.idTurma).descricaoTurma}</p>
                                                    <p>{aluno.emailAluno}</p>
                                                    <p>{aluno.rm}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
    else {
        render()
        return (
            <div>
                <Header />
                <div className='ContainerGrid ContainerTelaListagem'>
                    <main className="tela_listagem">
                        <form onSubmit={(form) => CadastrarAluno(form)} className="FormCadastro">
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
                                            Cadastrar
                                        </button>
                                    }
                                </div>
                            </div>
                        </form>
                        <div className='ContainerListagem'>
                            <h1 className="h1_listagem">Listagem de Alunos</h1>
                            <div className='BoxPesquisas'>
                                <form onSubmit={(e) => BuscarPorQuery(e)}>
                                    <input value={QueryBusca} onChange={(e) => setQueryBusca(e.target.value)} placeholder="Pesquisar Aluno" className='InputPesquisa'></input>
                                    <button type='submit' className='BotaoPesquisa'></button>
                                </form>
                                <select className="InputPesquisa" value={IdTurmaListagem} onChange={(select) => setIdTurmaListagem(select.target.value)}>
                                    <optgroup>
                                        <option value={0}>Selecione uma turma</option>
                                        {
                                            ListaTurma.map((turma) => {
                                                return (
                                                    <option value={turma.idTurma}>{turma.descricaoTurma}</option>
                                                )
                                            })
                                        }
                                    </optgroup>
                                </select>
                                <div>
                                    <button onClick={(e) => AcharAluno(e)} type="submit" className='TextoWebcam'>Pesquisar por imagem</button>
                                    <WebcamCaptureBusca />
                                </div>
                            </div>
                            {
                                IdTurmaListagem == 0 &&
                                listaAlunos.map((aluno) => {
                                    return (
                                        <Link className='ContainerAlunoListado' key={aluno.idAluno} to={"/perfilAluno/" + aluno.idAluno}>
                                            <div className='BoxInterno'>
                                                <img src={'http://localhost:5000/StaticFiles/Images/' + aluno.urlimg} alt="" />
                                                <div className='BoxDadosAluno'>
                                                    <div>
                                                        <p>{aluno.nomeAluno}</p>
                                                        <p>{new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(aluno.dataNascimento.split('T')[0]))}</p>
                                                    </div>
                                                    <div>
                                                        {
                                                            ListaTurma != undefined &&
                                                            <p>{ListaTurma.find(t => t.idTurma == aluno.idTurma).descricaoTurma}</p>
                                                        }
                                                        <p>{aluno.emailAluno}</p>
                                                        <p>{aluno.rm}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                            {
                                IdTurmaListagem != 0 &&
                                listaAlunos.filter(c => c.idTurma == IdTurmaListagem).map((aluno) => {
                                    return (
                                        <Link className='ContainerAlunoListado' key={aluno.idAluno} to={"/perfilAluno/" + aluno.idAluno}>
                                            <div className='BoxInterno'>
                                                <img src={'http://localhost:5000/StaticFiles/Images/' + aluno.urlimg} alt="" />
                                                <div className='BoxDadosAluno'>
                                                    <div>
                                                        <p>{aluno.nomeAluno}</p>
                                                        <p>{new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(aluno.dataNascimento.split('T')[0]))}</p>
                                                    </div>
                                                    <div>
                                                        {
                                                            ListaTurma != undefined &&
                                                            <p>{ListaTurma.find(t => t.idTurma == aluno.idTurma).descricaoTurma}</p>
                                                        }
                                                        <p>{aluno.emailAluno}</p>
                                                        <p>{aluno.rm}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        )
    }


}

export default Listagem;