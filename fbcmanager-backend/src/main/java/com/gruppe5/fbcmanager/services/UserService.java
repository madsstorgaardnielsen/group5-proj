package com.gruppe5.fbcmanager.services;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

import javax.transaction.Transactional;

import com.gruppe5.fbcmanager.dtos.UserDTO;
import com.gruppe5.fbcmanager.entities.PractiseEntity;
import com.gruppe5.fbcmanager.entities.UserEntity;
import com.gruppe5.fbcmanager.repositories.PractiseRepository;
import com.gruppe5.fbcmanager.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

        @Autowired
        public UserRepository userRepository;

        @Autowired
        public PractiseRepository practiseRepository;



        @Transactional
        public UserDTO createUser(UserDTO user) {
                UserEntity newUser = new UserEntity();

                newUser.setFirstname(user.getFirstname());
                newUser.setLastname(user.getLastname());
                // newUser.setAddress(user.getAddress().toEntity());
                // newUser.setContactInfos(user.getContactInfos().toEntity());
                newUser.setBirthDate(user.getBirthDate());
                newUser.setIsactive(user.getIsactive());
                newUser.setTeam(user.getTeam());
                newUser.setUsertype(user.getUsertype());

                return new UserDTO(userRepository.save(newUser));

        }

        // @Transactional
        // public UserDTO updateUser(long id, UserDTO u) {

        // if (userRepository.findById(id).isPresent()) {
        // UserDTO user = userRepository.findById(id).get();
        // user.setAddress(u.getAddress());
        // user.setBirthDate(u.getBirthDate());
        // user.setContactInfos(u.getContactInfos());
        // user.setFirstname(u.getFirstname());
        // user.setIsactive(u.getIsactive());
        // user.setLastname(u.getLastname());
        // user.setTeam(u.getTeam());
        // user.setUsertype(u.getUsertype());
        // return userRepository.save(user);

        // }
        // return null;

        // }

        public UserDTO getUser(long id) {
                if (userRepository.findById(id).isPresent()) {
                        return new UserDTO(userRepository.findById(id).get());

                }
                return null;
        }
}
