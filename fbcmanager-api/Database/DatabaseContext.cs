using fbcmanager_api.Database.Models;
using fbcmanager_api.Utils;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace fbcmanager_api.Database;

public class DatabaseContext : IdentityDbContext<User, IdentityRole, string> {
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

        builder.Entity<User>()
            .HasMany(x => x.Practises)
            .WithMany(x => x.Participants);
        builder.Entity<User>()
            .HasMany(x => x.Events)
            .WithMany(x => x.Participants);

        builder.Entity<Team>()
            .Property(e => e.TeamId)
            .ValueGeneratedOnAdd();
        builder.Entity<Team>()
            .HasMany(x => x.TeamMembers)
            .WithOne(x => x.Team)
            .OnDelete(DeleteBehavior.SetNull);
        builder.Entity<Team>()
            .HasMany(x => x.Bookings)
            .WithOne(x => x.Team)
            .OnDelete(DeleteBehavior.SetNull);
        

        builder.Entity<Booking>()
            .Property(e => e.BookingId)
            .ValueGeneratedOnAdd();
        builder.Entity<Booking>()
            .HasOne(x => x.Team)
            .WithMany(x => x.Bookings)
            .OnDelete(DeleteBehavior.Cascade);
        

        builder.Entity<Event>()
            .Property(e => e.EventId)
            .ValueGeneratedOnAdd();
        builder.Entity<Event>()
            .HasMany(x => x.Participants)
            .WithMany(x => x.Events);


        builder.Entity<News>()
            .Property(e => e.NewsId)
            .ValueGeneratedOnAdd();
        builder.Entity<News>()
            .HasOne(x => x.Author);

        builder.Entity<Field>().Property(e => e.FieldId).ValueGeneratedOnAdd();
        builder.Entity<Field>()
            .HasMany(x => x.Bookings)
            .WithOne(x => x.Field)
            .OnDelete(DeleteBehavior.SetNull);

        builder.Entity<Practise>().Property(e => e.PractiseId).ValueGeneratedOnAdd();
        builder.Entity<Practise>()
            .HasMany(x => x.Participants)
            .WithMany(x => x.Practises);
    }
}