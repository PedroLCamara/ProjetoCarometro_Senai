using carometro.webapi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carometro.webapi.Interfaces
{
    public interface IAlunoRepository
    {
        /// <summary>
        /// Cadastra um novo aluno
        /// </summary>
        /// <param name="novoAluno">Novo aluno a ser cadastrado</param>
        void Cadastrar(Aluno novoAluno);
        
        /// <summary>
        /// Lista todos os alunos
        /// </summary>
        /// <returns>Uma lista de alunos</returns>
        List<Aluno> ListarTodos();

        /// <summary>
        /// Deleta um usuário
        /// </summary>
        /// <param name="id">Id do usuario a ser deletado</param>
        void Deletar(byte id);

        /// <summary>
        /// Atualiza as informacoes de um aluno existente
        /// </summary>
        /// <param name="id">Id do aluno a ser atualizado</param>
        /// <param name="alunoAtualizado">Aluno com as informações atualizadas</param>
        void Atualizar(byte id, Aluno alunoAtualizado);

        /// <summary>
        /// Lista todos os alunos de uma turma
        /// </summary>
        /// <param name="idTurma">Id da turma a ser listada</param>
        /// <returns>Uma lista de alunos</returns>
        List<Aluno> ListarTodosTurma(int idTurma);

        /// <summary>
        /// Busca um ou mais alunos pela proximidade da busca com seu nome
        /// </summary>
        /// <param name="queryNome">Nome buscado</param>
        /// <returns>Lista de alunos com nomes próximos ou iguais</returns>
        List<Aluno> BuscarPorNome(string queryNome);

        /// <summary>
        /// Busca um aluno pela foto dele
        /// </summary>
        /// <param name="foto">Id da foto do aluno na API de reconhecimento facial do Azure. Para mais informações, acesse: https://brazilsouth.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236 </param>
        /// <returns>Um aluno</returns>
        Aluno BuscarPorImagem(string foto);

        /// <summary>
        /// Busca um aluno pelo seu id
        /// </summary>
        /// <param name="id">Id do aluno</param>
        /// <returns>Um aluno</returns>
        Aluno BuscarPorId(int id);
    }
}
