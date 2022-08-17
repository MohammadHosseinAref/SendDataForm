using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UploadFile;
using WebApplication1.Models;
using WebApplication1.Services.Interface;
using WebApplication1.ViewModels;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        readonly IInfoService infoService;
        readonly IHostingEnvironment _hostingEnvironment;

        public HomeController(IInfoService infoService, IHostingEnvironment hostingEnvironment)
        {
            this.infoService = infoService;
            _hostingEnvironment = hostingEnvironment;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public IActionResult save(InfoVM model)
        {
            model.src = AddImage(model.img);
            return new JsonResult(infoService.Add(model));
        }

        [HttpPost]
        public async Task<IActionResult> saveSp(InfoVM model)
        {
            model.src = AddImage(model.img);
            return new JsonResult(await infoService.AddSp(model));
        }
        #region sp Create
        //        CREATE OR ALTER PROCEDURE sp_Info(
        //            @NameFamily VARCHAR(50), 
        //    @Mobile VARCHAR(11), 
        //    @Message VARCHAR(400),
        //    @src VARCHAR(max))
        //AS
        //BEGIN
        //INSERT INTO Info(
        //    NameFamily,
        //    Mobile,
        //    [Message],
        //    Src)
        //    VALUES(@NameFamily, @Mobile, @Message, @src)
        //end
        #endregion

        private string AddImage(IFormFile img)
        {
            if (img != null && img.Length > 0)
            {
                string extension = "";

                var allowedExtensions = new[] { ".png", ".jpg", ".jpeg", ".ico" };
                extension = Path.GetExtension(img.FileName);
                if (allowedExtensions.Contains(extension.ToLower()) && img != null && img.Length > 0)
                {
                    UploadFileTools _up = new UploadFileTools();
                    string webRootPath = _hostingEnvironment.WebRootPath;

                    string path = webRootPath + "/Images/";
                    _up.FileType = extension;
                    _up.Filename = img.FileName.Replace(extension, "");
                    _up.path = path;
                    _up.file = img;
                    if (System.IO.File.Exists(path + img.FileName + extension))
                    {
                        return string.Empty;
                    }


                    if (_up.Upload())
                        return "/Images/" + img.FileName;

                }
            }
            return string.Empty;
        }

    }
}
