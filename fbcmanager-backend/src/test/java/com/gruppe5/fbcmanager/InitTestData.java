// package com.gruppe5.fbcmanager;

// import java.time.LocalDate;
// import java.time.LocalTime;
// import java.time.Month;
// import java.util.ArrayList;
// import java.util.List;

// import com.gruppe5.fbcmanager.entities.Address;
// import com.gruppe5.fbcmanager.entities.ContactInfo;
// import com.gruppe5.fbcmanager.entities.Practise;
// import com.gruppe5.fbcmanager.entities.User;
// import com.gruppe5.fbcmanager.repositories.AddressRepository;
// import com.gruppe5.fbcmanager.repositories.ContactInfoRepository;
// import com.gruppe5.fbcmanager.repositories.PractiseRepository;
// import com.gruppe5.fbcmanager.repositories.UserRepository;

// import org.junit.jupiter.api.AfterAll;
// import org.junit.jupiter.api.BeforeAll;
// import org.junit.jupiter.api.TestInstance;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;

// @SpringBootTest
// @TestInstance(TestInstance.Lifecycle.PER_CLASS)

// abstract class InitTestData {
//         @Autowired
//         UserRepository userRepository;

//         @Autowired
//         AddressRepository addressRepository;

//         @Autowired
//         ContactInfoRepository contactInfoRepository;

//         @Autowired
//         PractiseRepository practiseRepository;

//         @BeforeAll
//         void BeforeAll() {
//                 userRepository.saveAll(generateUsers());
//                 practiseRepository.saveAll(generatePractises());
//         }

//         private static List<User> generateUsers() {
//                 List<User> users = new ArrayList<>();

//                 User john = new User(
//                                 "John",
//                                 "Johnsen",
//                                 "active",
//                                 "team",
//                                 "usertype");
//                 john.setAddress(
//                                 new Address(john, "street", "zipcode", "city"));

//                 john.setContactInfos(
//                                 new ContactInfo(john, "123123123", "john@john.dk"));

//                 User c = new User(
//                                 "c",
//                                 "Johnsen",
//                                 "active",
//                                 "team",
//                                 "usertype");
//                 c.setAddress(
//                                 new Address(c, "street", "zipcode", "city"));

//                 c.setContactInfos(
//                                 new ContactInfo(c, "123123123", "ca@john.dk"));

//                 User a = new User(
//                                 "a",
//                                 "Johnsen",
//                                 "active",
//                                 "team",
//                                 "usertype");
//                 a.setAddress(
//                                 new Address(a, "street", "zipcode", "city"));

//                 a.setContactInfos(
//                                 new ContactInfo(a, "123123123", "a@john.dk"));

//                 users.add(john);
//                 users.add(c);
//                 users.add(a);

//                 return users;
//         }

//         //
//         // public Practice(String team, String location, LocalDate date, LocalTime
//         // timeStart,
//         // LocalTime timeEnd, User trainer)

//         private static List<Practise> generatePractises() {
//                 List<Practise> practices = new ArrayList<>();
               
//                 Practise practice1 = new Practise("team1", "location", LocalDate.of(2022, Month.JANUARY, 22),
//                                 LocalTime.of(17, 30), LocalTime.of(20, 30));

//                 Practise practice2 = new Practise("team2", "location2", LocalDate.of(2022, Month.DECEMBER, 22),
//                                 LocalTime.of(17, 30), LocalTime.of(20, 30));

//                 practices.add(practice1);
//                 practices.add(practice2);

//                 return practices;
//         }

//         @AfterAll
//         void afterAll() {
//                 addressRepository.deleteAll();
//                 userRepository.deleteAll();
//                 contactInfoRepository.deleteAll();
//                 practiseRepository.deleteAll();
//         }
// }
