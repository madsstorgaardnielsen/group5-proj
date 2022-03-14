package com.gruppe5.fbcmanager.services;

import java.util.ArrayList;

import javax.persistence.EntityNotFoundException;

import com.gruppe5.fbcmanager.dtos.TrainingDTO;
import com.gruppe5.fbcmanager.repositories.TrainingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TrainingService {

    @Autowired
    TrainingRepository trainingRepository;

    public ArrayList<TrainingDTO> getAllTrainings() {
        var users = new ArrayList<TrainingDTO>();

        var entities = trainingRepository.findAll();

        if (entities.size() > 0) {

                for (var enitity : entities) {
                        users.add(new TrainingDTO(enitity));
                }

                return users;
        } else {
                throw new EntityNotFoundException("No trainings found");
        }
}
    

    
}
