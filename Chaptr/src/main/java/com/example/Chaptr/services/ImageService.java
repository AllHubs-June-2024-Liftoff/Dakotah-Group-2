package com.example.Chaptr.services;

import com.example.Chaptr.data.UserRepository;
import com.example.Chaptr.models.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.function.BiFunction;
import java.util.function.Function;
import static com.example.Chaptr.services.imageDirectory.IMAGE_DIRECTORY;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
public class ImageService {

    private final UserRepository userRepository;

    public ImageService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User email not found"));
    }

    public String uploadImage(String email, MultipartFile file) {
        User user = getUser(email);
        String imageUrl = storeImage.apply(email, file);
            user.setUserImage(imageUrl);
        userRepository.save(user);
        return imageUrl;
    }


    private final Function<String, String> fileExtension = filename -> {
        int dotIndex = filename.lastIndexOf(".");
        if (dotIndex > 0) {
            return "." + filename.substring(dotIndex + 1);
        }
        return ".png";
    };

    private final BiFunction<String, MultipartFile, String> storeImage = (id, image) -> {
        String filename = id + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(IMAGE_DIRECTORY).toAbsolutePath().normalize();
            if (!Files.exists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);  }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/image/" + filename).toUriString();
        }catch (Exception exception) {
            throw new RuntimeException("Unable to save image");
        }
    };
}
