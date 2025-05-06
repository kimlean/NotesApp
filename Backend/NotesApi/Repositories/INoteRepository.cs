using NotesApi.Models;

namespace NotesApi.Repositories
{
    public interface INoteRepository
    {
        Task<IEnumerable<Note>> GetUserNotes(int userId);
        Task<Note> GetById(int noteId, int userId);
        Task<Note> Save(NoteSaveDto noteDto, int userId);
        Task<bool> Delete(int noteId, int userId);
        Task<IEnumerable<Note>> Search(int userId, string searchTerm);
    }
}