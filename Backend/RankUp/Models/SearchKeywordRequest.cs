using System.ComponentModel.DataAnnotations;

namespace RankUp.Models
{
    public class SearchKeywordRequest
    {
        public string email { get; set; }
        public List<SiteDto> Sites { get; set; } = new List<SiteDto>();
        public List<KeywordDto> Keywords { get; set; } = new List<KeywordDto> { };
    }

    public class SiteDto
    {
        public string Domain { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
    }

    public class KeywordDto
    {
        public string Name { get; set; } = string.Empty;
    }
}
