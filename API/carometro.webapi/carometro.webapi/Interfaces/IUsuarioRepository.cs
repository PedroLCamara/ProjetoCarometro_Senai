using carometro.webapi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carometro.webapi.Interfaces
{
    public interface IUsuarioRepository
    {
        /// <summary>
        /// Valida o usuario
        /// </summary>
        /// <param name="email">email do usuario</param>
        /// <param name="senha">senha do usuario</param>
        /// <returns>um usuario validado</returns>
        Usuario Login(string email, string senha);
    }
}
