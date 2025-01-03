using BCrypt.Net; // برای هش کردن رمز عبور
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RankUp.Data;
using RankUp.Models;
using System.ComponentModel.DataAnnotations;

namespace RankUp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet("ShowAllUsers")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            Console.WriteLine("kir khar");
            var users = await _context.Users
                .Select(u => new { u.Email, u.Name }) // جلوگیری از نمایش رمز عبور
                .ToListAsync();

            return Ok(users);
        }


        // GET: api/Users/{email}
        [HttpPost("FindUserByEmail")]
        public async Task<ActionResult> GetUser(string email)
        {
            var user = await _context.Users
                .Where(u => u.Email == email)
                .Select(u => new { u.Email, u.Name }) // جلوگیری از نمایش رمز عبور
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }


        // POST: api/Users/Register
        [HttpPost("Register")]
        public async Task<ActionResult> CreateUser(User user)
        {
            // اعتبارسنجی فرمت ایمیل
            Console.WriteLine("hello 1");
            if (!new EmailAddressAttribute().IsValid(user.Email))
            {
                return BadRequest("The email format is invalid.");
            }
            Console.WriteLine("hello 1");

            // بررسی اینکه ایمیل در دیتابیس تکراری نباشد
            if (_context.Users.Any(u => u.Email == user.Email))
            {
                return Conflict("A user with this email already exists.");
            }

            Console.WriteLine("hello 2");

            // هش کردن رمز عبور
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            Console.WriteLine("hello 3");


            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            Console.WriteLine("hello 4");



            return CreatedAtAction(nameof(GetUser), new { email = user.Email }, new { user.Email, user.Name });
        }

        // POST: api/Users/Login
        [HttpPost("Login")]
        public async Task<ActionResult> Login(Models.LoginRequest request)
        {
            // بررسی صحت ایمیل و رمز عبور
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Email and password are required.");
            }

            // جستجوی کاربر در دیتابیس
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            // بررسی صحت رمز عبور
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.Password);
            if (!isPasswordValid)
            {
                return Unauthorized("Invalid email or password.");
            }

            // در اینجا می‌توانید توکن JWT تولید کنید (اختیاری)

            return Ok(new { message = "Login successful.", email = user.Email, name = user.Name });
        }

        // PUT: api/Users/{email}
        [HttpPut("UpdateUserByEmail/{email}")]
        public async Task<IActionResult> UpdateUser(string email, User user)
        {
            // اعتبارسنجی فرمت ایمیل
            if (!new EmailAddressAttribute().IsValid(email))
            {
                return BadRequest("The email format is invalid.");
            }

            if (!new EmailAddressAttribute().IsValid(user.Email))
            {
                return BadRequest("The new email format is invalid.");
            }

            if (email != user.Email)
            {
                return BadRequest("Email in URL and body do not match.");
            }

            var existingUser = await _context.Users.FindAsync(email);
            if (existingUser == null)
            {
                return NotFound();
            }

            // به‌روزرسانی نام و هش کردن رمز عبور (در صورت وجود)
            existingUser.Name = user.Name;
            if (!string.IsNullOrEmpty(user.Password))
            {
                existingUser.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            }

            _context.Entry(existingUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Users.Any(u => u.Email == email))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }


        // DELETE: api/Users/{email}
        [HttpDelete("DeleteUserByEmail/{email}")]
        public async Task<IActionResult> DeleteUser(string email)
        {
            // اعتبارسنجی فرمت ایمیل
            if (!new EmailAddressAttribute().IsValid(email))
            {
                return BadRequest("The email format is invalid.");
            }

            var user = await _context.Users.FindAsync(email);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
