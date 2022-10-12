using System.Collections.Generic;
using WebApplication1.Data.NewsFiles;

namespace WebApplication1.Data.FileTypes
{
    public class FileType
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<NewsFile> NewsFiles{ get; set; }
    }
}
