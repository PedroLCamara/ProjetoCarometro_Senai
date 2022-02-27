using carometro.webapi.Contexts;
using carometro.webapi.Domains;
using carometro.webapi.Interfaces;
using carometro.webapi.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carometro.webapi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly carometroContext ctx;

        public UsuarioRepository(carometroContext appContext)
        {
            ctx = appContext;
        }

        public Usuario Login(string email, string senha)
        {
            var usuario = ctx.Usuarios.FirstOrDefault(u => u.Email == email);

            if (usuario != null)
            {
                if (usuario.Senha.StartsWith("$") && usuario.Senha.Length >= 32)
                {
                    bool confere = Criptografia.Comparar(senha, usuario.Senha);

                    if (confere)
                        return usuario;
                }
                else
                {
                    if (usuario.Email == email && usuario.Senha == senha)
                    {
                        usuario.Senha = Criptografia.GerarHash(usuario.Senha);
                        ctx.SaveChanges();
                        return usuario;
                    }
                }

            }

            return null;
        }
    }
}
