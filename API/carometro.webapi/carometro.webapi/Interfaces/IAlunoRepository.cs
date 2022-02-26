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
        /// Busca um aluno pelo nome dele
        /// </summary>
        /// <param name="nome">nome do aluno a ser buscado</param>
        /// <returns>Um aluno</returns>
        Aluno BuscarPorNome(string nome);

        /// <summary>
        /// Busca um aluno pela foto dele
        /// </summary>
        /// <param name="foto">Foto do aluno</param>
        /// <returns>Um aluno</returns>
        Aluno BuscarPorImagem(string foto);



    }
}
