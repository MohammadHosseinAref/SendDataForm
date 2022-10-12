using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using WebApplication1.Data.NewsFiles;
using WebApplication1.Extensions;
using WebApplication1.ViewModels;

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
           ViewBag.FileType=_dbContext.FileType.AsNoTracking().ToList();
            
           List <ListNewsFilesVM> newsFilesVM = _dbContext.NewsFile.AsNoTracking().Select(x=>
           new ListNewsFilesVM
            {
               FileTypeTitle=x.FileType.Title,
               Title=x.Title,
               Description=x.Description,
               Link=x.Link,
               UpdateDateStr=x.UpdateDate.GeorgianToPersian(null),
           }).ToList();
            return View(newsFilesVM);
        }
        public IActionResult Filter(NewsFileFilterVM newsFileFilterVM)
        {
           IQueryable< NewsFile> model = _dbContext.NewsFile.AsNoTracking();

            if(!string.IsNullOrEmpty(newsFileFilterVM.SearchText))
            {
                if(newsFileFilterVM.SearchIn== "NewsFilesTitle")
                    model = model.Where(x => x.Title.Contains(newsFileFilterVM.SearchText));
                else if(newsFileFilterVM.SearchIn== "NewsFilesDescription")
                    model = model.Where(x => x.Description.Contains(newsFileFilterVM.SearchText));
                
            }
            if(!string.IsNullOrEmpty(newsFileFilterVM.FildTypeFilter))
            {
                int FildTypeFilterId = Convert.ToInt32(newsFileFilterVM.FildTypeFilter);
                model = model.Where(x => x.FileTypeId == FildTypeFilterId);
            }
            model = BetweenUpdateDate(newsFileFilterVM.UpdateDateFrom, newsFileFilterVM.UpdateDateTo, model);

            return PartialView("_list",model.Select(x =>
           new ListNewsFilesVM
           {
               FileTypeTitle = x.FileType.Title,
               Title = x.Title,
               Description = x.Description,
               Link = x.Link,
               UpdateDateStr = x.UpdateDate.GeorgianToPersian(null),
           }).ToList());
        }
        private IQueryable<NewsFile> BetweenUpdateDate(string updateDateFrom, string updateDateTo, IQueryable<NewsFile> model)
        {
            DateTime? UpdateDateTo = null;
            DateTime? UpdateDateFrom = null;
            if (!string.IsNullOrEmpty(updateDateFrom))
                UpdateDateFrom = updateDateFrom.ParsePersianToGorgian();
            if (!string.IsNullOrEmpty(updateDateTo))
                UpdateDateTo = updateDateTo.ParsePersianToGorgian();
            if (UpdateDateFrom.HasValue || UpdateDateTo.HasValue)
            {
                if (UpdateDateFrom.HasValue && UpdateDateTo.HasValue)
                    model = model.Where(x => x.UpdateDate >= UpdateDateFrom && x.UpdateDate <= UpdateDateTo);
                else if (UpdateDateFrom.HasValue)
                    model = model.Where(x => x.UpdateDate >= UpdateDateFrom);
                else
                    model = model.Where(x => x.UpdateDate <= UpdateDateTo);
            }
            return model;
        }

    }
}
