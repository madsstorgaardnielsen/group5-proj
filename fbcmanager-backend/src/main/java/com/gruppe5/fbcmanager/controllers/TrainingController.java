package com.gruppe5.fbcmanager.controllers;

import com.gruppe5.fbcmanager.services.TrainingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;

import javax.validation.Valid;
import javax.websocket.server.PathParam;

import com.gruppe5.fbcmanager.dtos.TrainingDTO;
import com.gruppe5.fbcmanager.dtos.UserDTO;
import com.gruppe5.fbcmanager.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(value = "/training")
@CrossOrigin("*") // FOR TESTING DONT DO THIS IN PROD

public class TrainingController{
    @Autowired
    TrainingService trainingService;

    @GetMapping(name = "getAll", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ArrayList<TrainingDTO>> getAllTrainings() {
        return new ResponseEntity<>(trainingService.getAllTrainings(), HttpStatus.OK);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<TrainingDTO> createTraining(@RequestBody TrainingDTO training) {
        System.out.println("test i controller");
        System.out.println("DTO" + training.toString());
        return new ResponseEntity<>(trainingService.createTraining(training), HttpStatus.CREATED);
    }

}

