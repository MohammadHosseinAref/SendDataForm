using System;
using WebApplication1.Data.FileTypes;

namespace WebApplication1.Data.NewsFiles
{
    public class NewsFile
    {
        public long Id { get; set; }
        public int FileTypeId { get; set; }
        public virtual FileType FileType { get; set; }
        public string Title{ get; set; }
        public string Link{ get; set; }
        public string Description { get; set; }
        public DateTime UpdateDate{ get; set; }
        public int NewsId { get; set; }
    }
}
