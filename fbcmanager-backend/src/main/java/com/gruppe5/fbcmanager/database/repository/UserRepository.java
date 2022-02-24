package com.gruppe5.fbcmanager.database.repository;

import java.util.List;


import com.gruppe5.fbcmanager.database.models.User;

import org.springframework.data.repository.CrudRepository;


//https://www.baeldung.com/spring-jpa-like-queries

//https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.at-query

public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findAllByOrderByFirstnameAsc();

    List<User> findByFirstnameStartsWith(String query);

    List<User> findByLastnameStartsWith(String query);

    List<User> findByTeamStartsWith(String query);

    List<User> findByIsactive(String active);


    // List<User> findByPhone(String phone);

    // List<User> findByStreet(String street);
}
