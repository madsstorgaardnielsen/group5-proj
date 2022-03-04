package com.gruppe5.fbcmanager.entities;

import javax.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Entity
@Table(name = "practises")
public class PractiseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long practiseid;

    // @Column(nullable = false)
    private String team;

    @Column(nullable = false)
    private String location;

    // @Column(nullable = false)
    private Integer maxParticipants;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime timeStart;

    @Column(nullable = false)
    private LocalTime timeEnd;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_practises", joinColumns = @JoinColumn(name = "userid"), inverseJoinColumns = @JoinColumn(name = "practiseid"))
    private Set<UserEntity> participants;



    public PractiseEntity(String location, LocalDate date, LocalTime timeStart, LocalTime timeEnd,
            Set<UserEntity> participants) {
        this.location = location;
        this.date = date;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.participants = participants;
    }

    public PractiseEntity(String location, Integer maxParticipants, LocalDate date, LocalTime timeStart,
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

    public PractiseEntity() {
    }

    public Long getId() {
        return practiseid;
    }

    public void setId(Long practiseid) {
        this.practiseid = practiseid;
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
        return practiseid;
    }

    public void setPractiseid(Long practiseid) {
        this.practiseid = practiseid;
    }

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

}