package com.gruppe5.fbcmanager.repositories;

import com.gruppe5.fbcmanager.dtos.UserDTO;
import com.gruppe5.fbcmanager.entities.ContactInfoEntity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactInfoRepository extends CrudRepository<ContactInfoEntity, Long> {
    
}
