package com.gruppe5.fbcmanager.repositories;

import java.util.List;

import com.gruppe5.fbcmanager.entities.PractiseEntity;
import com.gruppe5.fbcmanager.entities.UserEntity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


//https://www.baeldung.com/spring-jpa-like-queries

//https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.at-query
@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long> {

    List<UserEntity> findAllByOrderByFirstnameAsc();

    List<UserEntity> findByFirstnameStartsWith(String firstname);

    List<UserEntity> findByLastnameStartsWith(String lastname);

    List<UserEntity> findByIsactive(boolean active);

    UserEntity findByPhone(int phone);

    UserEntity findByEmail(String email);

}
