using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UploadFile;
using WebApplication1.Data;
using WebApplication1.Services.Interface;
using WebApplication1.ViewModels;

namespace WebApplication1.Services.Class
{
    public class InfoService : IInfoService
    {
        private readonly Data.ApplicationDbContext dbContext;
        public InfoService(Data.ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<bool> AddSp(InfoVM infoVM)
        {
            try
            {

            await dbContext
            .Database.ExecuteSqlRawAsync("EXECUTE sp_Info {0},{1},{2},{3}", infoVM.NameFamily, infoVM.Mobile, infoVM.Message,infoVM.src);
            return true;

            }
            catch (System.Exception ex)
            {
                return false;
            }
        }
        public bool Add(InfoVM infoVM)
        {
            Info info = new Info()
            {
                Message = infoVM.Message,
                Mobile = infoVM.Mobile,
                NameFamily = infoVM.NameFamily,
                Src =   infoVM.src,
            };

            try
            {
            dbContext.Add(info);
            dbContext.SaveChanges();
                return true;
            }
            catch (System.Exception ex)
            {

                return false;
            }
        }

    }
}
