using carometro.webapi.Domains;
using carometro.webapi.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
    [Produces("application/json")]
    public class AlunoController : ControllerBase
    {
        private readonly IAlunoRepository _alunoRepository;

        public AlunoController(IAlunoRepository repo)
        {
            _alunoRepository = repo;
        }

        [HttpGet]
        [Authorize]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(_alunoRepository.ListarTodos());
            }
            catch (Exception erro)
            {
                BadRequest(erro);
                throw;
            }
        }

        [HttpGet("porturma/{idTurma}")]
        [Authorize]
        public IActionResult ListarPorTurma(int idTurma)
        {
            try
            {
                return Ok(_alunoRepository.ListarTodosTurma(idTurma));
            }
            catch (Exception erro)
            {
                BadRequest(erro);
                throw;
            }
        }

        [HttpGet("por-nome/{queryNome}")]
        [Authorize]
        public IActionResult ListarPorNome(string queryNome)
        {
            try
            {
                return Ok(_alunoRepository.BuscarPorNome(queryNome));
            }
            catch (Exception erro)
            {
                BadRequest(erro);
                throw;
            }
        }

        [HttpPost]
        [Authorize(Roles = "1")]
        public IActionResult Cadastrar(Aluno AlunoCadastro)
        {
            try
            {
                _alunoRepository.Cadastrar(AlunoCadastro);
                return Created("Aluno", AlunoCadastro);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }
        
        [HttpPut("{idAluno}")]
        [Authorize(Roles = "1")]
        public IActionResult Atualizar(Aluno AlunoAtualizado, int idAluno)
        {
            try
            {
                Aluno AlunoRetorno = _alunoRepository.BuscarPorId(idAluno);
                if (AlunoRetorno == null)
                {
                    return NotFound("Aluno não encontrado");
                }
                _alunoRepository.Atualizar(Convert.ToByte(idAluno), AlunoAtualizado);
                return StatusCode(204, new { Aluno = AlunoAtualizado });
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpDelete("{idAlunoDeletado}")]
        [Authorize(Roles ="1")]
        public IActionResult Deletar(int idAlunoDeletado)
        {
            try
            {
                Aluno AlunoRetorno = _alunoRepository.BuscarPorId(idAlunoDeletado);
                if (AlunoRetorno == null)
                {
                    return NotFound("Aluno não encontrado");
                }
                _alunoRepository.Deletar(Convert.ToByte(idAlunoDeletado));
                return NoContent();
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }
    }
}
