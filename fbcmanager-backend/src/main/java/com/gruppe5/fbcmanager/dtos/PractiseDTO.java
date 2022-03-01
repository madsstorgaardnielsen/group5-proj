package com.gruppe5.fbcmanager.dtos;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import com.gruppe5.fbcmanager.entities.PractiseEntity;
import com.gruppe5.fbcmanager.entities.UserEntity;

public class PractiseDTO implements Serializable{

    private static final long serialVersionUID = -3304734256617027874L;
    
    private Long id;

    private List<UserDTO> participants;

    private String team;

    private String location;

    private int maxParticipants;

    private LocalDate date;

    private LocalTime timeStart;

    private LocalTime timeEnd;

    private List<UserDTO> trainer;

    public PractiseEntity toEntity(){
        PractiseEntity entity = new PractiseEntity();
        entity.setId(this.id);
        entity.setDate(this.date);
        entity.setLocation(this.location);
        entity.setMaxParticipants(this.maxParticipants);
        // entity.setParticipants(this.participants);
        entity.setTeam(this.team);
        entity.setTimeEnd(this.timeEnd);
        entity.setTimeStart(this.timeStart);
        // entity.setTrainers(this.trainer);
        return entity;
    }

    public PractiseDTO(Long id, List<UserEntity> participants, String team, String location, int maxParticipants,
            LocalDate date, LocalTime timeStart, LocalTime timeEnd, List<UserEntity> trainer) {
        this.id = id;
        // this.participants = participants;
        this.team = team;
        this.location = location;
        this.maxParticipants = maxParticipants;
        this.date = date;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        // this.trainer = trainer;
    }

    public PractiseDTO() {
    }

    
    // public static List<PractiseDTO> convertToListOfPractiseDTO(List<PractiseEntity> entities) {
    //     return entities.stream()
    //             .map(e -> new PractiseDTO(e.getId(), e.getParticipants(), e.getTeam(), e.getLocation(),
    //                     e.getMaxParticipants(), e.getDate(), e.getTimeStart(), e.getTimeEnd(), e.getTrainers()))
    //             .collect(Collectors.toList());
    // }

    // public static List<PractiseEntity> convertToListOfPractiseEntity(List<PractiseDTO> dtos) {
    //     return dtos.stream()
    //             .map(e -> new PractiseEntity(e.getId(), e.getParticipants(), e.getTeam(), e.getLocation(),
    //                     e.getMaxParticipants(), e.getDate(), e.getTimeStart(), e.getTimeEnd(), e.getTrainers()))
    //             .collect(Collectors.toList());
    // }

    public PractiseDTO(PractiseEntity entity) {
        this.id = entity.getId();
        // this.participants = entity.getParticipants();
        this.team = entity.getTeam();
        this.location = entity.getLocation();
        this.maxParticipants = entity.getMaxParticipants();
        this.date = entity.getDate();
        this.timeStart = entity.getTimeStart();
        this.timeEnd = entity.getTimeEnd();
        // this.trainer = entity.getTrainers();
    }

    public PractiseDTO(String location, int maxParticipants, LocalDate date, LocalTime timeStart,
            LocalTime timeEnd) {
        this.location = location;
        this.maxParticipants = maxParticipants;
        this.date = date;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<UserDTO> getParticipants() {
        return participants;
    }

    public void setParticipants(List<UserDTO> participants) {
        this.participants = participants;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(int maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(LocalTime timeStart) {
        this.timeStart = timeStart;
    }

    public LocalTime getTimeEnd() {
        return timeEnd;
    }

    public void setTimeEnd(LocalTime timeEnd) {
        this.timeEnd = timeEnd;
    }

    public List<UserDTO> getTrainer() {
        return trainer;
    }

    public void setTrainer(List<UserDTO> trainer) {
        this.trainer = trainer;
    }

}
