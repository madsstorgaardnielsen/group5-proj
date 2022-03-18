package com.gruppe5.fbcmanager;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.List;

import com.gruppe5.fbcmanager.entities.UserEntity;
import com.gruppe5.fbcmanager.repositories.UserRepository;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
// @ContextConfiguration(classes = { SpringDataConfiguration.class })
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserCrudTest extends InitTestData {
    @Autowired
    UserRepository userRepository;

    @Test
    @Order(1)
    void testLoadUsers() {
        List<UserEntity> users = (List<UserEntity>) userRepository.findAll();

        assertAll(
                () -> assertTrue(users.size() > 0),
                () -> assertEquals("bent", users.get(0).getFirstname()),
                () -> assertEquals("alice", users.get(1).getFirstname()));
    }

    @Test
    @Order(2)
    void testFindAllOrderByNameAsc() {
        List<UserEntity> users = (List<UserEntity>) userRepository.findAllByOrderByFirstnameAsc();
        assertAll(
                () -> assertEquals("alice", users.get(0).getFirstname()),
                () -> assertEquals("bent", users.get(1).getFirstname()));
    }

    @Test
    @Order(3)
    void testAddUser() {
        UserEntity hans = new UserEntity();
        hans.setBirthDate(LocalDate.now());
        hans.setCity("city");
        hans.setEmail("email");
        hans.setFirstname("hans");
        hans.setIsactive(true);
        hans.setLastname("lastname");
        hans.setPhone(12345678);
        hans.setStreet("street");
        hans.setTeam("team");
        hans.setUsertype(1);
        hans.setZipcode("zipcode");

        userRepository.save(hans);
        List<UserEntity> users = (List<UserEntity>) userRepository.findAll();

        assertAll(
                () -> assertEquals("hans", users.get(users.size() - 1).getFirstname()));
    }

    @Test
    @Order(4)
    void testUpdateUser() {
        List<UserEntity> users = (List<UserEntity>) userRepository.findAll();
        UserEntity user = users.get(0);
        user.setFirstname("newName");
        userRepository.save(user);

        users = (List<UserEntity>) userRepository.findAll();
        assertEquals("newName", users.get(0).getFirstname());

    }

}
