package com.gruppe5.fbcmanager.domain.events;

import org.hibernate.Hibernate;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.gruppe5.fbcmanager.domain.users.UserEntity;
import com.gruppe5.fbcmanager.domain.roles.RoleEntity;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@DynamicUpdate
@Table(name = "events", uniqueConstraints = {
    @UniqueConstraint(columnNames = "eventid")
}) 
public class EventsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventid;

    @ManyToMany(fetch = FetchType.EAGER)
    //@JoinTable(name = "user_practises", joinColumns = @JoinColumn(name = "userid"), inverseJoinColumns = @JoinColumn(name = "practiseid"))
    private Set<UserEntity> participants;

    private String type;
    
    private String description;

    private Date date;

    private Double price;

    
    public EventsEntity(String type, String description, Date date, Double price){

        this.type = type;
        this.description = description;
        this.date = date;
        this.price = price;

    }

    public EventsEntity(){
        
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o))
            return false;
        EventsEntity event = (EventsEntity) o;
        return eventid != null && Objects.equals(eventid, event.eventid);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    } 

    public Long getId(){
        return eventid;
    }

    public void setId(Long id){
        this.eventid = id;
    }

    public Set<UserEntity> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<UserEntity> participants) {
        this.participants = participants;
    }

    public String getType(){
        return type;
    }

    public void setType(String type){
        this.type = type;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public Date getDate(){
        return date;
    }

    public void setDate(Date date){
        this.date = date;
    }

    public Double getPrice(){
        return price;
    }

    public void setPrice(Double price){
        this.price = price;
    }

}


