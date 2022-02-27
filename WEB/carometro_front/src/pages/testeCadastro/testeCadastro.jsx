//Página apenas para a definição do formulário e lógica utilizados no cadastro de um aluno,
//Não representa uma tela no escopo definitivo :)
import { useState, useEffect } from "react";
import axios from 'axios';
import { eventWrapper } from "@testing-library/user-event/dist/utils";

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
    const [IdImg, setIdImg] = useState('');
    const [FaceDetectada, setFaceDetectada] = useState({});


    const ListarTurmas = () => {
        axios.get('http://localhost:5000/api/Turma', {
            headers: {
                Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbUBnbWFpbC5jb20iLCJqdGkiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiMSIsIlJvbGUiOiIxIiwiZXhwIjoxNjQ1OTk3NDExLCJpc3MiOiJjYXJvbWV0cm8ud2ViYXBpIiwiYXVkIjoiY2Fyb21ldHJvLndlYmFwaSJ9._BiHvApQhzHXSk5ZSiv1t1CxXvR3RcO4ukKKXp79xVg',
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
    }, [])

    const DetectarFace = async () => {
        const img = document.getElementById("inputImgCadastroAluno").files[0];
        axios({
            method: 'post',
            url: 'https://carometro-g7.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_03&faceIdTimeToLive=86400',
            data: img,
            headers: {
                'Ocp-Apim-Subscription-Key': '2d6af2ccdff543aaa2ded6dc19b89e68',
                'Content-Type': 'application/octet-stream'
            }
        }).then((resposta) => {
            setFaceDetectada(resposta.data[0]);
        }).catch((erro) => {
            console.log(erro)
        })
    }

    const CadastrarAluno = async (event) => {
        event.preventDefault()
        const img = document.getElementById("inputImgCadastroAluno").files[0];
        var SucessoCadastro = true;
        if (FaceDetectada === undefined) {
            alert("Imagem inválida: Insira uma foto com rosto visível");
        }
        else if(IdTurma === 0){
            alert("Selecione uma turma válida!")
        }
        else {
            await axios({
                method: 'post',
                url: 'https://carometro-g7.cognitiveservices.azure.com/face/v1.0/facelists/testes/persistedFaces?detectionModel=detection_03',
                data: img,
                headers: {
                    'Ocp-Apim-Subscription-Key': '2d6af2ccdff543aaa2ded6dc19b89e68',
                    'Content-Type': 'application/octet-stream'
                }
            }).then((resposta) => {
                setIdImg(resposta.data.persistedFaceId)
            }).catch((erro) => {
                console.log(erro)
            })
            await axios.post('http://localhost:5000/api/Aluno', {
                    "idTurma": IdTurma,
                    "nomeAluno": Nome,
                    "rm": Rm,
                    "dataNascimento": DtNasc,
                    "cpf": Cpf,
                    "telefoneCel": Telefone,
                    "telefoneFixo": TelFixo,
                    "emailAluno": EmailAluno,
                    "emailResponsavel": EmailResponsavel,
                    "urlimg": IdImg
            } ,{
                headers: {
                    Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbUBnbWFpbC5jb20iLCJqdGkiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiMSIsIlJvbGUiOiIxIiwiZXhwIjoxNjQ1OTk3NDExLCJpc3MiOiJjYXJvbWV0cm8ud2ViYXBpIiwiYXVkIjoiY2Fyb21ldHJvLndlYmFwaSJ9._BiHvApQhzHXSk5ZSiv1t1CxXvR3RcO4ukKKXp79xVg',
                },
            }
            ).then((resposta) => {
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
    return (
        <div>
            <main>
                <form onSubmit={(form) => CadastrarAluno(form)}>
                    <select value={IdTurma} onChange={(select) => setIdTurma(select.target.value)}>
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
                    <input type={"text"} value={Nome} onChange={(input) => setNome(input.target.value)} placeholder="Nome do aluno(a)" required></input>
                    <input type={"text"} value={Rm} onChange={(input) => setRm(input.target.value)} placeholder="RM do aluno(a)" required></input>
                    <input type={"date"} value={DtNasc} onChange={(input) => setDtNasc(input.target.value)} placeholder="Data de nascimento do aluno(a)" required></input>
                    <input type={"text"} value={Cpf} onChange={(input) => setCpf(input.target.value)} placeholder="CPF do aluno(a)" required></input>
                    <input type={"text"} value={Telefone} onChange={(input) => setTelefone(input.target.value)} placeholder="Telefone do aluno(a)" required></input>
                    <input type={"text"} value={TelFixo} onChange={(input) => setTelFixo(input.target.value)} placeholder="Telefone fixo do aluno(a)" required></input>
                    <input type={"email"} value={EmailAluno} onChange={(input) => setEmailAluno(input.target.value)} placeholder="Email do aluno(a)" required></input>
                    <input type={"email"} value={EmailResponsavel} onChange={(input) => setEmailResponsavel(input.target.value)} placeholder="Email do responsável do aluno(a)" required></input>
                    <input id={"inputImgCadastroAluno"} onChange={() => DetectarFace()} type={"file"}></input>
                    <button type={"submit"}></button>
                </form>
            </main>
        </div>
    )
}

export default TesteCadastro;