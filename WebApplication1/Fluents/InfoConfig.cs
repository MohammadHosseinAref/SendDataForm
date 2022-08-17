using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApplication1.Data;

namespace WebApplication1.Fluents
{
    public class InfoConfig : IEntityTypeConfiguration<Info>
    {
        public void Configure(EntityTypeBuilder<Info> builder)
        {
            builder.HasKey(a => a.Id);
            builder.Property(a => a.NameFamily).HasMaxLength(50);
            builder.Property(a => a.Mobile).HasMaxLength(11);
            builder.Property(a => a.Message).HasMaxLength(400);
        }
    }
}