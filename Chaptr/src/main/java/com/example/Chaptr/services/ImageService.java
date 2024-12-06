package com.example.Chaptr.services;

import com.example.Chaptr.models.Image;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class ImageService {

    public ImageService(){}

    public static Image saveImage(Image imageEntity, String name, @NotNull MultipartFile file) {
        try {
            imageEntity.setName(name);
            imageEntity.setImageData(file.getBytes());
        } catch (IOException ex) {
            Logger.getLogger(Image.class.getName()).log(Level.SEVERE, null, ex);
        }
        return imageEntity;
    }
}
