using fbcmanager_api.Database.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace fbcmanager_api.Database; 

public class Seeders {
    
}

public class SeedRoles : IEntityTypeConfiguration<IdentityRole> {
    public void Configure(EntityTypeBuilder<IdentityRole> builder) {
        builder.HasData(
            new IdentityRole {
                Id = "-2",
                Name = "User",
                NormalizedName = "USER"
            },
            new IdentityRole {
                Id = "-1",
                Name = "Admin",
                NormalizedName = "ADMIN"
            }
        );
    }
}


public class SeedAdminRole : IEntityTypeConfiguration<IdentityUserRole<string>> {
    public void Configure(EntityTypeBuilder<IdentityUserRole<string>> builder) {
        var assignRole = new IdentityUserRole<string> {
            RoleId = "-1",
            UserId = "-1"
        };

        builder.HasData(assignRole);
    }
}

public class SeedAdminUser : IEntityTypeConfiguration<User> {
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