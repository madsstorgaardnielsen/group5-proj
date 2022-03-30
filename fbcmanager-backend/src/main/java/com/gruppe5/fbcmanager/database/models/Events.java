/*
package com.gruppe5.fbcmanager.database.models;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "events")
public class Events {

    @Id
    // @Column(name = "practiceid", nullable = false)
    private Long id;

    // @OneToMany(mappedBy = "practise", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @ManyToOne(targetEntity = User.class)
    private List<User> participants;

    private String type;

    private String description;

    private LocalDateTime date;

    private double price;


    public Event(String type, String description, LocalDateTime date, double price){
        this.type = type;
        this.description = description;
        this.date = date;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<User> getParticipants() {
        return participants;
    }

    public void setParticipants(List<User> participants) {
        this.participants = participants;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }


    public List<User> getParticipants() {
        return participants;
    }

    public void setParticipants(List<User> participants) {
        this.participants = participants;
    }



}*/
