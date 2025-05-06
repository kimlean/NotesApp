using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotesApi.Models;
using NotesApi.Services;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NotesApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class NotesController : ControllerBase
    {
        private readonly INoteService _noteService;
        private readonly ILogger<NotesController> _logger;

        public NotesController(INoteService noteService, ILogger<NotesController> logger)
        {
            _noteService = noteService;
            _logger = logger;
        }

        private int GetUserId()
        {
            return Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
        {
            try
            {
                var userId = GetUserId();
                var notes = await _noteService.GetUserNotes(userId);
                return Ok(notes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving notes for user");
                return StatusCode(500, "An error occurred while retrieving notes");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> GetNote(int id)
        {
            try
            {
                var userId = GetUserId();
                var note = await _noteService.GetNote(id, userId);
                
                if (note == null)
                {
                    return NotFound($"Note with ID {id} not found");
                }
                
                return Ok(note);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving note {NoteId} for user", id);
                return StatusCode(500, $"An error occurred while retrieving note with ID {id}");
            }
        }

        [HttpPost("save")]
        public async Task<ActionResult<Note>> SaveNote([FromBody] NoteSaveDto noteDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                
                var userId = GetUserId();
                var note = await _noteService.SaveNote(noteDto, userId);
                return Ok(note);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving note for user");
                return StatusCode(500, "An error occurred while saving the note");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            try
            {
                var userId = GetUserId();
                var success = await _noteService.DeleteNote(id, userId);
                
                if (!success)
                {
                    return NotFound($"Note with ID {id} not found or you don't have permission to delete it");
                }
                
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting note {NoteId} for user", id);
                return StatusCode(500, $"An error occurred while deleting note with ID {id}");
            }
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Note>>> SearchNotes([FromQuery] string searchTerm)
        {
            try
            {
                var userId = GetUserId();
                var notes = await _noteService.SearchNotes(userId, searchTerm);
                return Ok(notes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error searching notes with term '{SearchTerm}' for user", searchTerm);
                return StatusCode(500, "An error occurred while searching notes");
            }
        }
    }
}