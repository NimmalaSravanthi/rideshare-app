package com.smsride.service;

import java.util.List;

import com.smsride.model.RideRequest;

public interface RideRequestService {
    List<RideRequest> getRidesByDriver(String driverEmail);
    List<RideRequest> getRidesByPassenger(String passengerEmail);
    List<RideRequest> getRidesByStatus(String status);
}
