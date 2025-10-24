package com.smsride.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendCredentials(String toEmail, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Welcome to SMSRide - Your Login Credentials");
        message.setText("Hello,\n\nYour login credentials:\nEmail: " + toEmail + "\nPassword: " + password +
                "\n\nPlease reset your password on first login.\n\n- SMSRide Team");

        mailSender.send(message);
    }
}
