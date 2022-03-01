package com.gruppe5.fbcmanager.dtos;

import java.io.Serializable;

import com.gruppe5.fbcmanager.entities.ContactInfoEntity;

public class ContactInfoDTO implements Serializable{
    private static final long serialVersionUID = -3304734256617027874L;
    private long id;

    private String phone;

    private String email;

    public ContactInfoEntity toEntity() {
        ContactInfoEntity entity = new ContactInfoEntity();
        entity.setId(this.id);
        entity.setEmail(this.email);
        entity.setPhone(this.phone);
        return entity;

    }

    public ContactInfoDTO() {
    }

    public ContactInfoDTO(String phone, String email) {
        this.phone = phone;
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public ContactInfoDTO(ContactInfoEntity entity) {
        this.id = entity.getId();
        this.phone = entity.getPhone();
        this.email = entity.getEmail();
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
