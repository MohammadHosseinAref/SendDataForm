using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using WebApplication1.Data.FileTypes;
using WebApplication1.Data.NewsFiles;
using WebApplication1.Fluents;

namespace WebApplication1.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public DbSet<Info> Info { get; set; }
        public DbSet<NewsFile>NewsFile{ get; set; }
        public DbSet<FileType> FileType{ get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new InfoConfig());
            builder.ApplyConfiguration(new FileTypeConfig());
            builder.ApplyConfiguration(new NewsFileConfig());

        }
    }
}
