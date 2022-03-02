package com.gruppe5.fbcmanager.entities;

import javax.persistence.*;


@Entity
@Table(name = "contactinfos")
public class ContactInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable=false)
    private Long id;

    @OneToOne(optional = false,cascade = CascadeType.PERSIST)
    private UserEntity user;

    @Column(nullable=false)
    private String phone;
    
    @Column(nullable=false)
    private String email;
    public ContactInfoEntity() {
    }
    public ContactInfoEntity(UserEntity user, String phone, String email) {
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
    public UserEntity getUser() {
        return user;
    }
    public void setUser(UserEntity user) {
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
    @Override
    public String toString() {
        return "ContactInfoEntity [email=" + email + ", id=" + id + ", phone=" + phone + ", user=" + user + "]";
    }
}