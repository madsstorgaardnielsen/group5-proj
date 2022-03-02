package com.gruppe5.fbcmanager.controllers;


import com.gruppe5.fbcmanager.dtos.UserDTO;
import com.gruppe5.fbcmanager.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/users")
@CrossOrigin("*") // FOR TESTING DONT DO THIS IN PROD
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<UserDTO> createUser(@RequestBody final UserDTO user) {
        System.out.println("Created user -> " +user.toString());
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserDTO> getVehicle(@PathVariable(value = "id") long id) {
        return new ResponseEntity<>(userService.getUser(id), HttpStatus.OK);
    }

    // @PutMapping(path = "/person")
    // public @ResponseBody String updateUser(@RequestBody UserDTO p) {

    // // var person = userRepository.findById(p.getId());
    // // if (!person.isPresent()) {
    // // throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "user not
    // found");
    // // }
    // // User updated = person.get();
    // // updated.setFirstname(p.getFirstname());
    // // updated.setLastname(p.getLastname());
    // // updated.setTeam(p.getTeam());
    // // updated.setIsactive(p.getIsactive());
    // // updated.setUsertype(p.getUsertype());
    // // userRepository.save(updated);
    // return "Updated";
    // }

    // @GetMapping(path = "/person/{id}")
    // public @ResponseBody User getUser(@PathVariable("id") Integer id) {
    // if (!userRepository.findById(id).isPresent()) {
    // throw new ResponseStatusException(
    // HttpStatus.NOT_FOUND, "user not found");
    // }
    // return userRepository.findById(id).get();
    // }

    // @GetMapping(path = "/all")
    // public @ResponseBody Iterable<User> getAllUsers() {
    // return userRepository.findAll();
    // }

    // @GetMapping(path = "/searchuser")
    // public @ResponseBody Iterable<User> searchUser(@RequestParam(name = "query")
    // String query) {
    // Set<User> result = new HashSet<>();
    // result.addAll(userRepository.findByFirstnameStartsWith(query));
    // result.addAll(userRepository.findByLastnameStartsWith(query));
    // // result.addAll(userRepository.findByTeamContaining(query));
    // List<User> searchResults = new ArrayList<>(result);
    // return searchResults;
    // }

    // @GetMapping(path = "/all/{active}")
    // public @ResponseBody Iterable<User>
    // getUsersByActivityStatus(@PathVariable("active") String active) {
    // System.out.println(active);
    // System.out.println(userRepository.findByIsactive(active + ""));
    // return userRepository.findByIsactive(active + "");
    // }

    // @DeleteMapping(path = "/person/{id}")
    // public @ResponseBody String deleteUser(@PathVariable("id") Integer id) {
    // System.out.println(id);

    // userRepository.deleteById(id);
    // return "Deleted";
    // }
}