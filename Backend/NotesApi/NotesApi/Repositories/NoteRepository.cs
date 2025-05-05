using Dapper;
using Microsoft.Data.SqlClient;
using NotesApi.Models;

namespace NotesApi.Repositories
{
    public class NoteRepository : INoteRepository
    {
        private readonly IConfiguration _configuration;

        public NoteRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<Note>> GetUserNotes(int userId)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            var parameters = new DynamicParameters();
            parameters.Add("@UserId", userId);

            return await connection.QueryAsync<Note>("sp_GetUserNotes", parameters,
                commandType: System.Data.CommandType.StoredProcedure);
        }

        public async Task<Note> GetById(int noteId, int userId)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            var parameters = new DynamicParameters();
            parameters.Add("@NoteId", noteId);
            parameters.Add("@UserId", userId);

            return await connection.QueryFirstOrDefaultAsync<Note>("sp_GetNoteById", parameters,
                commandType: System.Data.CommandType.StoredProcedure);
        }

        public async Task<Note> Save(NoteSaveDto noteDto, int userId)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            var parameters = new DynamicParameters();
            parameters.Add("@NoteId", noteDto.Id);
            parameters.Add("@Title", noteDto.Title);
            parameters.Add("@Content", noteDto.Content);
            parameters.Add("@UserId", userId);

            var result = await connection.QuerySingleAsync("sp_CreateOrUpdateNote", parameters,
                commandType: System.Data.CommandType.StoredProcedure);

            return await GetById(result.NoteId, userId);
        }

        public async Task<bool> Delete(int noteId, int userId)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            var parameters = new DynamicParameters();
            parameters.Add("@NoteId", noteId);
            parameters.Add("@UserId", userId);

            var result = await connection.QuerySingleAsync("sp_DeleteNote", parameters,
                commandType: System.Data.CommandType.StoredProcedure);

            return result.RowsAffected > 0;
        }

        public async Task<IEnumerable<Note>> Search(int userId, string searchTerm)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            var parameters = new DynamicParameters();
            parameters.Add("@UserId", userId);
            parameters.Add("@SearchTerm", searchTerm);

            return await connection.QueryAsync<Note>("sp_SearchNotes", parameters,
                commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}