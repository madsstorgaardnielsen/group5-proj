package com.gruppe5.fbcmanager.controllers;

import com.gruppe5.fbcmanager.database.models.Person;
import com.gruppe5.fbcmanager.database.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@Controller
@RequestMapping
@CrossOrigin("*") //FOR TESTING DONT DO THIS IN PROD
public class PersonController {
    @Autowired
    public PersonRepository personRepository;

    @PostMapping(path = "/add")
    public @ResponseBody
    String addNewUser(@RequestBody Person p) {
        System.out.println(p.getName());
        Person n = new Person();
        String name = p.getName();
        n.setName(name);
        personRepository.save(n);
        return "Saved";
    }

    @GetMapping(path = "/person/{id}")
    public @ResponseBody
    Person getUser(@PathVariable("id") Integer id) {
        if (!personRepository.findById(id).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "user not found"
            );
        }
        return personRepository.findById(id).get();
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    Iterable<Person> getAllUsers() {
        return personRepository.findAll();
    }

    @PutMapping(path = "/person")
    public @ResponseBody
    String updateUser(@RequestBody Person p) {

        var person = personRepository.findById(p.getId());
        if (!person.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "user not found");
        }
        Person updated = person.get();
        updated.setName(p.getName());
        personRepository.save(updated);
        return "Updated";
    }

    @DeleteMapping(path = "/person/{id}")
    public @ResponseBody
    String deleteUser(@PathVariable("id") Integer id) {
        System.out.println(id);

        personRepository.deleteById(id);
        return "Deleted";
    }
}