using carometro.webapi.Domains;
using carometro.webapi.Interfaces;
using carometro.webapi.Utils;
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

        [HttpGet("porid/{idAluno}")]
        [Authorize]
        public IActionResult BuscarPorId(int idAluno)
        {
            try
            {
                Aluno AlunoBuscado = _alunoRepository.BuscarPorId(idAluno);
                if (AlunoBuscado != null)
                {
                    return Ok(AlunoBuscado);
                }
                else return NotFound(new {message = "Aluno não encontrado!"});
            }
            catch (Exception erro)
            {
                BadRequest(erro);
                throw;
            }
        }

        [HttpGet("porimagem/{idImg}")]
        [Authorize]
        public IActionResult BuscarPorFoto(string idImg)
        {
            try
            {
                Aluno alunoConsulta = _alunoRepository.BuscarPorImagem(idImg);
                if (alunoConsulta != null)
                {
                    return Ok(alunoConsulta);
                }
                else return NotFound("Imagem existente na lista de imagens, mas não no Banco de Dados");
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("por-turma/{idTurma}")]
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
        public IActionResult Cadastrar([FromForm] Aluno AlunoCadastro, IFormFile arquivo)
        {
            try
            {
                string[] extensoesPermitidas = { "jpg", "png", "jpeg", "gif" };
                string uploadResultado = Upload.UploadFile(arquivo, extensoesPermitidas, AlunoCadastro.Urlimg);

                if (uploadResultado == "")
                {
                    return BadRequest("Arquivo não encontrado");
                }

                if (uploadResultado == "Extensão não permitida")
                {
                    return BadRequest("Extensão de arquivo não permitida");
                }
                AlunoCadastro.Urlimg = uploadResultado;
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
        public IActionResult Atualizar([FromForm] Aluno AlunoAtualizado, IFormFile arquivo, int idAluno)
        {
            try
            {
                Aluno AlunoRetorno = _alunoRepository.BuscarPorId(idAluno);
                if (AlunoRetorno == null)
                {
                    return NotFound("Aluno não encontrado");
                }
                string[] extensoesPermitidas = { "jpg", "png", "jpeg", "gif" };
                string uploadResultado = Upload.UploadFile(arquivo, extensoesPermitidas, AlunoAtualizado.Urlimg);

                if (uploadResultado == "")
                {
                    return BadRequest("Arquivo não encontrado");
                }

                if (uploadResultado == "Extensão não permitida")
                {
                    return BadRequest("Extensão de arquivo não permitida");
                }
                Upload.RemoverArquivo(AlunoRetorno.Urlimg);
                AlunoAtualizado.Urlimg = uploadResultado;
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
                Upload.RemoverArquivo(AlunoRetorno.Urlimg);
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
