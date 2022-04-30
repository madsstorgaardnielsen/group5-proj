using fbcmanager_api.Database.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace fbcmanager_api.Database.Configuration;

public class AdminConfiguration : IEntityTypeConfiguration<User> {
    public void Configure(EntityTypeBuilder<User> builder) {
        var admin = new User {
            Id = "-1",
            UserName = "admin",
            NormalizedUserName = "ADMIN",
            Firstname = "ADMIN",
            Lastname =  "ADMIN",
            NormalizedEmail =  "ADMIN",
            Email =  "ADMIN",
            City = "ADMIN",
            Zip = "ADMIN",
            Street = "ADMIN",
            PhoneNumber =  "ADMIN",
            
        };
        admin.PasswordHash = PwGenerator(admin);
        builder.HasData(admin);
    }

    private string PwGenerator(User user) {
        var passHash = new PasswordHasher<User>();
        return passHash.HashPassword(user, "admin");
    }
}