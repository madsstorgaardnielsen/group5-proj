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

    private AddressDTO address;

    private ContactInfoDTO contactInfos;

    private String firstname;

    private String lastname;

    private String isactive;

    private String team;

    private String usertype;

    private LocalDate birthDate;

    private List<PractiseDTO> practices;

    public UserDTO(long userid, AddressDTO address, ContactInfoDTO contactInfos, String firstname, String lastname,
            String isactive, String team, String usertype, LocalDate birthDate, List<PractiseDTO> practices) {
        this.userid = userid;
        this.address = address;
        this.contactInfos = contactInfos;
        this.firstname = firstname;
        this.lastname = lastname;
        this.isactive = isactive;
        this.team = team;
        this.usertype = usertype;
        this.birthDate = birthDate;
        this.practices = practices;
    }

    public UserDTO(UserEntity userEntity) {
        this.userid = userEntity.getId();
        this.address = new AddressDTO(userEntity.getAddress());
        // this.contactInfos = new ContactInfoDTO(userEntity.getContactInfos());
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
        // entity.setAddress(this.address.toEntity());
        entity.setBirthDate(this.birthDate);
        // entity.setContactInfos(this.contactInfos.toEntity());
        entity.setFirstname(this.firstname);
        entity.setId(this.userid);
        entity.setIsactive(this.isactive);
        entity.setLastname(this.lastname);
        // entity.setPractices(this.practices);
        entity.setTeam(team);
        entity.setUsertype(usertype);
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


    public AddressDTO getAddress() {
        return address;
    }

    public void setAddress(AddressDTO address) {
        this.address = address;
    }

    public ContactInfoDTO getContactInfos() {
        return contactInfos;
    }

    public void setContactInfos(ContactInfoDTO contactInfos) {
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

    @Override
    public String toString() {
        return "UserDTO [address=" + address + ", birthDate=" + birthDate + ", contactInfos=" + contactInfos
                + ", firstname=" + firstname + ", isactive=" + isactive + ", lastname=" + lastname + ", practices="
                + practices + ", team=" + team + ", userid=" + userid + ", usertype=" + usertype + "]";
    }
}

