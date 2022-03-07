using carometro.webapi.Contexts;
using carometro.webapi.Domains;
using carometro.webapi.Interfaces;
using Microsoft.EntityFrameworkCore;
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
            return ctx.Comentarios.Select(C => new Comentario(){
                IdComentario = C.IdComentario,
                IdAluno = C.IdAluno,
                IdUsuario = C.IdUsuario,
                Descricao = C.Descricao,
                IdUsuarioNavigation = new Usuario()
                {
                    NomeUsuario = C.IdUsuarioNavigation.NomeUsuario
                }
            }).ToList();
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
