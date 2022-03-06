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
    public class AlunoRepository : IAlunoRepository
    {
        private readonly carometroContext ctx;

        public AlunoRepository(carometroContext appContext)
        {
            ctx = appContext;
        }

        public void Atualizar(byte id, Aluno alunoAtualizado)
        {
            Aluno aluno = ctx.Alunos.AsNoTracking().FirstOrDefault(a => a.IdAluno == id);
            aluno = alunoAtualizado;
            aluno.IdAluno = id;
            ctx.Alunos.Update(aluno);
            ctx.SaveChanges();
        }

        public List<Aluno> BuscarPorNome(string nome)
        {
            List<Aluno> retorno = ctx.Alunos.ToList().FindAll(a => a.NomeAluno.Contains(nome));
            return retorno;
        }

        public void Cadastrar(Aluno novoAluno)
        {
            ctx.Alunos.Add(novoAluno);
            ctx.SaveChanges();
        }

        public void Deletar(byte id)
        {
            Aluno aluno = ctx.Alunos.FirstOrDefault(a => a.IdAluno == id);
            List<Comentario> comentarios = ctx.Comentarios.ToList().FindAll(c => c.IdAluno == aluno.IdAluno);
            foreach (var item in comentarios)
            {
                ctx.Comentarios.Remove(item);
            }
            ctx.Alunos.Remove(aluno);
            ctx.SaveChanges();
        }

        public List<Aluno> ListarTodos()
        {
            return ctx.Alunos.ToList();
        }

        public List<Aluno> ListarTodosTurma(int idTurma)
        {
            if (ctx.Turmas.ToList().Find(t => Convert.ToInt32(t.IdTurma) == idTurma) != null)
            {
                return ctx.Alunos.Where(a => a.IdTurma == idTurma).ToList();
            }
            else return null;
        }

        public Aluno BuscarPorImagem(string urlImg)
        {
            return ctx.Alunos.ToList().Find(a => a.Urlimg.Split(".")[0] == urlImg);
        }

        public Aluno BuscarPorId(int id)
        {
            return ctx.Alunos.Include(Aluno => Aluno.IdTurmaNavigation).AsNoTracking().FirstOrDefault(a => a.IdAluno == id);
        }
    }
}
