package com.gruppe5.fbcmanager;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

import com.gruppe5.fbcmanager.dtos.UserDTO;
import com.gruppe5.fbcmanager.entities.PractiseEntity;
import com.gruppe5.fbcmanager.entities.RoleEntity;
import com.gruppe5.fbcmanager.entities.UserEntity;
import com.gruppe5.fbcmanager.models.ERole;
import com.gruppe5.fbcmanager.repositories.PractiseRepository;
import com.gruppe5.fbcmanager.repositories.RoleRepository;
import com.gruppe5.fbcmanager.repositories.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

//https://lightrun.com/java/the-complete-list-of-spring-boot-annotations-you-must-know/

@EnableAutoConfiguration
@SpringBootApplication
public class FbcmanagerApplication {
    public static void main(String[] args) {
        SpringApplication.run(FbcmanagerApplication.class, args);
    }

    @Bean
    public CommandLineRunner mappingDemo(RoleRepository roleRepository) {
        return args -> {

            // Seeding DB with roles
            var res = roleRepository.findAll();

            if (res.size() == 3) {
                return;
            } else {
                RoleEntity user = new RoleEntity();
                user.setName(ERole.ROLE_USER);

                RoleEntity moderator = new RoleEntity();
                moderator.setName(ERole.ROLE_MODERATOR);

                RoleEntity admin = new RoleEntity();
                admin.setName(ERole.ROLE_ADMIN);

                roleRepository.save(user);
                roleRepository.save(moderator);
                roleRepository.save(admin);
            }
            // UserEntity user1 = new UserEntity("street", "zipcode", "city", "phone",
            // "email", "user1",
            // "lastname", "isactive", "team", "usertype", LocalDate.of(1991, 12, 12));

            // UserEntity user2 = new UserEntity("street", "zipcode", "city", "phone",
            // "email", "user2",
            // "lastname", "isactive", "team", "usertype", LocalDate.of(1991, 12, 12));

            // UserEntity user3 = new UserEntity("street", "zipcode", "city", "phone",
            // "email", "user3",
            // "lastname", "isactive", "team", "usertype", LocalDate.of(1991, 12, 12));

            // UserEntity user4 = new UserEntity("street", "zipcode", "city", "phone",
            // "email", "user4",
            // "lastname", "isactive", "team", "usertype", LocalDate.of(1991, 12, 12));

            // userRepository.save(user1);
            // userRepository.save(user2);
            // userRepository.save(user3);
            // userRepository.save(user4);

            // Set<UserEntity> participants = new HashSet<UserEntity>();

            // participants.add(user1);
            // participants.add(user2);

            // practiseRepository.save(new PractiseEntity("location1", LocalDate.of(1999,
            // 12, 12), LocalTime.of(17, 30),
            // LocalTime.of(20, 30), participants));
            // practiseRepository.save(new PractiseEntity("location2", LocalDate.of(2001,
            // 12, 12), LocalTime.of(17, 30),
            // LocalTime.of(20, 30), participants));

            // participants.add(user3);
            // participants.add(user4);
            // practiseRepository.save(new PractiseEntity("location3", LocalDate.of(2500,
            // 12, 12), LocalTime.of(17, 30),
            // LocalTime.of(20, 30), participants));

            // var t = practiseRepository.findByPractiseid(1);

            // for (var string : t) {
            // System.out.println(string);
            // }
        };
    }

}
