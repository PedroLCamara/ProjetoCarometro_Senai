using System;
using System.Collections.Generic;

#nullable disable

namespace carometro.webapi.Domains
{
    public partial class Comentario
    {
        public int IdComentario { get; set; }
        public int? IdAluno { get; set; }
        public int? IdUsuario { get; set; }
        public string Descricao { get; set; }

        public virtual Aluno IdAlunoNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
