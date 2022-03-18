package com.gruppe5.fbcmanager;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

import com.gruppe5.fbcmanager.entities.UserEntity;
import com.gruppe5.fbcmanager.repositories.PractiseRepository;
import com.gruppe5.fbcmanager.repositories.UserRepository;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)

abstract class InitTestData {
        @Autowired
        UserRepository userRepository;


        // @Autowired
        // PractiseRepository practiseRepository;

        @BeforeAll
        void BeforeAll() {
                userRepository.saveAll(generateUsers());
        }

        private static List<UserEntity> generateUsers() {
                List<UserEntity> users = new ArrayList<>();

                UserEntity bent = new UserEntity();
                bent.setBirthDate(LocalDate.now());
                bent.setCity("city");
                bent.setEmail("email");
                bent.setFirstname("bent");
                bent.setIsactive(true);
                bent.setLastname("lastname");
                bent.setPhone(12345678);
                bent.setStreet("street");
                bent.setTeam("team");
                bent.setUsertype(1);
                bent.setZipcode("zipcode");

                UserEntity alice = new UserEntity();
                alice.setBirthDate(LocalDate.now());
                alice.setCity("city");
                alice.setEmail("email");
                alice.setFirstname("alice");
                alice.setIsactive(true);
                alice.setLastname("lastname");
                alice.setPhone(12345678);
                alice.setStreet("street");
                alice.setTeam("team");
                alice.setUsertype(1);
                alice.setZipcode("zipcode");

                users.add(bent);
                users.add(alice);


                return users;
        }

        //
        // public Practice(String team, String location, LocalDate date, LocalTime
        // timeStart,
        // LocalTime timeEnd, User trainer)

        // private static List<Practise> generatePractises() {
        //         List<Practise> practices = new ArrayList<>();
               
        //         Practise practice1 = new Practise("team1", "location", LocalDate.of(2022, Month.JANUARY, 22),
        //                         LocalTime.of(17, 30), LocalTime.of(20, 30));

        //         Practise practice2 = new Practise("team2", "location2", LocalDate.of(2022, Month.DECEMBER, 22),
        //                         LocalTime.of(17, 30), LocalTime.of(20, 30));

        //         practices.add(practice1);
        //         practices.add(practice2);

        //         return practices;
        // }

        @AfterAll
        void afterAll() {
                userRepository.deleteAll();
        }
}
