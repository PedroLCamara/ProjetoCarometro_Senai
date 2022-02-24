using System;
using System.Collections.Generic;

#nullable disable

namespace carometro.webapi.Domains
{
    public partial class Turma
    {
        public Turma()
        {
            Alunos = new HashSet<Aluno>();
        }

        public byte IdTurma { get; set; }
        public string DescricaoTurma { get; set; }

        public virtual ICollection<Aluno> Alunos { get; set; }
    }
}
