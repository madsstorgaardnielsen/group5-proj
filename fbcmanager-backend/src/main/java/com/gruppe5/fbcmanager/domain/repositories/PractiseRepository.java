package com.gruppe5.fbcmanager.domain.repositories;

import java.util.List;

import com.gruppe5.fbcmanager.domain.entities.PractiseEntity;
import com.gruppe5.fbcmanager.domain.entities.UserEntity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PractiseRepository extends CrudRepository<PractiseEntity, Long> {
    List<PractiseEntity> findByPractiseid(long practiseid);
}
