package com.smsride.dto;

public class UserDTO {
    private String name;
    private String email;
    private String contact;
    private String aadhar;
    private String role;

    // Driver-specific
    private String vehicleType;
    private String vehicleNumber;
    private int capacity;
    private String vehicleDetails;

    // Passenger-specific
    private String details;

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getAadhar() { return aadhar; }
    public void setAadhar(String aadhar) { this.aadhar = aadhar; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }

    public String getVehicleNumber() { return vehicleNumber; }
    public void setVehicleNumber(String vehicleNumber) { this.vehicleNumber = vehicleNumber; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }

    public String getVehicleDetails() { return vehicleDetails; }
    public void setVehicleDetails(String vehicleDetails) { this.vehicleDetails = vehicleDetails; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
}
