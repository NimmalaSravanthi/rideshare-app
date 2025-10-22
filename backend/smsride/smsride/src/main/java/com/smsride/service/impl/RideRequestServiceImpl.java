package com.smsride.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.smsride.model.RideRequest;
import com.smsride.repository.RideRequestRepository;
import com.smsride.service.RideRequestService;

@Service
public class RideRequestServiceImpl implements RideRequestService {

    @Autowired
    private RideRequestRepository rideRequestRepository;

    @Override
    public List<RideRequest> getRidesByDriver(String driverEmail) {
        return rideRequestRepository.findByDriverEmail(driverEmail);
    }

    @Override
    public List<RideRequest> getRidesByPassenger(String passengerEmail) {
        return rideRequestRepository.findByPassengerEmail(passengerEmail);
    }

    @Override
    public List<RideRequest> getRidesByStatus(String status) {
        return rideRequestRepository.findByStatus(status);
    }
}
