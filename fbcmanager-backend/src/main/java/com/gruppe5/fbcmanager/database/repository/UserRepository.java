package com.gruppe5.fbcmanager.database.repository;

import java.util.List;

import com.gruppe5.fbcmanager.database.models.User;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User, Integer> {

    List<User> findByFirstnameContaining(String query);

    List<User> findByLastnameContaining(String query);

    List<User> findByTeamContaining(String query);

    List<User> findByIsactive(String active);

    
}
