import { useState, useEffect} from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';

export default function ListaAlunos() {
    const [listaAlunos, setListaAlunos] = useState([]);
    const [nomeAluno, setNomeAluno] = useState('');
    const [idTurma, setIdTurma] = useState(0);
    const [rm, setRm] = useState(0);
    const [dataNascimento, setDataNascimento] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefoneCel, setTelefoneCel] = useState('');
    const [telefoneFixo, setTelefoneFixo] = useState('');
    const [emailAluno, setEmailAluno] = useState('');
    const [emailResponsavel, setEmailResponsavel] = useState('');
    const [URLimg, setURLimg] = useState('');

    const buscarAlunos = () => {
        axios('http://localhost:5000/api/Alunos', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    setListaAlunos(response.data);
                }
            })
            .catch(erro => console.log(erro))
    };



    const cadastrar = (event) => {

        event.preventDefault();

        var formData = new FormData();
        formData.append('nomeAluno', nomeAluno);
        formData.append('idTurma', idTurma);
        formData.append('rm', rm);
        formData.append('dataNascimento', dataNascimento);
        formData.append('cpf', cpf);
        formData.append('telefoneCel', telefoneCel);
        formData.append('telefoneFixo', telefoneFixo);
        formData.append('emailAluno', emailAluno);
        formData.append('emailResponsavel', emailResponsavel);
        formData.append('URLimg', URLimg);

        axios
            .post('http://localhost:5000/api/Alunos', formData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
                .then(response => {
                    console.log(response)
                    if (response.status === 201){
                        buscarAlunos();
                    }
                })
                .catch(erro => console.log(erro))
    };
    
    useEffect(() => {
        buscarAlunos();      
      },[]);

    render()
    return (
        <div>
            <main>
                <button>Cadastrar</button>
                <h1>Listagem de Alunos</h1>
                <div>
                    <input></input>
                    <input></input>
                </div>
                {
                    listaAlunos.filter(c => c.idTurma == 1).map((aluno) => {
                        return (
                            <table key={aluno.idAluno}>
                                <div>
                                    <img src={aluno.URLimg} />
                                    <div>
                                        <p>{aluno.nomeAluno}</p>
                                        <p>{aluno.dataNascimento}</p>                                    
                                    </div>
                                    <div>
                                        <p>{aluno.idturma}</p>
                                        <p>{aluno.emailAluno}</p>
                                        <p>{aluno.rm}</p>
                                    </div>
                                </div>
                            </table>
                        )
                    })
                }
            </main>
        </div>
    )


}
