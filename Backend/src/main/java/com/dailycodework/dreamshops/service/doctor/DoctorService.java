package com.dailycodework.dreamshops.service.doctor;

import com.dailycodework.dreamshops.dto.ImageDto;
import com.dailycodework.dreamshops.dto.DoctorDto;
import com.dailycodework.dreamshops.exceptions.ResourceNotFoundException;
import com.dailycodework.dreamshops.model.Category;
import com.dailycodework.dreamshops.model.Image;
import com.dailycodework.dreamshops.model.Doctor;
import com.dailycodework.dreamshops.repository.CategoryRepository;
import com.dailycodework.dreamshops.repository.ImageRepository;
import com.dailycodework.dreamshops.repository.DoctorRepository;
import com.dailycodework.dreamshops.request.AddDoctorRequest;
import com.dailycodework.dreamshops.request.DoctorUpdateRequest;
import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DoctorService implements IDoctorService {
    private final DoctorRepository doctorRepository;
    private final CategoryRepository categoryRepository;

    private final ImageRepository imageRepository;

    private final ModelMapper modelMapper;

    @Override
    public Doctor addDoctor(AddDoctorRequest request) {
        // Check if the category is found in the DB
        // If Yes, set it as the new doctor category
        // If No, then save it as a new category
        // Then set it as the new doctor category.

        Category category = Optional.ofNullable(categoryRepository.findByName(request.getCategory().getName()))
                .orElseGet(() -> {
                    Category newCategory = new Category(request.getCategory().getName());
                    return categoryRepository.save(newCategory);
                });
        request.setCategory(category);
        return doctorRepository.save(createDoctor(request, category));
    }

    private Doctor createDoctor(AddDoctorRequest request, Category category) {
        return new Doctor(
                request.getName(),
                request.getBrand(),
                request.getPrice(),
                request.getExperience(),
                request.getDescription(),
                category
        );
    }

    @Override
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found!"));
    }

    @Override
    public void deleteDoctorById(Long id) {
        doctorRepository.findById(id).ifPresentOrElse(doctor -> {
            // Log to verify the doctor exists
            System.out.println("Deleting doctor: " + doctor);
            doctorRepository.delete(doctor);
        }, () -> {
            throw new ResourceNotFoundException("Doctor not found with ID: " + id);
        });
    }

    @Override
    public Long getNextDoctorId() {
        Long nextId = doctorRepository.findMaxDoctorId();
        return nextId != null ? nextId + 1 : 1L; // If no doctors exist, return 1L
    }

    @Override
    public Doctor updateDoctor(DoctorUpdateRequest request, Long doctorId) {
        return doctorRepository.findById(doctorId)
                .map(existingDoctor -> updateExistingDoctor(existingDoctor, request))
                .map(doctorRepository::save)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found!"));
    }

    private Doctor updateExistingDoctor(Doctor existingDoctor, DoctorUpdateRequest request) {
        existingDoctor.setName(request.getName());
        existingDoctor.setBrand(request.getBrand());
        existingDoctor.setPrice(request.getPrice());
        existingDoctor.setExperience(request.getInventory());
        existingDoctor.setDescription(request.getDescription());

        Category category = categoryRepository.findByName(request.getCategory().getName());
        existingDoctor.setCategory(category);
        return existingDoctor;
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public List<Doctor> getDoctorsByCategory(String category) {
        return doctorRepository.findByCategoryName(category);
    }

    @Override
    public List<Doctor> getDoctorsByBrand(String brand) {
        return doctorRepository.findByBrand(brand);
    }

    @Override
    public List<Doctor> getDoctorsByCategoryAndBrand(String category, String brand) {
        return doctorRepository.findByCategoryNameAndBrand(category, brand);
    }

    @Override
    public List<Doctor> getDoctorsByName(String name) {
        return doctorRepository.findByName(name);
    }

    @Override
    public List<Doctor> getDoctorsByBrandAndName(String brand, String name) {
        return doctorRepository.findByBrandAndName(brand, name);
    }

    @Override
    public Long countDoctorsByBrandAndName(String brand, String name) {
        return doctorRepository.countByBrandAndName(brand, name);
    }

    @Override
    public List<DoctorDto> getConvertedDoctors(List<Doctor> doctors) {
        return doctors.stream().map(this::convertToDto).toList();
    }

    @Override
    public DoctorDto convertToDto(Doctor doctor) {
        DoctorDto doctorDto = modelMapper.map(doctor, DoctorDto.class);
        List<Image> images = imageRepository.findByDoctorId(doctor.getId());

        List<ImageDto> imageDtos = images.stream().map(image -> modelMapper.map(image, ImageDto.class)).toList();

        doctorDto.setImages(imageDtos);
        return doctorDto;
    }
}
