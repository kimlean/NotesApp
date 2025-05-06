using BCrypt.Net;
using NotesApi.Helpers;
using NotesApi.Models;
using NotesApi.Repositories;

namespace NotesApi.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<User> Register(RegisterDto registerDto)
        {
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);
            return await _userRepository.Register(registerDto.Username, registerDto.Email, passwordHash);
        }

        public async Task<string> Login(LoginDto loginDto)
        {
            var user = await _userRepository.GetByEmail(loginDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            {
                return null;
            }

            return JwtHelper.GenerateToken(user, _configuration);
        }

        public async Task<bool> UserExists(string email)
        {
            var user = await _userRepository.GetByEmail(email);
            return user != null;
        }
    }
}