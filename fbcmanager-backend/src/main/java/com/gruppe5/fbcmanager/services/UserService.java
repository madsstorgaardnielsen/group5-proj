package com.gruppe5.fbcmanager.services;

import java.util.ArrayList;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import com.gruppe5.fbcmanager.dtos.UserDTO;
import com.gruppe5.fbcmanager.entities.UserEntity;
import com.gruppe5.fbcmanager.repositories.PractiseRepository;
import com.gruppe5.fbcmanager.repositories.UserRepository;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import lombok.var;

@Service
public class UserService {

        @Autowired
        public UserRepository userRepository;

        @Autowired
        public PractiseRepository practiseRepository;

        public UserDTO createUser(UserDTO user) {
                
                
                // if (userRepository.findByEmail(user.getEmail()) != null) {
                //         throw new EntityExistsException("User with email: " + user.getEmail() + " already exists");
                // }

                // else if (userRepository.findByPhone(user.getPhone()) != null) {
                //         throw new EntityExistsException("User with phone: " + user.getPhone() + " already exists");
                // } else {

                        UserEntity newUser = new UserEntity();
                        newUser.setStreet(user.getStreet());
                        newUser.setZipcode(user.getZipcode());
                        newUser.setCity(user.getCity());
                        newUser.setPhone(user.getPhone());
                        newUser.setEmail(user.getEmail());
                        newUser.setFirstname(user.getFirstname());
                        newUser.setLastname(user.getLastname());
                        newUser.setBirthDate(user.getBirthDate());
                        newUser.setIsactive(user.getIsactive());
                        newUser.setTeam(user.getTeam());
                        newUser.setUsertype(user.getUsertype());

                        return new UserDTO(userRepository.save(newUser));
                //}

        }

        @Transactional
        public UserDTO updateUser(long id, UserDTO updatedUser) {

                if (userRepository.findById(id).isPresent()) {
                        UserEntity user = userRepository.findById(id).get();
                        user.setStreet(updatedUser.getStreet());
                        user.setZipcode(updatedUser.getZipcode());
                        user.setCity(updatedUser.getCity());
                        user.setPhone(updatedUser.getPhone());
                        user.setEmail(updatedUser.getEmail());
                        user.setFirstname(updatedUser.getFirstname());
                        user.setLastname(updatedUser.getLastname());
                        user.setBirthDate(updatedUser.getBirthDate());
                        user.setIsactive(updatedUser.getIsactive());
                        user.setTeam(updatedUser.getTeam());
                        user.setUsertype(updatedUser.getUsertype());
                        return new UserDTO(userRepository.save(user));

                } else {
                        throw new EntityNotFoundException("User with id: " + id + " not found");
                }

        }

        public UserDTO getUser(long id) {
                if (userRepository.findById(id).isPresent()) {
                        return new UserDTO(userRepository.findById(id).get());

                } else {
                        throw new EntityNotFoundException("User with id: " + id + " not found");
                }
        }

        public UserDTO getUserByPhone(int phone) {

                if (userRepository.findByPhone(phone) != null) {
                        return new UserDTO(userRepository.findByPhone(phone));
                } else {
                        throw new EntityNotFoundException("User with phone: " + phone + " not found");
                }
        }

        public UserDTO getUserByEmail(String email) {
                if (userRepository.findByEmail(email) != null) {
                        return new UserDTO(userRepository.findByEmail(email));
                } else {
                        throw new EntityNotFoundException("User with phone: " + email + " not found");
                }
        }

        public ArrayList<UserDTO> getAllUsers() {
                var users = new ArrayList<UserDTO>();

                var entities = userRepository.findAllByOrderByFirstnameAsc();

                if (entities.size() > 0) {

                        for (var enitity : entities) {
                                users.add(new UserDTO(enitity));
                        }

                        return users;
                } else {
                        throw new EntityNotFoundException("No users found");
                }
        }

        public ArrayList<UserDTO> getAllUsersByFirstname(String firstname) {
                var users = new ArrayList<UserDTO>();

                var entities = userRepository.findByFirstnameStartsWith(firstname);

                if (entities.size() > 0) {

                        for (var enitity : entities) {
                                users.add(new UserDTO(enitity));
                        }

                        return users;
                } else {
                        throw new EntityNotFoundException("User with first name: " + firstname + " not found");
                }
        }

        public ArrayList<UserDTO> getAllUsersByLastname(String lastname) {
                var users = new ArrayList<UserDTO>();

                var entities = userRepository.findByLastnameStartsWith(lastname);

                if (entities.size() > 0) {

                        for (var enitity : entities) {
                                users.add(new UserDTO(enitity));
                        }

                        return users;
                } else {
                        throw new EntityNotFoundException("User with last name: " + lastname + " not found");
                }
        }

        public ArrayList<UserDTO> getAllByIsactive(boolean isActive) {
                var users = new ArrayList<UserDTO>();

                var entities = userRepository.findByIsactive(isActive);

                if (entities.size() > 0) {

                        for (var enitity : entities) {
                                users.add(new UserDTO(enitity));
                        }

                        return users;
                } else {
                        throw new EntityNotFoundException("No users found");
                }
        }

}
