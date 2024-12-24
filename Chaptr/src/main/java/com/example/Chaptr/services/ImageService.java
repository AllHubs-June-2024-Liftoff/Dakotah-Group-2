package com.example.Chaptr.services;

import com.example.Chaptr.data.UserRepository;
import com.example.Chaptr.models.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
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
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Contact not found"));
    }

    public String uploadImage(String email, MultipartFile file) {
        User user = getUser(email);
        String imageUrl = photoFunction.apply(email, file);
            user.setUserImage(imageUrl);
        userRepository.save(user);
        return imageUrl;
    }


    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    private final BiFunction<String, MultipartFile, String> photoFunction = (id, image) -> {
        String filename = id + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(IMAGE_DIRECTORY).toAbsolutePath().normalize();
            if(!Files.exists((java.nio.file.Path) fileStorageLocation)) { Files.createDirectories((java.nio.file.Path) fileStorageLocation); }
            Files.copy(image.getInputStream(), ((java.nio.file.Path) fileStorageLocation).resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/image/" + filename).toUriString();
        }catch (Exception exception) {
            throw new RuntimeException("Unable to save image");
        }
    };
}
