package com.gruppe5.fbcmanager.entities;

import org.hibernate.Hibernate;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.Digits;

import java.time.LocalDate;
import java.util.Objects;
import java.util.Set;

@Entity
@DynamicUpdate
@Table(name = "users") // user is a reserved word in sql, we circumvent this by giving the table a
                       // custom name

public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userid;

    @ManyToMany(mappedBy = "participants", fetch = FetchType.EAGER)
    private Set<PractiseEntity> practises;

    @Column(nullable = false)
    private String street;

    @Column(nullable = false)
    
    private String zipcode;

    @Column(nullable = false)
    private String city;

    // @Column(unique = true, nullable = false)
    @Column(nullable = false)
    private int phone;

    // @Column(unique = true,nullable = false)
    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String firstname;

    @Column(nullable = false)
    private String lastname;

    @Column(nullable = false)
    private boolean isactive;

    // @Column(nullable = false)
    private String team;

    @Column(nullable = false)
    private int usertype;

    //@Column(nullable = false)
    private LocalDate birthDate;

    public UserEntity(String street, String zipcode, String city, int phone, String email, String firstname,
            String lastname, boolean isactive, String team, int usertype, LocalDate birthDate) {
        this.street = street;
        this.zipcode = zipcode;
        this.city = city;
        this.phone = phone;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.isactive = isactive;
        this.team = team;
        this.usertype = usertype;
        this.birthDate = birthDate;
    }

    public UserEntity() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o))
            return false;
        UserEntity user = (UserEntity) o;
        return userid != null && Objects.equals(userid, user.userid);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
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

    public boolean getIsactive() {
        return isactive;
    }

    public void setIsactive(boolean isactive) {
        this.isactive = isactive;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public int getUsertype() {
        return usertype;
    }

    public void setUsertype(int usertype) {
        this.usertype = usertype;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Set<PractiseEntity> getPractises() {
        return practises;
    }

    public void setPractises(Set<PractiseEntity> practises) {
        this.practises = practises;
    }

    @Override
    public String toString() {
        return "UserEntity [birthDate=" + birthDate + ", city=" + city + ", email=" + email + ", firstname=" + firstname
                + ", isactive=" + isactive + ", lastname=" + lastname + ", phone=" + phone + ", practises=" + practises
                + ", street=" + street + ", team=" + team + ", userid=" + userid + ", usertype=" + usertype
                + ", zipcode=" + zipcode + "]";
    }

}