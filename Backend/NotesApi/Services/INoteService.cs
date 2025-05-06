using NotesApi.Models;

namespace NotesApi.Services
{
    public interface INoteService
    {
        Task<IEnumerable<Note>> GetUserNotes(int userId);
        Task<Note> GetNote(int noteId, int userId);
        Task<Note> SaveNote(NoteSaveDto noteDto, int userId);
        Task<bool> DeleteNote(int noteId, int userId);
        Task<IEnumerable<Note>> SearchNotes(int userId, string searchTerm);
    }
}