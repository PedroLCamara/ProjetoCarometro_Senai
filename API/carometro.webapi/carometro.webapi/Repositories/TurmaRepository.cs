using carometro.webapi.Contexts;
using carometro.webapi.Domains;
using carometro.webapi.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace carometro.webapi.Repositories
{
    public class TurmaRepository : ITurmaRepository
    {
        private readonly carometroContext ctx;

        public TurmaRepository(carometroContext appContext)
        {
            ctx = appContext;
        }
        public List<Turma> ListarTurmas()
        {
            return ctx.Turmas.ToList();
        }
    }
}
