package com.gruppe5.fbcmanager.controllers;

import javax.validation.Valid;

import com.gruppe5.fbcmanager.domain.services.AuthService;
import com.gruppe5.fbcmanager.security.jwt.JwtUtils;
import com.gruppe5.fbcmanager.security.request.LoginRequest;
import com.gruppe5.fbcmanager.security.request.SignupRequest;
import com.gruppe5.fbcmanager.security.response.MessageResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
        @Autowired
        JwtUtils jwtUtils;

        @Autowired
        private AuthService authService;

        @PostMapping("/signin")
        public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
                var responseCookie = authService.generatResponseCookie(loginRequest);
                var userInfoResponse = authService.authenticateUser(loginRequest);

                return ResponseEntity
                                .ok()
                                .header(HttpHeaders.SET_COOKIE, responseCookie)
                                .body(userInfoResponse);
        }

        @PostMapping("/signup")
        public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
                if (authService.checkIfExistsByUsername(signUpRequest)) {
                        return ResponseEntity
                                        .badRequest()
                                        .body(new MessageResponse("Error: Username is already taken!"));
                }
                if (authService.checkIfExistsByEmail(signUpRequest)) {
                        return ResponseEntity
                                        .badRequest()
                                        .body(new MessageResponse("Error: Email is already in use!"));
                }

                var result = authService.registerUser(signUpRequest);

                if (result) {
                        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
                } else
                        return ResponseEntity.ok(new MessageResponse("Registration failed"));
        }

        @PostMapping("/signout")
        public ResponseEntity<?> logoutUser() {
                ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
                return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                                .body(new MessageResponse("You've been signed out!"));
        }
}
