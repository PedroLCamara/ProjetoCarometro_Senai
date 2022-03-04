//Página apenas para a definição do formulário e lógica utilizados no cadastro de um aluno,
//Não representa uma tela no escopo definitivo :)
import { useState, useEffect } from "react";
import axios from 'axios';
import { GetAsFile, IsFileSet, WebcamCapture } from "../../components/Webcam/Webcam";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { UsuarioAutenticado, TokenConvertido } from "../../services/auth";
import '../../css/cadastro.css'

export const TesteCadastro = () => {
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


    const ListarTurmas = () => {
        axios.get('http://localhost:5000/api/Turma', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            setListaTurma(resposta.data)
            console.log(resposta.data)
        }).catch((erro) => {
            console.log(erro)
        })
    }

    useEffect(() => {
        ListarTurmas();
        if (UsuarioAutenticado() == false) {
            Navigate('/')
        }
    }, [])

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
        event.preventDefault()
        if (IsFileSet() == undefined) {
            alert('Tire uma foto com a webcam!');
        }
        else {
            var FaceDetectada = await DetectarFace();
            var SucessoCadastro = true;
            var IdImg;
            if (FaceDetectada === undefined) {
                alert("Imagem inválida: Insira uma foto com rosto visível");
            }
            else if (IdTurma === 0) {
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
                }).catch((erro) => {
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
                }
            }
        }
    }

    return (
        <div>
            <form onSubmit={(form) => CadastrarAluno(form)} className="FormCadastro ContainerGrid">
                <div className="DadoCadastro">
                    <WebcamCapture />
                    <div className="InputsCadastro ContainerGrid">
                        <select className="CampoCadastro" value={IdTurma} onChange={(select) => setIdTurma(select.target.value)}>
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
                        <input className="CampoCadastro" type={"text"} value={Nome} onChange={(input) => setNome(input.target.value)} placeholder="Nome do aluno(a)" required></input>
                        <input className="CampoCadastro" type={"text"} value={Rm} onChange={(input) => setRm(input.target.value)} placeholder="RM do aluno(a)" required></input>
                        <input className="CampoCadastro" type={"date"} value={DtNasc} onChange={(input) => setDtNasc(input.target.value)} placeholder="Data de nascimento do aluno(a)" required></input>
                        <input className="CampoCadastro" type={"text"} value={Cpf} onChange={(input) => setCpf(input.target.value)} placeholder="CPF do aluno(a)" required></input>
                        <input className="CampoCadastro" type={"text"} value={Telefone} onChange={(input) => setTelefone(input.target.value)} placeholder="Telefone do aluno(a)" required></input>
                        <input className="CampoCadastro" type={"text"} value={TelFixo} onChange={(input) => setTelFixo(input.target.value)} placeholder="Telefone fixo do aluno(a)" required></input>
                        <input className="CampoCadastro" type={"email"} value={EmailAluno} onChange={(input) => setEmailAluno(input.target.value)} placeholder="Email do aluno(a)" required></input>
                        <input className="CampoCadastro" type={"email"} value={EmailResponsavel} onChange={(input) => setEmailResponsavel(input.target.value)} placeholder="Email do responsável do aluno(a)" required></input>
                    </div>
                </div>
                {
                    IsLoading === true && <button className="BotaoCadastro"> Loading </button>
                }

                {
                    IsLoading === false && <button className="BotaoCadastro" type="submit">
                        Cadastrar
                    </button>
                }
            </form>
        </div>
    )
}

export default TesteCadastro;