package com.gruppe5.fbcmanager.controllers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.gruppe5.fbcmanager.database.models.User;
import com.gruppe5.fbcmanager.database.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@Controller
@RequestMapping
@CrossOrigin("*") // FOR TESTING DONT DO THIS IN PROD
public class UserController {
    @Autowired
    public UserRepository userRepository;
    // private UserService userService;

    @PostMapping(path = "/add")
    public @ResponseBody String addNewUser(@RequestBody User user) {
        System.out.println(user);

        // // userService.addUser(user);
        // var newUser = User.builder()
        //         .firstname(user.getFirstname())
        //         .lastname(user.getLastname())
        //         .team(user.getTeam())
        //         .usertype(user.getUsertype())
        //         .isactive(user.getIsactive())
        //         .build();
        // userRepository.save(newUser);
        return "Saved";
    }

    // @GetMapping(path = "/person/{id}")
    // public @ResponseBody User getUser(@PathVariable("id") Integer id) {
    //     if (!userRepository.findById(id).isPresent()) {
    //         throw new ResponseStatusException(
    //                 HttpStatus.NOT_FOUND, "user not found");
    //     }
    //     return userRepository.findById(id).get();
    // }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping(path = "/searchuser")
    public @ResponseBody Iterable<User> searchUser(@RequestParam(name = "query") String query) {
        Set<User> result = new HashSet<>();
        result.addAll(userRepository.findByFirstnameStartsWith(query));
        result.addAll(userRepository.findByLastnameStartsWith(query));
        // result.addAll(userRepository.findByTeamContaining(query));
        List<User> searchResults = new ArrayList<>(result);
        return searchResults;
    }

    @GetMapping(path = "/all/{active}")
    public @ResponseBody Iterable<User> getUsersByActivityStatus(@PathVariable("active") String active) {
        System.out.println(active);
        System.out.println(userRepository.findByIsactive(active + ""));
        return userRepository.findByIsactive(active + "");
    }

    @PutMapping(path = "/person")
    public @ResponseBody String updateUser(@RequestBody User p) {

        // var person = userRepository.findById(p.getId());
        // if (!person.isPresent()) {
        //     throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "user not found");
        // }
        // User updated = person.get();
        // updated.setFirstname(p.getFirstname());
        // updated.setLastname(p.getLastname());
        // updated.setTeam(p.getTeam());
        // updated.setIsactive(p.getIsactive());
        // updated.setUsertype(p.getUsertype());
        // userRepository.save(updated);
        return "Updated";
    }

    // @DeleteMapping(path = "/person/{id}")
    // public @ResponseBody String deleteUser(@PathVariable("id") Integer id) {
    //     System.out.println(id);

    //     userRepository.deleteById(id);
    //     return "Deleted";
    // }
}