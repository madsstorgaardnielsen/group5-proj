package com.gruppe5.fbcmanager.domain.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gruppe5.fbcmanager.domain.entities.RoleEntity;
import com.gruppe5.fbcmanager.domain.models.ERole;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    Optional<RoleEntity> findByName(ERole name);
}
