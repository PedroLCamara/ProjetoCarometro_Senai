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

        public List<Comentario> BuscarPorIdAluno(int idAluno)
        {
            return ctx.Comentarios.ToList().FindAll(c => c.IdAluno == idAluno);
        }

        public void Cadastrar(Comentario novoComentario, int idAluno, int IdUsuario)
        {
            novoComentario.IdAluno = idAluno;
            novoComentario.IdUsuario = IdUsuario;
            ctx.Comentarios.Add(novoComentario);
            ctx.SaveChanges();
        }
    }
}
