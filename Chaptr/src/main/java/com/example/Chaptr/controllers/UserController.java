package com.example.Chaptr.controllers;

import com.example.Chaptr.data.UserRepository;
import com.example.Chaptr.models.Club;
import com.example.Chaptr.models.User;
import com.example.Chaptr.services.ImageService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.example.Chaptr.services.imageDirectory.IMAGE_DIRECTORY;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

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

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    @GetMapping("/owner/{id}")
    public Optional<User> profileOwner(@PathVariable("id") Integer id){
        Optional<User> owner = userRepository.findById(id);
        return owner;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User newUser) {
        if (newUser.getFirstName() == null || newUser.getFirstName().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        if (newUser.getLastName() == null || newUser.getLastName().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        if (newUser.getPwHash() == null || newUser.getPwHash().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        newUser.setPwHash(passwordEncoder.encode(newUser.getPwHash()));
        newUser.setName(newUser.getFirstName(), newUser.getLastName());
        newUser.setTbr(null);
        User savedUser = userRepository.save(newUser);

        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/editUser/{email}")
    public ResponseEntity<User> updateUser(@Valid @RequestBody User updateUser, @PathVariable String email) {
        Optional<User> optUser = userRepository.findByEmail(email);

        if (optUser.isPresent()) {
            User existingUser = optUser.get();

            existingUser.setFirstName(updateUser.getFirstName());
            existingUser.setLastName(updateUser.getLastName());
            existingUser.setName(String.format("%s %s", updateUser.getFirstName(), updateUser.getLastName()).trim());
            existingUser.setLocation(updateUser.getLocation());

            if (updateUser.getPwHash() != null && !updateUser.getPwHash().equals(existingUser.getPwHash())) {
                existingUser.setPwHash(passwordEncoder.encode(updateUser.getPwHash()));
            }

            return ResponseEntity.ok(userRepository.save(existingUser));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Integer id){
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

    @PutMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("email") String email, @RequestParam("file")MultipartFile file) {
        return ResponseEntity.ok().body(imageService.uploadImage(email, file));
    }

    @GetMapping(path = "/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getImage(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(IMAGE_DIRECTORY + filename));
    }
    
    @GetMapping("/clubs/{userId}")
    public Set<Club> getUserClubs(@PathVariable Integer userId){
        Optional<User> user = userRepository.findById(userId);
        Set<Club> clubs = Set.of();
        
        if (user.isPresent()){
            User currentUser = user.get();
            clubs = currentUser.getClubs();
        }
        
        return clubs;
    }
}