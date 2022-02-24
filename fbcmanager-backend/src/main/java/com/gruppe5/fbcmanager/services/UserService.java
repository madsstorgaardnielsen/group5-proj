package com.gruppe5.fbcmanager.services;


import com.gruppe5.fbcmanager.database.models.Address;
import com.gruppe5.fbcmanager.database.models.ContactInfo;
import com.gruppe5.fbcmanager.database.models.User;
import com.gruppe5.fbcmanager.database.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    public UserRepository userRepository;

    public void addUser(User user) {
        User newUser = new User(
                user.getFirstname(),
                user.getLastname(),
                user.getIsactive(),
                user.getTeam(),
                user.getUsertype());
        newUser.setAddress(
                new Address(newUser, user.getAddress().getStreet(), user.getAddress().getZipcode(),
                        user.getAddress().getCity()));

        newUser.setContactInfos(
                new ContactInfo(newUser, user.getContactInfos().getPhone(), user.getContactInfos().getEmail()));
                
        userRepository.save(newUser);
    }
}
