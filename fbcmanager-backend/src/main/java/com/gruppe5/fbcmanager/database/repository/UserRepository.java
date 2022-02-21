package com.gruppe5.fbcmanager.database.repository;

import com.gruppe5.fbcmanager.database.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
}
