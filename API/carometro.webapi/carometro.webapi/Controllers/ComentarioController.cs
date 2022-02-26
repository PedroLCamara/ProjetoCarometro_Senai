using carometro.webapi.Domains;
using carometro.webapi.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carometro.webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComentarioController : ControllerBase
    {
        private readonly IComentarioRepository _comentarioRepository;

        public ComentarioController(IComentarioRepository repo)
        {
            _comentarioRepository = repo;
        }

        [HttpPost]
        public ActionResult<Comentario> PostComentario(Comentario novoComentario, int idAluno)
        {
            _comentarioRepository.Cadastrar(novoComentario, idAluno);

            return Created("Comentario", novoComentario);

        }
    }
}
