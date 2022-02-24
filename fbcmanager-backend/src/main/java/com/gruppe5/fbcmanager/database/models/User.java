package com.gruppe5.fbcmanager.database.models;

import org.hibernate.Hibernate;

import javax.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "users") // user is a reserved word in sql, we circumvent this by giving the table a
                       // custom name

public class User {
    @Id
    @Column(nullable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER, mappedBy = "user", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private Address address;

    @OneToOne(fetch = FetchType.EAGER, mappedBy = "user", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private ContactInfo contactInfos;

    // @Column(name = "firstname", nullable = false)
    @Column(nullable=false)
    private String firstname;

    // @Column(name = "lastname", nullable = false)
    @Column(nullable=false)
    private String lastname;

    // @Column(name = "isactive", nullable = false)
    @Column(nullable=false)
    private String isactive;

    // @Column(name = "team", nullable = true)
    @Column(nullable=false)
    private String team;

    // @Column(name = "usertype", nullable = false)
    @Column(nullable=false)
    private String usertype;

    // @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    // @PrimaryKeyJoinColumn
    // private ContactInfo contactInfo;

    // @OneToMany(mappedBy = "users")
    // private Set<Practice> practices;

    public User() {
    }

    public User(String firstname, String lastname, String isactive,
            String team, String usertype) {

        this.firstname = firstname;
        this.lastname = lastname;
        this.isactive = isactive;
        this.team = team;
        this.usertype = usertype;
    }

    public User(String firstname, String lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o))
            return false;
        User user = (User) o;
        return id != null && Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public ContactInfo getContactInfos() {
        return contactInfos;
    }

    public void setContactInfos(ContactInfo contactInfos) {
        this.contactInfos = contactInfos;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getIsactive() {
        return isactive;
    }

    public void setIsactive(String isactive) {
        this.isactive = isactive;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getUsertype() {
        return usertype;
    }

    public void setUsertype(String usertype) {
        this.usertype = usertype;
    }
}