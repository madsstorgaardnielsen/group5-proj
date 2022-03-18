package com.gruppe5.fbcmanager.entities;

import javax.persistence.*;

import com.gruppe5.fbcmanager.models.ERole;
@Entity
@Table(name = "roles")
public class RoleEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private ERole name;
  public RoleEntity() {
  }
  public RoleEntity(ERole name) {
    this.name = name;
  }
  public Integer getId() {
    return id;
  }
  public void setId(Integer id) {
    this.id = id;
  }
  public ERole getName() {
    return name;
  }
  public void setName(ERole name) {
    this.name = name;
  }
}
