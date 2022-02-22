package com.gruppe5.fbcmanager.database.models;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userid", nullable = false)
    private Integer userid;

    
    @Column(name = "firstname", nullable = false)
    private String firstname;

    @Column(name = "lastname", nullable = false)
    private String lastname;

    @Column(name = "isactive", nullable = false)
    private String isactive;

    @Column(name = "team", nullable = true)
    private String team;

    @Column(name = "usertype", nullable = false)
    private String usertype;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o))
            return false;
        User user = (User) o;
        return userid != null && Objects.equals(userid, user.userid);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}