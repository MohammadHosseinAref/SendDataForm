using System.IO;

namespace WebApplication1.Extensions
{
    public static class UploadFileTools
    {
        public static string GetExtension(this string url)
        => !string.IsNullOrEmpty(url) ?
            Path.GetExtension(url).Replace(".",string.Empty).Trim() :
            string.Empty;
    public static string GetIcon(string extension)
    {
        string icon = "download";
        switch (extension)
        {
            case "pdf":
                icon = "file-pdf";
                break;
                case "xlsx":
                icon = "file-excel";
                break;
            default:
                break;
        }
        return icon;
    }
    
}
}
