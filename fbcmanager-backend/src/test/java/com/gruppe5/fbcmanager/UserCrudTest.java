package com.gruppe5.fbcmanager;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import com.gruppe5.fbcmanager.configuration.SpringDataConfiguration;
import com.gruppe5.fbcmanager.database.models.Address;
import com.gruppe5.fbcmanager.database.models.ContactInfo;
import com.gruppe5.fbcmanager.database.models.User;
import com.gruppe5.fbcmanager.database.repositories.UserRepository;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = { SpringDataConfiguration.class })
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserCrudTest extends InitTestData {
        @Autowired
        UserRepository userRepository;

        @Test
        @Order(1)
        void testLoadUsers() {
                List<User> users = (List<User>) userRepository.findAll();

                assertAll(
                                () -> assertTrue(users.size() > 0),
                                () -> assertEquals("John", users.get(0).getFirstname()),
                                () -> assertEquals("street", users.get(0).getAddress().getStreet()),
                                () -> assertEquals("john@john.dk", users.get(0).getContactInfos().getEmail()));
        }

        @Test
        @Order(2)
        void testFindAllOrderByNameAsc() {
                List<User> users = (List<User>) userRepository.findAllByOrderByFirstnameAsc();
                assertAll(
                                () -> assertEquals("a", users.get(0).getFirstname()),
                                () -> assertEquals("c", users.get(1).getFirstname()));
        }

        @Test
        @Order(3)
        void testAddUser() {
                User hans = new User(
                                "hans",
                                "hans",
                                "hans",
                                "hans",
                                "hans");
                hans.setAddress(
                                new Address(hans, "hansstreet", "hanszipcode", "hanscity"));

                hans.setContactInfos(new ContactInfo(hans, "123123123", "hans@john.dk"));

                userRepository.save(hans);
                List<User> users = (List<User>) userRepository.findAll();

                assertAll(
                                () -> assertEquals("hans", users.get(users.size() - 1).getFirstname()));
        }

        @Test
        @Order(4)
        void testUpdateUser() {
                List<User> users = (List<User>) userRepository.findAll();
                User user = users.get(1);
                user.setFirstname("newName");
                userRepository.save(user);

                users = (List<User>) userRepository.findAll();
                assertEquals("newName", users.get(1).getFirstname());

        }

}
