package com.smsride.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smsride.model.RideRequest;
import com.smsride.repository.RideRequestRepository;
import com.smsride.service.RideRequestService;

@RestController
@RequestMapping("/ride")
public class RideController {
    @Autowired
    private RideRequestRepository rideRequestRepository;

    @PostMapping("/book")
    public String bookRide(@RequestParam String passengerEmail,
                           @RequestParam String pickup,
                           @RequestParam String drop) {
        RideRequest ride = new RideRequest();
        ride.setId(System.currentTimeMillis()); // simple ID
        ride.setPassengerEmail(passengerEmail);
        ride.setPickupLocation(pickup);
        ride.setDropLocation(drop);
        ride.setStatus("REQUESTED");
        rideRequestRepository.save(ride);
        return "Ride booked successfully";
    }
    @Autowired
    private RideRequestService rideRequestService;

    @GetMapping("/driver")
    public List<RideRequest> getRidesForDriver(@RequestParam String email) {
        return rideRequestService.getRidesByDriver(email);
    }

    @GetMapping("/passenger")
    public List<RideRequest> getRidesForPassenger(@RequestParam String email) {
        return rideRequestService.getRidesByPassenger(email);
    }

    @GetMapping("/status")
    public List<RideRequest> getRidesByStatus(@RequestParam String status) {
        return rideRequestService.getRidesByStatus(status);
    }
}
