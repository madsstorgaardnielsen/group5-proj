package com.gruppe5.fbcmanager.domain.users;

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
@RequestMapping(value = "/users")
@CrossOrigin(origins = "*", maxAge = 3600) // FOR TESTING DONT DO THIS IN PROD
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO user) {
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserDTO> getUser(@PathVariable(value = "id") long id) {
        return new ResponseEntity<>(userService.getUser(id), HttpStatus.OK);
    }

    @GetMapping(name = "/getAll", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ArrayList<UserDTO>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserDTO> updateUser(@PathVariable(value = "id") Long id,
            @RequestBody UserDTO user) {
        return new ResponseEntity<>(userService.updateUser(id, user), HttpStatus.OK);
    }

    @GetMapping(params = "firstname", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ArrayList<UserDTO>> getAllByFirstName(@PathParam("firstname") String firstname) {
        return new ResponseEntity<>(userService.getAllUsersByFirstname(firstname), HttpStatus.OK);
    }

    @GetMapping(params = "lastname", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ArrayList<UserDTO>> getAllByLastName(@PathParam("lastname") String lastname) {
        return new ResponseEntity<>(userService.getAllUsersByLastname(lastname), HttpStatus.OK);
    }

    @GetMapping(params = "isactive", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ArrayList<UserDTO>> getByIsactive(@PathParam("isactive") boolean isactive) {
        return new ResponseEntity<>(userService.getAllByIsactive(isactive), HttpStatus.OK);
    }

    @GetMapping(params = "phone", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserDTO> getUserByPhone(@PathParam("phone") int phone) {
        return new ResponseEntity<>(userService.getUserByPhone(phone), HttpStatus.OK);
    }

    @GetMapping(params = "email", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserDTO> getUserByEmail(@PathParam("email") String email) {

        return new ResponseEntity<>(userService.getUserByEmail(email), HttpStatus.OK);

    }
}