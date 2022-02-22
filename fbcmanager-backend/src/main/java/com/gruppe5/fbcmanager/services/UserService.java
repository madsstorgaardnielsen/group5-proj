// package com.gruppe5.fbcmanager.services;

// import com.gruppe5.fbcmanager.database.models.User;
// import com.gruppe5.fbcmanager.database.repository.UserRepository;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// @Service
// public class UserService {

//     @Autowired
//     private UserRepository userRepository;

//     @Transactional
//     public void addUser(User user) {
//         var newUser = User.builder()
//                 .firstname(user.getFirstname())
//                 .lastname(user.getLastname())
//                 .team(user.getTeam())
//                 .usertype(user.getUsertype())
//                 .isactive(user.getIsactive())
//                 .build();
//         userRepository.save(newUser);
//     }
// }
