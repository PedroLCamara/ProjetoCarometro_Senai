using carometro.webapi.Domains;
using carometro.webapi.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace carometro.webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ComentarioController : ControllerBase
    {
        private readonly IComentarioRepository _comentarioRepository;

        public ComentarioController(IComentarioRepository repo)
        {
            _comentarioRepository = repo;
        }

        [HttpPost("{idAluno}")]
        [Authorize(Roles = "1,2")]
        public IActionResult PostComentario(Comentario novoComentario, int idAluno)
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                _comentarioRepository.Cadastrar(novoComentario, idAluno, idUsuario);

                return Created("Comentario", novoComentario);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }

        }

        [HttpGet("{idAluno}")]
        [Authorize(Roles ="1,2")]
        public IActionResult GetByAluno(int idAluno)
        {
            try
            {
                return Ok(_comentarioRepository.BuscarPorIdAluno(idAluno));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }
    }
}
