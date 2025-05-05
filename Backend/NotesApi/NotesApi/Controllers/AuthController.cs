using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotesApi.Models;
using NotesApi.Services;
using System.Security.Claims;

namespace NotesApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class NotesController : ControllerBase
    {
        private readonly INoteService _noteService;

        public NotesController(INoteService noteService)
        {
            _noteService = noteService;
        }

        private int GetUserId()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
        {
            var notes = await _noteService.GetUserNotes(GetUserId());
            return Ok(notes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> GetNote(int id)
        {
            var note = await _noteService.GetNote(id, GetUserId());
            if (note == null)
            {
                return NotFound();
            }
            return Ok(note);
        }

        [HttpPost("save")]
        public async Task<ActionResult<Note>> SaveNote([FromBody] NoteSaveDto noteDto)
        {
            var note = await _noteService.SaveNote(noteDto, GetUserId());
            return Ok(note);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var success = await _noteService.DeleteNote(id, GetUserId());
            if (!success)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Note>>> SearchNotes([FromQuery] string searchTerm)
        {
            var notes = await _noteService.SearchNotes(GetUserId(), searchTerm);
            return Ok(notes);
        }
    }
}