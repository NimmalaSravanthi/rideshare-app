package com.smsride.service;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smsride.model.RideRequest;
import com.smsride.model.User;
import com.smsride.model.UserRole;
import com.smsride.repository.RideRequestRepository;
import com.smsride.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 🔐 Step 3 + Step 6: Login with role-based dashboard
    public String login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            return "User not found";
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(password)) {
            return "Invalid password";
        }

        if (user.isFirstLogin()) {
            return "Please reset your password before accessing the dashboard";
        }

        switch (user.getRole()) {
            case ADMIN:
                return "Welcome to Admin Dashboard";
            case DRIVER:
                return "Welcome to Driver Dashboard";
            case PASSENGER:
                return "Welcome to Passenger Dashboard";
            default:
                return "Login successful. Role not recognized.";
        }
    }

    // 🔄 Step 5: Password Reset
    public String resetPassword(String email, String newPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            return "User not found";
        }

        User user = userOpt.get();

        if (!user.isFirstLogin()) {
            return "Password already set. You can log in normally.";
        }

        user.setPassword(newPassword);
        user.setFirstLogin(false);
        userRepository.save(user);

        return "Password reset successful. You can now log in.";
    }

    // 🧑‍💼 Step 4: Admin Onboarding
    public String onboardUser(String name, String email, String contact, String role) {
        if (userRepository.findByEmail(email).isPresent()) {
            return "User with this email already exists";
        }

        String password = generatePassword();

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setContact(contact);
        user.setPassword(password);
        user.setFirstLogin(true);
        user.setVehicleDetails(null);

        try {
            user.setRole(UserRole.valueOf(role.toUpperCase()));
        } catch (IllegalArgumentException e) {
            return "Invalid role. Allowed roles: ADMIN, DRIVER, PASSENGER";
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
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public String addVehicleDetails(String email, String vehicleNumber, String vehicleType, int capacity) {
    Optional<User> userOpt = userRepository.findByEmail(email);

    if (userOpt.isEmpty()) {
        return "User not found";
    }

    User user = userOpt.get();

    if (user.getRole() != UserRole.DRIVER) {
        return "Only drivers can add vehicle details";
    }

    user.setVehicleNumber(vehicleNumber);
    user.setVehicleType(vehicleType);
    user.setCapacity(capacity);

    userRepository.save(user);
    return "Vehicle details added successfully";
}
    @Autowired
private RideRequestRepository rideRequestRepository;

public String bookRide(String email, String pickup, String drop) {
    Optional<User> userOpt = userRepository.findByEmail(email);

    if (userOpt.isEmpty()) {
        return "Passenger not found";
    }

    User user = userOpt.get();

    if (user.getRole() != UserRole.PASSENGER) {
        return "Only passengers can book rides";
    }

    RideRequest request = new RideRequest();
    request.setPassengerEmail(email);
    request.setPickupLocation(pickup);
    request.setDropLocation(drop);
    request.setStatus("REQUESTED");

    rideRequestRepository.save(request);
    return "Ride request submitted successfully";
}
    public List<RideRequest> getAllRideRequests() {
    return rideRequestRepository.findAll();
}
    public String assignDriverToRide(Long rideId, String driverEmail) {
    Optional<RideRequest> rideOpt = rideRequestRepository.findById(rideId);
    Optional<User> driverOpt = userRepository.findByEmail(driverEmail);

    if (rideOpt.isEmpty()) {
        return "Ride request not found";
    }

    if (driverOpt.isEmpty()) {
        return "Driver not found";
    }

    User driver = driverOpt.get();
    if (driver.getRole() != UserRole.DRIVER) {
        return "Provided user is not a driver";
    }

    RideRequest ride = rideOpt.get();
    ride.setDriverEmail(driverEmail);
    ride.setStatus("ASSIGNED");

    rideRequestRepository.save(ride);
    return "Driver assigned successfully";
}
public List<RideRequest> getAssignedRides(String email) {
    Optional<User> userOpt = userRepository.findByEmail(email);

    if (userOpt.isEmpty()) {
        return List.of(); // or return "Driver not found"
    }

    User user = userOpt.get();
    if (user.getRole() != UserRole.DRIVER) {
        return List.of(); // or return "Only drivers can view assigned rides"
    }

    return rideRequestRepository.findByDriverEmail(email);
}
public List<RideRequest> getPassengerRides(String email) {
    Optional<User> userOpt = userRepository.findByEmail(email);

    if (userOpt.isEmpty()) {
        return List.of(); // or return "Passenger not found"
    }

    User user = userOpt.get();
    if (user.getRole() != UserRole.PASSENGER) {
        return List.of(); // or return "Only passengers can view ride status"
    }

    return rideRequestRepository.findByPassengerEmail(email);
}
public String completeRide(Long rideId, String driverEmail) {
    Optional<RideRequest> rideOpt = rideRequestRepository.findById(rideId);

    if (rideOpt.isEmpty()) {
        return "Ride not found";
    }

    RideRequest ride = rideOpt.get();

    if (!ride.getDriverEmail().equals(driverEmail)) {
        return "Access denied. This ride is not assigned to you.";
    }

    if (!ride.getStatus().equals("ASSIGNED")) {
        return "Ride is not in ASSIGNED state";
    }

    ride.setStatus("COMPLETED");
    rideRequestRepository.save(ride);

    return "Ride marked as completed";
}
public List<RideRequest> getCompletedRides(String role) {
    if (!role.equalsIgnoreCase("ADMIN")) {
        return List.of(); // or throw new RuntimeException("Access denied")
    }
    return rideRequestRepository.findByStatus("COMPLETED");
}


}

