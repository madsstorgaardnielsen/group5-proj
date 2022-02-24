package com.gruppe5.fbcmanager.database.models;

import javax.persistence.*;


@Entity
@Table(name = "contactinfos")
public class ContactInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable=false)
    private Long id;

    @OneToOne(optional = false,cascade = CascadeType.PERSIST)
    private User user;

    @Column(nullable=false)
    private String phone;
    
    @Column(nullable=false)
    private String email;
    public ContactInfo() {
    }
    public ContactInfo(User user, String phone, String email) {
        this.user = user;
        this.phone = phone;
        this.email = email;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}