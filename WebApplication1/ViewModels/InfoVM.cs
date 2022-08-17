using Microsoft.AspNetCore.Http;

namespace WebApplication1.ViewModels
{
    public class InfoVM
    {
        public string NameFamily { get; set; }
        public string Mobile { get; set; }
        public string Message { get; set; }
        public string src { get; set; }
        public IFormFile img { get; set; }
        
    }
}
