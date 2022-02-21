package com.gruppe5.fbcmanager.controllers;

import com.gruppe5.fbcmanager.database.repository.UserRepository;
import org.junit.jupiter.api.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

//@RunWith(SpringRunner.class)
//@DataJpaTest
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//class PersonControllerTest {
//
//    @Autowired
//    private PersonRepository personRepository;
//
//    @Autowired
//    private TestEntityManager entityManager;
//
//    Integer id;
//
//    @Test
//    void addNewUser(){
//        Person p = Person.builder().id(999).name("TestingName").build();
//        this.entityManager.persist(p);
//    }

//    @Test
//    @Order(1)
//    @Rollback(value = false)
//    void addNewUser() {
//        Person p = Person.builder().name("TestingName").build();
//        personRepository.save(p);
//        Assertions.assertTrue(p.getId() > 0);
//        id = p.getId();
//    }

//    @Test
//    @Order(2)
//    @Rollback(value = false)
//    void getUser() {
//        assertTrue(personRepository.findById(id).isPresent());
//        assertNotNull(personRepository.findById(id).get());
//    }
//
//    @Test
//    @Order(3)
//    @Rollback(value = false)
//    void getAllUsers() {
//        var list = personRepository.findAll();
//        var size = list.spliterator().getExactSizeIfKnown();
//        assertTrue(size > 0);
//    }
//
//    @Test
//    @Order(4)
//    @Rollback(value = false)
//    void updateUser() {
//        assertTrue(personRepository.findById(id).isPresent());
//        Person p = personRepository.findById(id).get();
//        p.setName("updatedname");
//        personRepository.save(p);
//        assertEquals(personRepository.findById(id).get().getName(), "updatedname");
//    }
//
//    @Test
//    @Order(5)
//    @Rollback(value = false)
//    void deleteUser() {
//        personRepository.deleteById(id);
//        assertFalse(personRepository.findById(id).isPresent());
//    }
//}