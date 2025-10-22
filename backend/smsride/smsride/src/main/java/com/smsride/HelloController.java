package com.smsride;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    // Root URL Mapping: http://localhost:8080/
    @GetMapping("/")
    public String home(){
        return "Welcome to Spring Boot Application!";
    }
}