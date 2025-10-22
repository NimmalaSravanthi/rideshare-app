package com.smsride.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smsride.model.User;
import com.smsride.repository.UserRepository;

@RestController
public class LoginController {

    @Autowired
    private UserRepository userRepository;
    @GetMapping("/login")
public Map<String, String> login(@RequestParam String email, @RequestParam String password) {
    Map<String, String> response = new HashMap<>();
    Optional<User> optionalUser = userRepository.findByEmail(email);

    if (optionalUser.isPresent() && optionalUser.get().getPassword().equals(password)) {
        User user = optionalUser.get();
        if (user.isFirstLogin()) {
            response.put("status", "first_login");
        } else {
            response.put("status", "success");
        }
        response.put("role", user.getRole().toString());
    } else {
        response.put("status", "invalid");
    }

    return response;
}


}
