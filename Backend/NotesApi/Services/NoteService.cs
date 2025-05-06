using NotesApi.Models;
using NotesApi.Repositories;

namespace NotesApi.Services
{
    public class NoteService : INoteService
    {
        private readonly INoteRepository _noteRepository;

        public NoteService(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        public async Task<IEnumerable<Note>> GetUserNotes(int userId)
        {
            return await _noteRepository.GetUserNotes(userId);
        }

        public async Task<Note> GetNote(int noteId, int userId)
        {
            return await _noteRepository.GetById(noteId, userId);
        }

        public async Task<Note> SaveNote(NoteSaveDto noteDto, int userId)
        {
            return await _noteRepository.Save(noteDto, userId);
        }

        public async Task<bool> DeleteNote(int noteId, int userId)
        {
            return await _noteRepository.Delete(noteId, userId);
        }

        public async Task<IEnumerable<Note>> SearchNotes(int userId, string searchTerm)
        {
            return await _noteRepository.Search(userId, searchTerm);
        }
    }
}