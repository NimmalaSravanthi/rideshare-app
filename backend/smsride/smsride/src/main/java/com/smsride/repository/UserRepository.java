package com.smsride.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smsride.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    // ✅ Already present
    Optional<User> findByEmail(String email);

    // ✅ Add this to check if a user already exists
    boolean existsByEmail(String email);
}

