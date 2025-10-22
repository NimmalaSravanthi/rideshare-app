package com.smsride.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smsride.model.RideRequest;
import com.smsride.model.User;
import com.smsride.repository.UserRepository;
import com.smsride.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/reset-password")
    public String resetPassword(
            @RequestParam String email,
            @RequestParam String newPassword) {
        return userService.resetPassword(email, newPassword);
    }

    @PostMapping("/login")
public ResponseEntity<Map<String, Object>> login(@RequestParam String email, @RequestParam String password) {
    Optional<User> optionalUser = userRepository.findByEmail(email);
    Map<String, Object> response = new HashMap<>();

    if (optionalUser.isEmpty()) {
        response.put("status", "invalid");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    User user = optionalUser.get();

    if (!user.getPassword().equals(password)) {
        response.put("status", "invalid");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    // Successful login
    response.put("status", user.isFirstLogin() ? "first_login" : "success");
    response.put("role", user.getRole().name());
    response.put("firstLogin", user.isFirstLogin());
    response.put("email", user.getEmail());
    return ResponseEntity.ok(response);
}


    @PostMapping("/vehicle")
    public String addVehicleDetails(
            @RequestParam String email,
            @RequestParam String vehicleNumber,
            @RequestParam String vehicleType,
            @RequestParam int capacity) {
        return userService.addVehicleDetails(email, vehicleNumber, vehicleType, capacity);
    }

    @PostMapping("/book")
    public String bookRide(
            @RequestParam String email,
            @RequestParam String pickup,
            @RequestParam String drop) {
        return userService.bookRide(email, pickup, drop);
    }

    @GetMapping("/assigned")
    public List<RideRequest> getAssignedRides(@RequestParam String email) {
        return userService.getAssignedRides(email);
    }

    @GetMapping("/status")
    public List<RideRequest> getPassengerRides(@RequestParam String email) {
        return userService.getPassengerRides(email);
    }

    @PostMapping("/complete")
    public String completeRide(
            @RequestParam Long rideId,
            @RequestParam String email) {
        return userService.completeRide(rideId, email);
    }
}
