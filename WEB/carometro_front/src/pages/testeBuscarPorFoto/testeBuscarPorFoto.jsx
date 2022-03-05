import { useState, useEffect } from "react";
import { GetAsFileBusca, IsFileSetBusca, WebcamCaptureBusca } from "../../components/WebcamBusca/WebcamBusca";
import axios from 'axios';

export const TesteBuscarPorFoto = () => {
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
        ListaPossiveisFaces.forEach(async (item) => {
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

                if (FaceSimilar != undefined) {
                    axios.get("http://localhost:5000/api/Aluno/porimagem/" + FaceSimilar.persistedFaceId, {
                        headers: {
                            Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbUBnbWFpbC5jb20iLCJqdGkiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiMSIsIlJvbGUiOiIxIiwiZXhwIjoxNjQ2MDEwODEwLCJpc3MiOiJjYXJvbWV0cm8ud2ViYXBpIiwiYXVkIjoiY2Fyb21ldHJvLndlYmFwaSJ9.XnCObLv2JXMXBIKxEDu41hPY2EHE5P1BXXVVvkz_oBs',
                        }
                    }).then((resposta) => {
                        console.log(resposta.data)
                    }).catch((erro) => {
                        console.log(erro)
                    })
                }
                else alert("Face não reconhecida!");
            }
        }
    }
    return (
        <>
            <main>
                <form onSubmit={(form) => AcharAluno(form)}>
                    
                    <button type="submit"></button>
                </form>
            </main>
        </>
    )
}

export default TesteBuscarPorFoto;