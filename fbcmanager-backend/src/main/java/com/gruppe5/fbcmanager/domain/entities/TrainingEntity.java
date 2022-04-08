package com.gruppe5.fbcmanager.domain.entities;

import javax.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "trainings")
public class TrainingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long trainingid;

    // @Column(nullable = false)
    private String team;

    // @Column(nullable = false)
    private String location;

    // @Column(nullable = false)
    private Integer maxParticipants;

    // @Column(nullable = false)
    private LocalDate date;

    // @Column(nullable = false)
    private LocalTime timeStart;

    // // @Column(nullable = false)
    private LocalTime timeEnd;

    private String trainers;

    //@ManyToMany(fetch = FetchType.EAGER)
    //@JoinTable(name = "user_practises", joinColumns = @JoinColumn(name = "userid"), inverseJoinColumns = @JoinColumn(name = "practiseid"))
    //private Set<UserEntity> participants;



    public TrainingEntity(String location, LocalDate date, LocalTime timeStart, LocalTime timeEnd,
            Set<UserEntity> participants) {
        this.location = location;
        this.date = date;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        //this.participants = participants;
    }

    public TrainingEntity(String location, Integer maxParticipants, LocalDate date, LocalTime timeStart,
            LocalTime timeEnd) {
        this.location = location;
        this.maxParticipants = maxParticipants;
        this.date = date;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getTrainers() {
        return trainers;
    }

    public void setTrainers(String trainers) {
        this.trainers = trainers;
    }


    public TrainingEntity() {
    }

    public Long getId() {
        return trainingid;
    }

    public void setId(Long trainingid) {
        this.trainingid = trainingid;
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

    public Integer getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(Integer maxParticipants) {
        this.maxParticipants = maxParticipants;
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

    public Long getPractiseid() {
        return trainingid;
    }

    public void setPractiseid(Long practiseid) {
        this.trainingid = practiseid;
    }
/*
    public Set<UserEntity> getParticipant() {
        return participants;
    }

    public void setParticipant(Set<UserEntity> participants) {
        this.participants = participants;
    }
    

    @Override
    public String toString() {
        return "[ id->"+practiseid+" participants->"+participants+"]";
    }

    */
}