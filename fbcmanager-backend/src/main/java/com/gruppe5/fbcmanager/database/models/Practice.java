// package com.gruppe5.fbcmanager.database.models;

// import lombok.*;
// import org.hibernate.Hibernate;

// import javax.persistence.*;

// import java.time.LocalDate;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.Objects;

// @Getter
// @Setter
// @ToString
// @NoArgsConstructor
// @AllArgsConstructor
// @Builder
// @Entity
// public class Practice {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     // @Column(name = "practiceid", nullable = false)
//     private Integer practiceid;

//     // @Column(name = "team", nullable = false)
//     private String team;

//     // @Column(name = "location", nullable = false)
//     private String location;

//     // @Column(name = "maxparticipants", nullable = false)
//     private Integer maxParticipants;

//     // @Column(name = "timestart", nullable = false)
//     private LocalDate timeStart;

//     // @Column(name = "timeend", nullable = false)
//     private LocalDate timeEnd;

//     @ManyToOne(optional = false)
//     // @JoinColumn(name = "userid")
//     // @Column(name = "trainerid", nullable = false)
//     private User trainer;

//     @ManyToOne(optional = true)
//     private List<User> participants = new ArrayList<>();
// }

// @Entity
// @Table
// public class ContactInfo {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.PERSIST)
//     private User user;

//     private String phone;
//     private String email;
//     public ContactInfo() {
//     }
//     public ContactInfo(User user, String phone, String email) {
//         this.user = user;
//         this.phone = phone;
//         this.email = email;
//     }
//     public Long getId() {
//         return id;
//     }
//     public void setId(Long id) {
//         this.id = id;
//     }
//     public User getUser() {
//         return user;
//     }
//     public void setUser(User user) {
//         this.user = user;
//     }
//     public String getPhone() {
//         return phone;
//     }
//     public void setPhone(String phone) {
//         this.phone = phone;
//     }
//     public String getEmail() {
//         return email;
//     }
//     public void setEmail(String email) {
//         this.email = email;
//     }
// }