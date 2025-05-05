using Dapper;
using Microsoft.Data.SqlClient;
using NotesApi.Models;

namespace NotesApi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _configuration;

        public UserRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<User> Register(string username, string email, string passwordHash)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            
            var parameters = new DynamicParameters();
            parameters.Add("@Username", username);
            parameters.Add("@Email", email);
            parameters.Add("@PasswordHash", passwordHash);
            
            var userId = await connection.QuerySingleAsync<int>("sp_RegisterUser", parameters, 
                commandType: System.Data.CommandType.StoredProcedure);
            
            return await GetById(userId);
        }

        public async Task<User> GetByEmail(string email)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            
            var parameters = new DynamicParameters();
            parameters.Add("@Email", email);
            
            return await connection.QueryFirstOrDefaultAsync<User>("sp_LoginUser", parameters, 
                commandType: System.Data.CommandType.StoredProcedure);
        }

        public async Task<User> GetById(int id)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            
            var parameters = new DynamicParameters();
            parameters.Add("@UserId", id);
            
            return await connection.QueryFirstOrDefaultAsync<User>("sp_GetUserById", parameters, 
                commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}