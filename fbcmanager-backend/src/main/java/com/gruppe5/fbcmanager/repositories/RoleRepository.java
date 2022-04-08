package com.gruppe5.fbcmanager.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.gruppe5.fbcmanager.entities.RoleEntity;
import com.gruppe5.fbcmanager.models.ERole;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    Optional<RoleEntity> findByName(ERole name);
}
