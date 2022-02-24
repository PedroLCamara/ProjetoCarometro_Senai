using System;
using System.Collections.Generic;

#nullable disable

namespace carometro.webapi.Domains
{
    public partial class Aluno
    {
        public Aluno()
        {
            Comentarios = new HashSet<Comentario>();
        }

        public int IdAluno { get; set; }
        public byte? IdTurma { get; set; }
        public string NomeAluno { get; set; }
        public string Rm { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Cpf { get; set; }
        public string TelefoneCel { get; set; }
        public string TelefoneFixo { get; set; }
        public string EmailAluno { get; set; }
        public string EmailResponsavel { get; set; }
        public string Urlimg { get; set; }

        public virtual Turma IdTurmaNavigation { get; set; }
        public virtual ICollection<Comentario> Comentarios { get; set; }
    }
}
