package com.gruppe5.fbcmanager.repositories;

import java.util.List;

import com.gruppe5.fbcmanager.entities.TrainingEntity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingRepository extends CrudRepository<TrainingEntity, Long> {

List<TrainingEntity> findAll();

    
}
