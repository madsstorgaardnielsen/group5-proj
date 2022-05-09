package com.gruppe5.fbcmanager.domain.events;

import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.gruppe5.fbcmanager.domain.practises.PractiseDTO;
import com.gruppe5.fbcmanager.domain.users.UserDTO;

import org.hibernate.validator.constraints.Length;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.context.event.EventListenerFactory;

/**
 * A class used for transfering events data
 * the class consists of a
 * - EventsDTO holding events information
 */

public class EventsDTO implements Serializable{
    private static final long serialVersionUID = -3304734256617027874L;

    private long eventid;

    private String type;

    private String description;

    private Date date;

    private Double price;

    private List<UserDTO> participants;

    public EventsDTO(String type, String description, Date date, Double price, List<UserDTO> participants){
        this.type = type;
        this.description = description;
        this.date = date;
        this.price = price;
        this.participants = participants;
    }

    public EventsDTO(EventsEntity eventsEntity) {
        this.eventid = eventsEntity.getId();
        this.type = eventsEntity.getType();
        this.description = eventsEntity.getDescription();
        this.date = eventsEntity.getDate();
        this.price = eventsEntity.getPrice();
    }

    public EventsEntity toEntity() {
        EventsEntity entity = new EventsEntity();
        entity.setType(this.type);
        entity.setId(this.eventid);
        entity.setDescription(this.description);
        entity.setDate(this.date);
        entity.setPrice(this.price);

        return entity;
    }

    public List<UserDTO> getParticipants() {
        return participants;
    }

    public void setParticipants(List<UserDTO> participants) {
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

