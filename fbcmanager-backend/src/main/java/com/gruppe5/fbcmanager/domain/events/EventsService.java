package com.gruppe5.fbcmanager.domain.events;

import java.util.ArrayList;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import com.gruppe5.fbcmanager.domain.practises.PractiseRepository;
import com.gruppe5.fbcmanager.domain.users.UserRepository;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import lombok.var;

@Service
public class EventsService {
    
    @Autowired
    public EventsRepository eventsRepository;

    public EventsDTO createEvent(EventsDTO event) {

        EventsEntity newEvent = new EventsEntity();
        newEvent.setDate(event.getDate());
        newEvent.setDescription(event.getDescription());
        newEvent.setPrice(event.getPrice());
        newEvent.setType(event.getType());

        return new EventsDTO(eventsRepository.save(newEvent));
    }

    @Transactional
    public EventsDTO updateEvent(long id, EventsDTO updatedEvent) {
        
        if (eventsRepository.findById(id).isPresent()) {
            EventsEntity event = eventsRepository.findById(id).get();
            event.setType(updatedEvent.getType());
            event.setDescription(updatedEvent.getDescription());
            event.setDate(updatedEvent.getDate());
            event.setPrice(updatedEvent.getPrice());

            return new EventsDTO(eventsRepository.save(event));

        } else {
            throw new EntityNotFoundException("Event with id: " + id + " not found");
        }
    }

    public EventsDTO getEvent(long id) {
        if (eventsRepository.findById(id).isPresent()) {
            return new EventsDTO(eventsRepository.findById(id).get());
        } else {
            throw new EntityNotFoundException("Event with id: " + id + " not found");
        }
    }

    public ArrayList<EventsDTO> getAllEvents() {
        var events = new ArrayList<EventsDTO>();

        var entities = eventsRepository.findAllByOrderByDateAsc();

        if (entities.size() > 0) {
            for (var entity : entities) {
                events.add(new EventsDTO(entity));
            }
            return events;
        } else {
            throw new EntityNotFoundException("No Events found");
        }
    }

    public ArrayList<EventsDTO> getAllEventsByDate(){
        return null;
    }




}
