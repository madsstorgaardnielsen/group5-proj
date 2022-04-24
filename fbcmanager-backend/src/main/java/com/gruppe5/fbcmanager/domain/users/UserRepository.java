package com.gruppe5.fbcmanager.domain.users;

import java.util.List;
import java.util.Optional;

import com.gruppe5.fbcmanager.domain.practises.PractiseEntity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


//https://www.baeldung.com/spring-jpa-like-queries

//https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.at-query
@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long> {

    List<UserEntity> findAll();
    
    List<UserEntity> findAllByOrderByFirstnameAsc();

    List<UserEntity> findByFirstnameStartsWith(String firstname);

    List<UserEntity> findByLastnameStartsWith(String lastname);

    List<UserEntity> findByIsactive(boolean active);

    UserEntity findByPhone(int phone);

    UserEntity findByEmail(String email);

    Optional<UserEntity> findByUsername(String username);
  Boolean existsByUsername(String username);
  Boolean existsByEmail(String email);

}