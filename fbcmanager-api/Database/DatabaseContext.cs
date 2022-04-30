using fbcmanager_api.Database.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace fbcmanager_api.Database;

public class DatabaseContext : IdentityDbContext<User> {
    public DatabaseContext(DbContextOptions<DatabaseContext> options) :
        base(options) {
    }

    public DatabaseContext() {
    }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        if (optionsBuilder.IsConfigured) return;

        const string appSettings = "appsettings.json";

        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile(appSettings)
            .Build();

        var connectionString = configuration
            .GetConnectionString("DefaultConnection");

        optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
    }

    protected override void OnModelCreating(ModelBuilder builder) {
        base.OnModelCreating(builder);
        builder.ApplyConfiguration(new SeedRoles());
        builder.ApplyConfiguration(new SeedAdminUser());
        builder.ApplyConfiguration(new SeedAdminRole());

        builder.Entity<User>()
            .Ignore(u => u.EmailConfirmed)
            .Ignore(u => u.PhoneNumberConfirmed)
            .Ignore(u => u.TwoFactorEnabled)
            .Ignore(u => u.LockoutEnabled)
            .Ignore(u => u.LockoutEnd)
            .Ignore(u => u.AccessFailedCount);

        builder.Entity<Team>().Property(e => e.Id).ValueGeneratedOnAdd();
        builder.Entity<Booking>().Property(e => e.Id).ValueGeneratedOnAdd();
        builder.Entity<Event>().Property(e => e.Id).ValueGeneratedOnAdd();
        builder.Entity<Field>().Property(e => e.Id).ValueGeneratedOnAdd();
        builder.Entity<News>().Property(e => e.Id).ValueGeneratedOnAdd();
        builder.Entity<Practise>().Property(e => e.Id).ValueGeneratedOnAdd();
    }
}