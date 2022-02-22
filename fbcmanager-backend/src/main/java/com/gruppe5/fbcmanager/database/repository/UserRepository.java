package com.gruppe5.fbcmanager.database.repository;

import java.util.List;

import com.gruppe5.fbcmanager.database.models.User;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


//https://www.baeldung.com/spring-jpa-like-queries

//https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.at-query

public interface UserRepository extends CrudRepository<User, Integer> {

    List<User> findByFirstnameStartsWith(String query);

    List<User> findByLastnameStartsWith(String query);

    List<User> findByTeamStartsWith(String query);

    List<User> findByIsactive(String active);

    
}
