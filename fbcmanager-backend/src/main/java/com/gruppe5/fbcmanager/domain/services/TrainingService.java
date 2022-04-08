package com.gruppe5.fbcmanager.domain.services;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;

import javax.persistence.EntityNotFoundException;

import com.gruppe5.fbcmanager.domain.dtos.TrainingDTO;
import com.gruppe5.fbcmanager.domain.entities.TrainingEntity;
import com.gruppe5.fbcmanager.domain.repositories.TrainingRepository;

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

    public TrainingDTO createTraining(TrainingDTO training) { //Todo mangler checks
        System.out.println("test i service");
        TrainingEntity trainingEntity = new TrainingEntity();

         trainingEntity.setDate(training.getDate());
         trainingEntity.setLocation(training.getLocation());
         trainingEntity.setTimeEnd(training.getTimeEnd());
         trainingEntity.setTimeStart(training.getTimeStart());
         trainingEntity.setTrainers(training.getTrainers());
         trainingEntity.setTeam(training.getTeam());

        return new TrainingDTO(trainingRepository.save(trainingEntity));

    }
}
