package com.gruppe5.fbcmanager.controllers;

import com.gruppe5.fbcmanager.database.models.User;
import com.gruppe5.fbcmanager.database.repository.UserRepository;

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
public class UserController {
    @Autowired
    public UserRepository userRepository;

    @PostMapping(path = "/add")
    public @ResponseBody
    String addNewUser(@RequestBody User p) {
        var newUser = User.builder()
        .first_name(p.getFirst_name())
        .last_name(p.getLast_name())
        .team(p.getTeam())
        .user_type(p.getUser_type())
        .is_active(p.getIs_active())
        .build();
        userRepository.save(newUser);
        return "Saved";
    }

    @GetMapping(path = "/person/{id}")
    public @ResponseBody
    User getUser(@PathVariable("id") Integer id) {
        if (!userRepository.findById(id).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "user not found"
            );
        }
        return userRepository.findById(id).get();
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping(path = "/person")
    public @ResponseBody
    String updateUser(@RequestBody User p) {

        var person = userRepository.findById(p.getUser_id());
        if (!person.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "user not found");
        }
        User updated = person.get();
        updated.setFirst_name(p.getFirst_name());
        updated.setLast_name(p.getLast_name());
        updated.setTeam(p.getTeam());
        updated.setIs_active(p.getIs_active());
        updated.setUser_type(p.getUser_type());
        userRepository.save(updated);
        return "Updated";
    }

    @DeleteMapping(path = "/person/{id}")
    public @ResponseBody
    String deleteUser(@PathVariable("id") Integer id) {
        System.out.println(id);

        userRepository.deleteById(id);
        return "Deleted";
    }
}