package com.gruppe5.fbcmanager.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*") 
public class LandingPageController {
    @RequestMapping("/")
	public String welcomepage() {
		return "hello";
	}
}
