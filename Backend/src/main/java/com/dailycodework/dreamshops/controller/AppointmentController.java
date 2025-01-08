package com.dailycodework.dreamshops.controller;

import com.dailycodework.dreamshops.model.Appointment;
import com.dailycodework.dreamshops.model.AppointmentCart;
import com.dailycodework.dreamshops.repository.AppointmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/newappointments")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;

    // public AppointmentController(AppointmentRepository appointmentRepository) {
    //     this.appointmentRepository = appointmentRepository;
    // }

    // POST: Create a new appointment
    @PostMapping("/add")
    public ResponseEntity<Appointment> createAppointment(@Validated @RequestBody Appointment appointment) {
        Appointment savedAppointment = appointmentRepository.save(appointment);
        return ResponseEntity.ok(savedAppointment);
    }

    // GET: List all appointments (optional)
    @GetMapping("/getAll")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/getAppointments")
    public ResponseEntity<List<Appointment>> getAppointments(@RequestParam("email") String email) {
        List<Appointment> appointments = appointmentRepository.findAppointmentsByEmail(email) ;
        return ResponseEntity.ok(appointments);
    }
    
}
