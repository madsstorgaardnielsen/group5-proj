package com.gruppe5.fbcmanager.repositories;

import java.util.List;

import com.gruppe5.fbcmanager.entities.PractiseEntity;
import com.gruppe5.fbcmanager.entities.UserEntity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PractiseRepository extends CrudRepository<PractiseEntity, Long> {
    List<PractiseEntity> findByPractiseid(long practiseid);
}
