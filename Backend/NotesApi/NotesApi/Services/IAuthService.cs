using NotesApi.Models;

namespace NotesApi.Services
{
    public interface IAuthService
    {
        Task<User> Register(RegisterDto registerDto);
        Task<string> Login(LoginDto loginDto);
        Task<bool> UserExists(string email);
    }
}