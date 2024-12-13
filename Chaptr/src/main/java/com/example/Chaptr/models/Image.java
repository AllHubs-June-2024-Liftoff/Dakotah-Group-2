package com.example.Chaptr.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;

import java.util.Base64;

@Entity
public class Image extends AbstractEntity {

    @Lob
    private byte[] imageData;

    @OneToOne
    @JoinColumn(name = "user_image_id")
    private static User user;

    public Image(){}

    public Image(String name, byte[] imageData) {
        super();
        this.setName(name);
        this.imageData = imageData;
    }


    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public String getImageDataBase64() {
        return Base64.getEncoder().encodeToString(this.imageData);
    }

}
