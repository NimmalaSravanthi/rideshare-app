package com.smsride.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smsride.model.RideRequest;
public interface RideRequestRepository extends JpaRepository<RideRequest, Long> {
    List<RideRequest> findByDriverEmail(String driverEmail);
    List<RideRequest> findByPassengerEmail(String passengerEmail);
    List<RideRequest> findByStatus(String status);
}

