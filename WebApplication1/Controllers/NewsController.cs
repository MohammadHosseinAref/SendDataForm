using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace WebApplication1.Controllers
{
    public class NewsController : Controller
    {
        private readonly Data.ApplicationDbContext _dbContext;
        public NewsController(Data.ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IActionResult Index()
        {
            return View(_dbContext.newsFile.ToList());
        }
    }
}
