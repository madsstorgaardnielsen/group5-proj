using fbcmanager_api.Database.Models;
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

    public DbSet<Event> Events { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<Field> Fields { get; set; }
    public DbSet<News> News { get; set; }
    public DbSet<Practise> Practises { get; set; }
    public DbSet<Team> Teams { get; set; }

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
            .Property(e => e.Id)
            .ValueGeneratedOnAdd();
        builder.Entity<Team>()
            .HasMany(x => x.TeamMembers)
            .WithOne(x => x.Team)
            .OnDelete(DeleteBehavior.SetNull);
        builder.Entity<Team>()
            .HasMany(x => x.Bookings)
            .WithOne(x => x.Team)
            .OnDelete(DeleteBehavior.SetNull);

        builder.Entity<News>()
            .Property(e => e.Id)
            .ValueGeneratedOnAdd();

        builder.Entity<Booking>()
            .Property(e => e.Id)
            .ValueGeneratedOnAdd();
        builder.Entity<Booking>()
            .HasOne(x => x.Team)
            .WithMany(x => x.Bookings)
            .OnDelete(DeleteBehavior.Cascade);


        builder.Entity<Event>()
            .Property(e => e.Id)
            .ValueGeneratedOnAdd();
        builder.Entity<Event>()
            .HasMany(x => x.Participants)
            .WithMany(x => x.Events);


        builder.Entity<Field>().Property(e => e.Id).ValueGeneratedOnAdd();
        builder.Entity<Field>()
            .HasMany(x => x.Bookings)
            .WithOne(x => x.Field)
            .OnDelete(DeleteBehavior.SetNull);

        builder.Entity<Practise>().Property(e => e.Id).ValueGeneratedOnAdd();
        builder.Entity<Practise>()
            .HasMany(x => x.Participants)
            .WithMany(x => x.Practises);
    }
}