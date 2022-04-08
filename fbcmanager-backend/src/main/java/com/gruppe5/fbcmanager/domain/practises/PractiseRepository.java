package com.gruppe5.fbcmanager.domain.practises;

import java.util.List;

import com.gruppe5.fbcmanager.domain.users.UserEntity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PractiseRepository extends CrudRepository<PractiseEntity, Long> {
    List<PractiseEntity> findByPractiseid(long practiseid);
}
