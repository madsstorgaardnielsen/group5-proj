package com.gruppe5.fbcmanager.domain.dtos;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.gruppe5.fbcmanager.domain.entities.UserEntity;

import org.hibernate.validator.constraints.Length;
import org.springframework.boot.context.properties.bind.DefaultValue;

/**
 * A class used for transfering user data
 * the class consists of a
 * - UserDTO holding user information
 */

public class UserDTO implements Serializable {
    private static final long serialVersionUID = -3304734256617027874L;

    private long userid;

    // @Size(min = 2, max = 25, message = "Team name length should be 2 - 25
    // characters")
    private String street;

    // @Size(min = 4, max = 4, message = "Zipcode must have length 4")
    @NotNull
    private String zipcode;

    // @Size(min = 2, max = 25, message = "City length should be 2 - 255
    // characters")
    private String city;

    // @Pattern(regexp = "^[0-9]{8}$")
    private int phone;

    // @Email(message = "Error in email syntax")
    private String email;

    // @Size(min = 2, max = 25, message = "First name length should be 2 - 25
    // characters")
    private String firstname;

    // @Size(min = 2, max = 25, message = "Last name length should be 2 - 25
    // characters")
    private String lastname;

    // @Size(message = "Is active has to be true or false")
    private boolean isactive;

    // @Size(min = 2, max = 25, message = "Team name length should be 2 - 25
    // characters")
    private String team;

    // @Digits(integer = 1, fraction = 0, message = "The user has to have a type")
    private int usertype;

    private LocalDate birthDate;

    private List<PractiseDTO> practices;

    public UserDTO(long userid, String street, String zipcode, String city, int phone, String email, String firstname,
            String lastname,
            boolean isactive, String team, int usertype, LocalDate birthDate, List<PractiseDTO> practices) {
        this.userid = userid;
        this.phone = phone;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.isactive = isactive;
        this.team = team;
        this.usertype = usertype;
        this.birthDate = birthDate;
        this.practices = practices;
        this.street = street;
        this.city = city;
        this.zipcode = zipcode;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public UserDTO(UserEntity userEntity) {
        this.userid = userEntity.getId();
        this.email = userEntity.getEmail();
        this.phone = userEntity.getPhone();
        this.city = userEntity.getCity();
        this.street = userEntity.getStreet();
        this.zipcode = userEntity.getZipcode();
        this.firstname = userEntity.getFirstname();
        this.lastname = userEntity.getLastname();
        this.isactive = userEntity.getIsactive();
        this.team = userEntity.getTeam();
        this.usertype = userEntity.getUsertype();
        this.birthDate = userEntity.getBirthDate();
    }

    public UserEntity toEntity() {
        UserEntity entity = new UserEntity();
        entity.setStreet(this.street);
        entity.setCity(this.city);
        entity.setZipcode(this.zipcode);
        entity.setPhone(this.phone);
        entity.setEmail(this.email);
        entity.setBirthDate(this.birthDate);
        entity.setFirstname(this.firstname);
        entity.setId(this.userid);
        entity.setIsactive(this.isactive);
        entity.setLastname(this.lastname);
        entity.setTeam(this.team);
        entity.setUsertype(this.usertype);
        return entity;
    }

    public UserDTO() {
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

    public long getUserid() {
        return userid;
    }

    public void setUserid(long userid) {
        this.userid = userid;
    }

    public List<PractiseDTO> getPractices() {
        return practices;
    }

    public void setPractices(List<PractiseDTO> practices) {
        this.practices = practices;
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

    @Override
    public String toString() {
        return "UserDTO [birthDate=" + birthDate + ", city=" + city + ", email=" + email + ", firstname=" + firstname
                + ", isactive=" + isactive + ", lastname=" + lastname + ", phone=" + phone + ", practices=" + practices
                + ", street=" + street + ", team=" + team + ", userid=" + userid + ", usertype=" + usertype
                + ", zipcode=" + zipcode + "]";
    }
}
