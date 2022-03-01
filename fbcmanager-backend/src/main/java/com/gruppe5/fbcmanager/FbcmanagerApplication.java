package com.gruppe5.fbcmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

//https://lightrun.com/java/the-complete-list-of-spring-boot-annotations-you-must-know/

@SpringBootApplication
public class FbcmanagerApplication {
    public static void main(String[] args) {
        SpringApplication.run(FbcmanagerApplication.class, args);
    }
}

