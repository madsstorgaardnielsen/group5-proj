package com.gruppe5.fbcmanager.repositories;

import com.gruppe5.fbcmanager.entities.AddressEntity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends CrudRepository<AddressEntity, Long>{
}
