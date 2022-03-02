package com.gruppe5.fbcmanager.entities;

import org.hibernate.Hibernate;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;


import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
@DynamicUpdate
@Table(name = "users") // user is a reserved word in sql, we circumvent this by giving the table a
                       // custom name

public class UserEntity {
    @Id
    @Column(nullable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER, mappedBy = "user", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private AddressEntity address;

    @OneToOne(fetch = FetchType.EAGER, mappedBy = "user", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private ContactInfoEntity contactInfos;

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

    @Column(nullable = false)
    private LocalDate birthDate;

    @OneToMany()
    private List<PractiseEntity> practices;

    public UserEntity(String firstname, String lastname, String isactive, String team, String usertype,
            LocalDate birthDate) {
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

    public AddressEntity getAddress() {
        return address;
    }

    public void setAddress(AddressEntity address) {
        this.address = address;
    }

    public ContactInfoEntity getContactInfos() {
        return contactInfos;
    }

    public void setContactInfos(ContactInfoEntity contactInfos) {
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

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public List<PractiseEntity> getPractices() {
        return practices;
    }

    public void setPractices(List<PractiseEntity> practices) {
        this.practices = practices;
    }

    @Override
    public String toString() {
        return "UserEntity [address=" + address + ", birthDate=" + birthDate + ", contactInfos=" + contactInfos
                + ", firstname=" + firstname + ", id=" + id + ", isactive=" + isactive + ", lastname=" + lastname
                + ", practices=" + practices + ", team=" + team + ", usertype=" + usertype + "]";
    }
}