package com.gruppe5.fbcmanager.database.models;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "news")
public class News {

    @Column(nullable=false)
    private LocalDateTime date;

    @Column(nullable=false)
    private String header;

    @Column(nullable=false)
    private String description;


    public News (LocalDateTime date, String header, String description) {
        this.date = date;
        this.header = header;
        this.description = description;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


}
