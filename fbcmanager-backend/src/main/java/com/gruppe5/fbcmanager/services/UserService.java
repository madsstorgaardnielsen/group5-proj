package com.gruppe5.fbcmanager.services;

import java.time.LocalDate;

import javax.transaction.Transactional;

import com.gruppe5.fbcmanager.dtos.UserDTO;
import com.gruppe5.fbcmanager.entities.AddressEntity;
import com.gruppe5.fbcmanager.entities.UserEntity;
import com.gruppe5.fbcmanager.repositories.AddressRepository;
import com.gruppe5.fbcmanager.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

        @Autowired
        public UserRepository userRepository;

        @Autowired 
        public AddressRepository addressRepository;

        public UserDTO asd() {

                UserEntity user = new UserEntity("firstname","lastname","isactive","team","usertype",LocalDate.of(2222, 12, 12));
                AddressEntity address = new AddressEntity(user, "Street", "zip", "city");
                user.setAddress(address);
                userRepository.save(user);
                // ContactInfoEntity contactinfo = new ContactInfoDTO("phone",
                // "email").toEntity();
                // PractiseEntity practise = new PractiseDTO("Vejen", 10, LocalDate.of(2022,
                // Month.JANUARY, 22),
                // LocalTime.of(17, 30), LocalTime.of(21, 30)).toEntity();
                // var practises = new ArrayList<PractiseEntity>();
                // practises.add(practise);
                // user.setAddress(address);
                // user.setContactInfos(contactinfo);
                // user.setBirthDate(LocalDate.of(1999, Month.JANUARY, 22));
                // user.setFirstname("firstname");
                // user.setLastname("lastname");
                // user.setIsactive("isactive");
                // // user.setPractices(practises);
                // user.setTeam("team");
                // user.setUsertype("usertype");



                

                return new UserDTO(userRepository.save(user));

        }

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
