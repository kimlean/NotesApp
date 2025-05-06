using NotesApi.Models;

namespace NotesApi.Repositories
{
    public interface IUserRepository
    {
        Task<User> Register(string username, string email, string passwordHash);
        Task<User> GetByEmail(string email);
        Task<User> GetById(int id);
    }
}