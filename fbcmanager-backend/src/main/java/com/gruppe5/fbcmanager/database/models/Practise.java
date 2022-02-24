package com.gruppe5.fbcmanager.database.models;

import javax.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "practises")
public class Practise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @Column(name = "practiceid", nullable = false)
    private Long id;

    // @OneToMany(mappedBy = "practise", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @ManyToOne(targetEntity = User.class)
    private List<User> participants;

    // @Column(name = "team", nullable = false)
    private String team;

    // @Column(name = "location", nullable = false)
    private String location;

    // @Column(name = "maxparticipants", nullable = false)
    private Integer maxParticipants;

    // @Column(name = "timestart", nullable = false)
    private LocalDate date;

    // @Column(name = "timeend", nullable = false)

    private LocalTime timeStart;

    private LocalTime timeEnd;

    @ManyToOne(targetEntity = User.class)
    // // @JoinColumn(name = "userid")
    // // @Column(name = "trainerid", nullable = false)
    private List<User> trainer;



    public Practise(String team, String location, LocalDate date, LocalTime timeStart,
            LocalTime timeEnd) {
        this.team = team;
        this.location = location;
        this.setDate(date);
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Practise() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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


    // public User getTrainer() {
    //     return trainer;
    // }

    // public void setTrainer(User trainer) {
    //     this.trainer = trainer;
    // }

    
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

    public List<User> getParticipants() {
        return participants;
    }

    public void setParticipants(List<User> participants) {
        this.participants = participants;
    }

    public List<User> getTrainers() {
        return trainer;
    }

    public void setTrainers(List<User> trainer) {
        this.trainer = trainer;
    }



}

// @Entity
// @Table
// public class ContactInfo {
// @Id
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// private Long id;

// @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.PERSIST)
// private User user;

// private String phone;
// private String email;
// public ContactInfo() {
// }
// public ContactInfo(User user, String phone, String email) {
// this.user = user;
// this.phone = phone;
// this.email = email;
// }
// public Long getId() {
// return id;
// }
// public void setId(Long id) {
// this.id = id;
// }
// public User getUser() {
// return user;
// }
// public void setUser(User user) {
// this.user = user;
// }
// public String getPhone() {
// return phone;
// }
// public void setPhone(String phone) {
// this.phone = phone;
// }
// public String getEmail() {
// return email;
// }
// public void setEmail(String email) {
// this.email = email;
// }
// }