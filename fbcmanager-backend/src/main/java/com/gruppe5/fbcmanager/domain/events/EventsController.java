package com.gruppe5.fbcmanager.domain.events;
import java.util.ArrayList;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/events")
@CrossOrigin(origins = "*", maxAge = 3600) // FOR TESTING DONT DO THIS IN PROD
public class EventsController {

    @Autowired
    private EventsService eventsService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<EventsDTO> createEvent(@RequestBody EventsDTO event) {
        return new ResponseEntity<>(eventsService.createEvent(event), HttpStatus.CREATED);
    }
    
    /*@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<EventsDTO> getEvent(@PathVariable(value = "id") long id) {
        return new ResponseEntity<>(eventsService.getEvent(id), HttpStatus.OK);
    }*/

    @GetMapping(name = "/getAll", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ArrayList<EventsDTO>> getAllEvents(){
        return new ResponseEntity<>(eventsService.getAllEvents(), HttpStatus.OK);
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<EventsDTO> updateEvent(@PathVariable(value = "id") Long id,
            @RequestBody EventsDTO event) {
        return new ResponseEntity<>(eventsService.updateEvent(id, event), HttpStatus.OK);
    }

    
}
