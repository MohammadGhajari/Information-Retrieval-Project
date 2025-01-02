using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RankUp.Data;
using RankUp.Models;
using System.ComponentModel.DataAnnotations;

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
        public async Task<ActionResult> SearchKeyword([FromBody]SearchKeywordRequest request)
        {
            if (request.Sites == null || request.Keywords == null || request.email == null)
            {
                return BadRequest("Sites or Keywords list cannot be null.");
            }

            var sites = request.Sites;
            var keywords = request.Keywords;


            return Ok();
        }

        [HttpPost("AddSite")]
        public async Task<ActionResult> AddSite(Site site)
        {
            if (site == null)
            {
                return BadRequest();
            }

            _context.Sites.Add(site);
            await _context.SaveChangesAsync();
            return Ok(site);
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
                    .Where(s => s.email == email)
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
        public async Task<ActionResult> AddKeyword(Keyword keyword)
        {
            if (keyword == null)
            {
                return BadRequest();
            }

            _context.Keywords.Add(keyword);
            await _context.SaveChangesAsync();
            return Ok(keyword);
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
                    .Where(s => s.email == email)
                    .ToListAsync();

                // بررسی وجود سایت‌ها
                if (keywords == null || !keywords.Any())
                {
                    return NotFound($"No keywords found for email: {email}");
                }

                return Ok(keywords);
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

    }
}
