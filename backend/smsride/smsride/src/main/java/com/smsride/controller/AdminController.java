package com.smsride.controller;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smsride.dto.UserDTO;
import com.smsride.model.RideRequest;
import com.smsride.model.User;
import com.smsride.model.UserRole;
import com.smsride.repository.UserRepository;
import com.smsride.service.AdminService;
import com.smsride.service.EmailService;
import com.smsride.service.UserService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserService userService;
    @Autowired
private UserRepository userRepository;
@Autowired
private EmailService emailService;

@PostMapping("/onboard")
public ResponseEntity<String> onboardUser(@RequestBody UserDTO dto) {
    if (userRepository.existsByEmail(dto.getEmail())) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists.");
    }

    String generatedPassword = generateRandomPassword();

    User user = new User();
    user.setName(dto.getName());
    user.setEmail(dto.getEmail());
    user.setContact(dto.getContact());
    user.setAadhar(dto.getAadhar());
    user.setPassword(generatedPassword);
    user.setRole(UserRole.valueOf(dto.getRole()));
    user.setFirstLogin(true);

    if (dto.getRole().equals("DRIVER")) {
        user.setVehicleType(dto.getVehicleType());
        user.setVehicleNumber(dto.getVehicleNumber());
        user.setCapacity(dto.getCapacity());
        user.setVehicleDetails(dto.getVehicleDetails());
    } else {
        user.setDetails(dto.getDetails());
    }

    userRepository.save(user);

    // ✅ Call email service here
    emailService.sendCredentials(dto.getEmail(), generatedPassword);

    return ResponseEntity.ok("User registered and credentials sent to email.");
}

    


    @GetMapping("/users")
    public List<User> getAllUsers(@RequestParam String role) {
        if (!role.equalsIgnoreCase("ADMIN")) {
            throw new RuntimeException("Access denied. Only ADMIN can view all users.");
        }
        return userService.getAllUsers();
    }

    @GetMapping("/rides")
    public List<RideRequest> getAllRides(@RequestParam String role) {
        if (!role.equalsIgnoreCase("ADMIN")) {
            throw new RuntimeException("Access denied. Only ADMIN can view ride requests.");
        }
        return userService.getAllRideRequests();
    }

    @PostMapping("/assign")
    public String assignDriver(@RequestParam Long rideId, @RequestParam String driverEmail, @RequestParam String role) {
        if (!role.equalsIgnoreCase("ADMIN")) {
            throw new RuntimeException("Access denied. Only ADMIN can assign drivers.");
        }
        return userService.assignDriverToRide(rideId, driverEmail);
    }

    @GetMapping("/completed")
    public List<RideRequest> getCompletedRides(@RequestParam String role) {
        return userService.getCompletedRides(role);
    }
    private String generateRandomPassword() {
    int length = 8;
    String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    StringBuilder password = new StringBuilder();
    Random random = new Random();

    for (int i = 0; i < length; i++) {
        password.append(characters.charAt(random.nextInt(characters.length())));
    }

    return password.toString();
}

}
