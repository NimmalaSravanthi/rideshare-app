package com.smsride.service.impl;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smsride.dto.UserDTO;
import com.smsride.model.User;
import com.smsride.model.UserRole;
import com.smsride.repository.UserRepository;
import com.smsride.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public String onboardUser(UserDTO dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            return "User with this email already exists";
        }

        String password = generatePassword();

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setContact(dto.getContact());
        user.setPassword(password);
        user.setFirstLogin(true);

        if ("DRIVER".equalsIgnoreCase(dto.getRole())) {
            user.setRole(UserRole.DRIVER);
            user.setVehicleDetails(dto.getVehicleDetails());
        } else {
            user.setRole(UserRole.PASSENGER);
            user.setVehicleDetails(null);
        }

        userRepository.save(user);

        return "User onboarded successfully. Temporary password: " + password;
    }

    private String generatePassword() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        Random rand = new Random();
        for (int i = 0; i < 8; i++) {
            sb.append(chars.charAt(rand.nextInt(chars.length())));
        }
        return sb.toString();
    }
}

