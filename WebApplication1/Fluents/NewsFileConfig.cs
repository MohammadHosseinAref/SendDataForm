using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApplication1.Data;
using WebApplication1.Data.NewsFiles;

namespace WebApplication1.Fluents
{
    public class NewsFileConfig : IEntityTypeConfiguration<NewsFile>
    {
        public void Configure(EntityTypeBuilder<NewsFile> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Title).HasMaxLength(100).IsRequired(true);
            builder.Property(x => x.Link).HasMaxLength(100);
            builder.Property(x => x.Description).HasMaxLength(500);

            builder.HasOne(x=> x.FileType)
               .WithMany(x => x.NewsFiles)
               .HasForeignKey(x => x.FileTypeId)
               .IsRequired(true);

        }
    }
}