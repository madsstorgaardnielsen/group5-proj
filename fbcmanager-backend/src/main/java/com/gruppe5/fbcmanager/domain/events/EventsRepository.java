package com.gruppe5.fbcmanager.domain.events;

import java.util.List;
import java.util.Optional;

import com.gruppe5.fbcmanager.domain.events.EventsEntity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


//https://www.baeldung.com/spring-jpa-like-queries

//https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.at-query
@Repository
public interface EventsRepository extends CrudRepository<EventsEntity, Long>{

    List<EventsEntity> findAll();

    List<EventsEntity> findAllByOrderByDateAsc();
}
    

