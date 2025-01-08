package com.dailycodework.dreamshops.dto;

import com.dailycodework.dreamshops.model.Category;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;


@Data
public class DoctorDto {

    private Long id;
    private String name;
    private String email ;
    private String brand;

    private BigDecimal price;
    private int experience;
    private String description;

    private Category category;

    private List<ImageDto> images;

    public void setEmail(String email){
        this.email = email;
    }
    public String getEmail(){
        return this.email ;
    }
    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<ImageDto> getImages() {
        return images;
    }

    public void setImages(List<ImageDto> images) {
        this.images = images;
    }
}
