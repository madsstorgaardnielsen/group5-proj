package com.gruppe5.fbcmanager;

import java.util.ArrayList;
import java.util.List;

import com.gruppe5.fbcmanager.database.models.Address;
import com.gruppe5.fbcmanager.database.models.ContactInfo;
import com.gruppe5.fbcmanager.database.models.User;
import com.gruppe5.fbcmanager.database.repository.AddressRepository;
import com.gruppe5.fbcmanager.database.repository.ContactInfoRepository;
import com.gruppe5.fbcmanager.database.repository.UserRepository;

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

    @Autowired
    AddressRepository addressRepository;

    @Autowired
    ContactInfoRepository contactInfoRepository;

    @BeforeAll
    void BeforeAll() {
        userRepository.saveAll(generateUsers());
    }

    private static List<User> generateUsers() {
        List<User> users = new ArrayList<>();

        User john = new User(
                "John",
                "Johnsen",
                "active",
                "team",
                "usertype");
        john.setAddress(
                new Address(john, "street", "zipcode", "city"));

        john.setContactInfos(
                new ContactInfo(john, "123123123", "john@john.dk"));

        User c = new User(
                "c",
                "Johnsen",
                "active",
                "team",
                "usertype");
        c.setAddress(
                new Address(c, "street", "zipcode", "city"));

        c.setContactInfos(
                new ContactInfo(c, "123123123", "ca@john.dk"));

        User a = new User(
                "a",
                "Johnsen",
                "active",
                "team",
                "usertype");
        a.setAddress(
                new Address(a, "street", "zipcode", "city"));

        a.setContactInfos(
                new ContactInfo(a, "123123123", "a@john.dk"));

        users.add(john);
        users.add(c);
        users.add(a);

        return users;
    }

    @AfterAll
    void afterAll() {
        addressRepository.deleteAll();
        userRepository.deleteAll();
        contactInfoRepository.deleteAll();
    }
}
