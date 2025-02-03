package com.example.Chaptr.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.Chaptr.data.UserRepository;
import com.example.Chaptr.models.User;
import com.example.Chaptr.services.ImageService;
import static com.example.Chaptr.services.imageDirectory.IMAGE_DIRECTORY;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ImageService imageService;

    private final PasswordEncoder passwordEncoder;

    public UserController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    @GetMapping("/getUserProfile/{id}")
    public Optional<User> getUserProfile(@PathVariable("id") Integer id) {
        Optional<User> userProfile = userRepository.findById(id);
        return userProfile;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User newUser) {
        if (newUser.getFirstName().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        if (newUser.getLastName().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        if (newUser.getPwHash().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        newUser.setPwHash(passwordEncoder.encode(newUser.getPwHash()));
        newUser.setName(newUser.getFirstName(), newUser.getLastName());
        newUser.setTbr(null);
        User savedUser = userRepository.save(newUser);

        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/updateUser/{email}")
    public ResponseEntity<User> updateUser(@Valid @RequestBody User updateUser, @PathVariable String email) {
        Optional<User> optUser = userRepository.findByEmail(email);

        if (optUser.isPresent()) {
            User existingUser = optUser.get();

            existingUser.setFirstName(updateUser.getFirstName());
            existingUser.setLastName(updateUser.getLastName());
            existingUser.setName(String.format("%s %s", updateUser.getFirstName(), updateUser.getLastName()).trim());
            existingUser.setLocation(updateUser.getLocation());

            if (!updateUser.getPwHash().equals(existingUser.getPwHash())) {
                existingUser.setPwHash(passwordEncoder.encode(updateUser.getPwHash()));
            }

            return ResponseEntity.ok(userRepository.save(existingUser));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Integer id) {
        Optional<User> user = userRepository.findById(id);

        if (user.isPresent()) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();

            if (existingUser.isMatchingPassword(user.getPwHash())) {
                return ResponseEntity.ok(existingUser);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {

        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
            return ResponseEntity.ok("Logout successful.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No active session found.");
        }
    }

    @PutMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam("email") String email, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(imageService.uploadImage(email, file));
    }

    @GetMapping(path = "/image/{filename}", produces = {IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE})
    public byte[] getImagePath(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(IMAGE_DIRECTORY + filename));
    }
}