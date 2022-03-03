using carometro.webapi.Domains;
using System.Collections.Generic;

namespace carometro.webapi.Interfaces
{
    public interface ITurmaRepository
    {
        List<Turma> ListarTurmas();
    }
}
