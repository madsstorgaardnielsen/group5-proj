package com.gruppe5.fbcmanager;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

import com.gruppe5.fbcmanager.dtos.UserDTO;
import com.gruppe5.fbcmanager.entities.PractiseEntity;
import com.gruppe5.fbcmanager.entities.UserEntity;
import com.gruppe5.fbcmanager.repositories.PractiseRepository;
import com.gruppe5.fbcmanager.repositories.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

//https://lightrun.com/java/the-complete-list-of-spring-boot-annotations-you-must-know/

@SpringBootApplication
public class FbcmanagerApplication {
    public static void main(String[] args) {
        SpringApplication.run(FbcmanagerApplication.class, args);
    }

    @Bean
    public CommandLineRunner mappingDemo(UserRepository userRepository,
            PractiseRepository practiseRepository) {
        return args -> {

            UserEntity user1 = new UserEntity("street", "zipcode", "city", "phone", "email", "user1",
                    "lastname", "isactive", "team", "usertype", LocalDate.of(1991, 12, 12));

            UserEntity user2 = new UserEntity("street", "zipcode", "city", "phone", "email", "user2",
                    "lastname", "isactive", "team", "usertype", LocalDate.of(1991, 12, 12));

            UserEntity user3 = new UserEntity("street", "zipcode", "city", "phone", "email", "user3",
                    "lastname", "isactive", "team", "usertype", LocalDate.of(1991, 12, 12));

            UserEntity user4 = new UserEntity("street", "zipcode", "city", "phone", "email", "user4",
                    "lastname", "isactive", "team", "usertype", LocalDate.of(1991, 12, 12));

            userRepository.save(user1);
            userRepository.save(user2);
            userRepository.save(user3);
            userRepository.save(user4);

            Set<UserEntity> participants = new HashSet<UserEntity>();

            participants.add(user1);
            participants.add(user2);

            practiseRepository.save(new PractiseEntity("location1", LocalDate.of(1999, 12, 12), LocalTime.of(17, 30),
                    LocalTime.of(20, 30), participants));
            practiseRepository.save(new PractiseEntity("location2", LocalDate.of(2001, 12, 12), LocalTime.of(17, 30),
                    LocalTime.of(20, 30), participants));

            participants.add(user3);
            participants.add(user4);
            practiseRepository.save(new PractiseEntity("location3", LocalDate.of(2500, 12, 12), LocalTime.of(17, 30),
                    LocalTime.of(20, 30), participants));
        };
    }

}
