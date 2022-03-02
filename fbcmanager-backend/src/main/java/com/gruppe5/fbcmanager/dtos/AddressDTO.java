package com.gruppe5.fbcmanager.dtos;

import java.io.Serializable;

import com.gruppe5.fbcmanager.entities.AddressEntity;

public class AddressDTO implements Serializable {
    private static final long serialVersionUID = -3304734256617027874L;

    UserDTO userDTO;
    
    private Long id;

    private String street;

    private String zipcode;

    private String city;

    public AddressEntity toEntity() {
        AddressEntity entity = new AddressEntity();
        entity.setId(this.id);
        entity.setUser(this.userDTO.toEntity());
        entity.setCity(this.city);
        entity.setZipcode(this.zipcode);
        entity.setStreet(this.street);
        return entity;
    }

    public AddressDTO() {
    }

    public AddressDTO(AddressEntity entity) {
        this.setId(entity.getId());
        this.city = entity.getCity();
        this.street = entity.getStreet();
        this.zipcode = entity.getZipcode();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AddressDTO(UserDTO userDTO, String street, String zipcode, String city) {
        this.userDTO = userDTO;
        this.street = street;
        this.zipcode = zipcode;
        this.city = city;
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



    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    @Override
    public String toString() {
        return "AddressDTO [city=" + city + ", id=" + id + ", street=" + street + ", userDTO=" + userDTO + ", zipcode="
                + zipcode + "]";
    }
}
