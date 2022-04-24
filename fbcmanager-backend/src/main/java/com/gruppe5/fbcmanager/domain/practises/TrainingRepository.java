package com.gruppe5.fbcmanager.domain.practises;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingRepository extends CrudRepository<TrainingEntity, Long> {

List<TrainingEntity> findAll();

    
}
