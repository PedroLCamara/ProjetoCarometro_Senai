using carometro.webapi.Contexts;
using carometro.webapi.Domains;
using carometro.webapi.Interfaces;
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
            Aluno aluno = ctx.Alunos.FirstOrDefault(a => a.IdAluno == id);
            aluno = alunoAtualizado;
            ctx.Alunos.Update(aluno);
            ctx.SaveChanges();

        }

        public Aluno BuscarPorNome(string nome)
        {
            Aluno aluno = ctx.Alunos.FirstOrDefault(a => a.NomeAluno == nome);
            return aluno;
        }

        public void Cadastrar(Aluno novoAluno)
        {
            ctx.Alunos.Add(novoAluno);
            ctx.SaveChangesAsync();
        }

        public void Deletar(byte id)
        {
            Aluno aluno = ctx.Alunos.FirstOrDefault(a => a.IdAluno == id);
            ctx.Alunos.Remove(aluno);
            ctx.SaveChanges();
            
        }

        public List<Aluno> ListarTodos()
        {
            return ctx.Alunos.ToList();
        }

        public List<Aluno> ListarTodosTurma(int idTurma)
        {
            return ctx.Alunos.Where(a => a.IdTurma == idTurma).ToList();
        }

        public Aluno BuscarPorImagem(string foto)
        {
            throw new NotImplementedException();
        }
    }
}
