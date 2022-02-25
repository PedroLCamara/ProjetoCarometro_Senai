using carometro.webapi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carometro.webapi.Interfaces
{
    public interface IComentarioRepository
    {
        /// <summary>
        /// Cadastra um novo comentário
        /// </summary>
        /// <param name="novoComentario">Comentario a ser cadastrado</param>
        /// <param name="idAluno">Id do aluno ao qual o comentario pertence</param>
        void Cadastrar(Comentario novoComentario, int idAluno);
    }
}
