using carometro.webapi.Contexts;
using carometro.webapi.Domains;
using carometro.webapi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carometro.webapi.Repositories
{
    public class ComentarioRepository : IComentarioRepository
    {
        carometroContext ctx = new carometroContext();
        public void Cadastrar(Comentario novoComentario, int idAluno)
        {
            novoComentario.IdAluno = idAluno;
            ctx.Comentarios.Add(novoComentario);
            ctx.SaveChanges();
        }
    }
}
