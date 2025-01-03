using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RankUp.Data;
using RankUp.Models;
using System.ComponentModel.DataAnnotations;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace RankUp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SitesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SitesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("SearchKeyword")]
        public ActionResult SearchKeyword([FromBody] SearchKeywordRequest request)
        {
            // اعتبارسنجی درخواست
            if (request == null || request.Keyword == null || request.SiteDomain == null || request.SiteName == null || string.IsNullOrEmpty(request.Email))
            {
                return BadRequest("Invalid request. Ensure 'Sites', 'Keywords', and 'email' are provided.");
            }

            try
            {
                // سریالایز کردن داده‌ها برای ارسال به پایتون
                var payload = new
                {
                    Email = request.Email,
                    SiteDomain = request.SiteDomain,
                    Keyword = request.Keyword
                };

                // اطمینان از اینکه JSON به درستی فرمت شده است
                string jsonPayload = System.Text.Json.JsonSerializer.Serialize(payload);
                jsonPayload = jsonPayload.Replace("\"", "\\\"");  // Escape any quotes to avoid issues

                // مسیر اسکریپت پایتون
                var scriptPath = Path.Combine(Directory.GetCurrentDirectory(), "Services", "Script.py");

                // اجرای اسکریپت پایتون با آرگومان JSON
                var output = PythonExecutor.RunPythonScript(scriptPath, jsonPayload);

                // نمایش لاگ خروجی پایتون
                Console.WriteLine("Python script output:");
                Console.WriteLine(output);

                ///--------------------------------------------------------------------------
                RankResults rank = new RankResults()
                {
                    Email = request.Email,
                    Query = request.Keyword,
                    SiteName = request.SiteName,
                    SiteDomin = request.SiteDomain,
                    Rank = 1,
                    SuggestedQuery = "",
                    CreatedAt = DateTime.Now,
                };

                _context.RankResults.Add(rank);
                _context.SaveChanges();
                ///--------------------------------------------------------------------------

                // بازگشت نتیجه
                return Ok(rank);
            }
            catch (Exception ex)
            {
                // مدیریت خطاها
                Console.WriteLine($"Error processing request: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, $"An error occurred while processing the request: {ex.Message}");
            }
        }

        [HttpPost("AddSite")]
        public async Task<ActionResult> AddSite([FromBody] SiteDto siteDto)
        {
            // اعتبارسنجی داده‌های ورودی
            if (siteDto == null || string.IsNullOrWhiteSpace(siteDto.Domain) || string.IsNullOrWhiteSpace(siteDto.Name) || string.IsNullOrWhiteSpace(siteDto.Email))
            {
                return BadRequest("Domain, Name, and Email are required.");
            }

            try
            {
                // بررسی تکراری نبودن سایت برای یک ایمیل خاص
                bool exists = await _context.Sites
                    .AnyAsync(s => s.Domain == siteDto.Domain && s.Email == siteDto.Email);
                if (exists)
                {
                    return Conflict("This site already exists for the specified email.");
                }

                // افزودن به دیتابیس
                Site site = new Site()
                {
                    Name = siteDto.Name,
                    Domain = siteDto.Domain,
                    Email = siteDto.Email,
                };
                _context.Sites.Add(site);
                await _context.SaveChangesAsync();

                // بازگرداندن نتیجه موفقیت با شناسه تولیدشده
                return CreatedAtAction(nameof(AddSite), new { id = site.Id }, site);
            }
            catch (Exception ex)
            {
                // مدیریت خطاها
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "An error occurred while saving the site.");
            }
        }

        [HttpGet("GetSitesByEmail")]
        public async Task<ActionResult> GetSitesByEmail(string email)
        {
            // بررسی صحت ورودی
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email cannot be null or empty.");
            }

            try
            {
                // واکشی سایت‌ها بر اساس ایمیل
                var sites = await _context.Sites
                    .Where(s => s.Email == email)
                    .ToListAsync();

                // بررسی وجود سایت‌ها
                if (sites == null || !sites.Any())
                {
                    return NotFound($"No sites found for email: {email}");
                }

                return Ok(sites);
            }
            catch (Exception ex)
            {
                // مدیریت خطاهای احتمالی
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    message = "An error occurred while retrieving the sites.",
                    error = ex.Message
                });
            }
        }

        [HttpPost("AddKeyword")]
        public async Task<ActionResult> AddKeyword([FromBody] KeywordDto keywordDto)
        {
            // اعتبارسنجی داده‌های ورودی
            if (keywordDto == null || string.IsNullOrWhiteSpace(keywordDto.Name) || string.IsNullOrWhiteSpace(keywordDto.Email))
            {
                return BadRequest("Name, and Email are required.");
            }

            try
            {
                // بررسی تکراری نبودن سایت برای یک ایمیل خاص
                bool exists = await _context.Keywords
                    .AnyAsync(k => k.Name == keywordDto.Name && k.Email == keywordDto.Email);
                if (exists)
                {
                    return Conflict("This keyword already exists for the specified email.");
                }

                // افزودن به دیتابیس
                Keyword keyword = new Keyword()
                {
                    Name = keywordDto.Name,
                    Email = keywordDto.Email,
                };

                _context.Keywords.Add(keyword);
                await _context.SaveChangesAsync();

                // بازگرداندن نتیجه موفقیت با شناسه تولیدشده
                return CreatedAtAction(nameof(AddKeyword), new { id = keyword.Id }, keyword);
            }
            catch (Exception ex)
            {
                // مدیریت خطاها
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "An error occurred while saving the site.");
            }
        }

        [HttpGet("GetKeywordByEmail")]
        public async Task<ActionResult> GetKeywordByEmail(string email)
        {
            // بررسی صحت ورودی
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email cannot be null or empty.");
            }

            try
            {
                // واکشی سایت‌ها بر اساس ایمیل
                var keywords = await _context.Keywords
                    .Where(s => s.Email == email)
                    .ToListAsync();

                // بررسی وجود سایت‌ها
                if (keywords == null || !keywords.Any())
                {
                    return NotFound($"No keyword found for email: {email}");
                }

                return Ok(keywords);
            }
            catch (Exception ex)
            {
                // مدیریت خطاهای احتمالی
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    message = "An error occurred while retrieving the keyword.",
                    error = ex.Message
                });
            }
        }

        [HttpGet("search-by-email")]
        public async Task<IActionResult> LineChart([FromQuery] string email)
        {
            // بررسی اینکه ایمیل وارد شده خالی نباشد
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Email is required.");
            }

            // جستجو در دیتابیس برای ایمیل مورد نظر
            var results = await _context.RankResults
                .Where(r => r.Email == email)
                .ToListAsync();

            // اگر هیچ رکوردی یافت نشد
            if (!results.Any())
            {
                return NotFound("No records found with the provided email.");
            }

            // گروه‌بندی نتایج براساس تاریخ و ساعت (بدون دقیقه و ثانیه) و انتخاب فقط فیلدهای مورد نظر
            var groupedResults = results
                .GroupBy(r => new { r.CreatedAt.Date, Hour = r.CreatedAt.Hour })
                .Select(group => new
                {
                    Date = group.Key.Date,
                    Hour = group.Key.Hour,
                    SiteDominAndQuery = group.Select(r => new
                    {
                        r.SiteDomin,
                        r.Query,
                        r.Rank
                    }).ToList()
                })
                .ToList();

            // بازگشت گروه‌بندی‌شده با فیلتر شده بر اساس ساعت و انتخاب فیلدهای مورد نظر
            return Ok(groupedResults);
        }

    }
}
