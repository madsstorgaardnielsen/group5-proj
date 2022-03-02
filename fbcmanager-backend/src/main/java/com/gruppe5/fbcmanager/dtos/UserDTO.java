package com.gruppe5.fbcmanager.dtos;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.gruppe5.fbcmanager.entities.UserEntity;


/**A class used for transfering user data
 * the class consists of a 
 * - UserDTO holding user information
 * - AddressDTO holding address information
 * - ContactInfoDTO holding contact information
 */
public class UserDTO implements Serializable {
    private static final long serialVersionUID = -3304734256617027874L;
    
    private long userid;

    private String street;

    private String zipcode;

    private String city;

    private String phone;

    private String email;

    private String firstname;

    private String lastname;

    private String isactive;

    private String team;

    private String usertype;

    private LocalDate birthDate;



    private List<PractiseDTO> practices;

    public UserDTO(long userid, String street, String zipcode, String city, String phone, String email, String firstname, String lastname,
            String isactive, String team, String usertype, LocalDate birthDate, List<PractiseDTO> practices) {
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
        // this.practices = practices;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
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
        // this.practices = PractiseDTO.convertToListOfPractiseDTO(userEntity.getPractices());
    }

    public UserEntity toEntity(){
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
        // entity.setPractices(this.practices);
        return entity;
    }

    // public static List<UserDTO> convertToListOfUserDTO(List<UserEntity> entities) {

    //     return entities.stream()
    //             .map(e -> new UserDTO(e.getId(),e.getAddress(),e.getContactInfos(),e.getFirstname(),e.getLastname(),e.getIsactive(),e.getTeam(),e.getUsertype(),e.getBirthDate(),e.getPractices()))
    //             .collect(Collectors.toList());
    // }

    // public static List<UserEntity> convertToListOfUserEntity(List<UserDTO> dtos) {
    //     return dtos.stream()
    //             .map(e -> new UserEntity(e.getUserid(),e.getAddress(),e.getContactInfos(),e.getFirstname(),e.getLastname(),e.getIsactive(),e.getTeam(),e.getUsertype(),e.getBirthDate(),e.getPractices()))
    //             .collect(Collectors.toList());
    // }




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
}

