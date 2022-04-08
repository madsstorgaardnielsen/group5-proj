package com.gruppe5.fbcmanager.services;

import com.gruppe5.fbcmanager.repositories.RoleRepository;
import com.gruppe5.fbcmanager.repositories.UserRepository;
import com.gruppe5.fbcmanager.security.jwt.JwtUtils;
import com.gruppe5.fbcmanager.security.response.UserInfoResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.validation.Valid;

import com.gruppe5.fbcmanager.entities.RoleEntity;
import com.gruppe5.fbcmanager.entities.UserEntity;
import com.gruppe5.fbcmanager.models.ERole;
import com.gruppe5.fbcmanager.security.request.LoginRequest;
import com.gruppe5.fbcmanager.security.request.SignupRequest;
import com.gruppe5.fbcmanager.security.response.MessageResponse;
import com.gruppe5.fbcmanager.security.services.UserDetailsImpl;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private JwtUtils jwtUtils;

    private Authentication authManager(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                        loginRequest.getPassword()));

        return authentication;
    }

    public UserInfoResponse authenticateUser(LoginRequest loginRequest) {
        Authentication auth = authManager(loginRequest);
        SecurityContextHolder.getContext().setAuthentication(auth);
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return new UserInfoResponse(userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles);
    }

    public String generatResponseCookie(LoginRequest loginRequest) {
        Authentication auth = authManager(loginRequest);
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        return jwtCookie.toString();
    }

    public boolean checkIfExistsByEmail(SignupRequest signUpRequest) {

        return userRepository.existsByEmail(signUpRequest.getEmail());
    }

    public boolean checkIfExistsByUsername(SignupRequest signUpRequest) {
        return userRepository.existsByUsername(signUpRequest.getUsername());
    }

    public boolean registerUser(SignupRequest signUpRequest) {

        UserEntity user = new UserEntity(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));
        Set<String> strRoles = signUpRequest.getRole();
        Set<RoleEntity> roles = new HashSet<>();
        if (strRoles == null) {
            RoleEntity userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        RoleEntity adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException(
                                        "Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "mod":
                        RoleEntity modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException(
                                        "Error: Role is not found."));
                        roles.add(modRole);
                        break;
                    default:
                        RoleEntity userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException(
                                        "Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);

        return true;
    }
}
