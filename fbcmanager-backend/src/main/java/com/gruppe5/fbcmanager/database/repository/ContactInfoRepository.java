package com.gruppe5.fbcmanager.database.repository;

import com.gruppe5.fbcmanager.database.models.ContactInfo;

import org.springframework.data.repository.CrudRepository;

public interface ContactInfoRepository extends CrudRepository<ContactInfo, Long> {
    
}
