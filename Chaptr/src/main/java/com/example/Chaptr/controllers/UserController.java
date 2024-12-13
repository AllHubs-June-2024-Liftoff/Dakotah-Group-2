package com.example.Chaptr.controllers;

import com.example.Chaptr.data.UserRepository;
import com.example.Chaptr.models.User;
import com.example.Chaptr.services.ImageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ImageService imageService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        newUser.setPwHash(bCryptPasswordEncoder.encode(newUser.getPwHash()));
        newUser.setName(newUser.getFirstName(), newUser.getLastName());
        return userRepository.save(newUser);
    }

    @PutMapping("/user/{id}")
    public User updateUser(@Valid @RequestBody User newUser,
                           @PathVariable int id) {

        Optional<User> optUser = userRepository.findById(id);

        User existingUser = null;
        if (optUser.isPresent()) {
            existingUser = optUser.get();

            existingUser.setFirstName(newUser.getFirstName());
            existingUser.setLastName(newUser.getLastName());
            existingUser.setName(newUser.getFirstName(), newUser.getLastName());
            existingUser.setEmail(newUser.getEmail());
            existingUser.setLocation(newUser.getLocation());

            if (newUser.getPwHash() != null && !newUser.getPwHash().equals(existingUser.getPwHash())) {
                existingUser.setPwHash(bCryptPasswordEncoder.encode(newUser.getPwHash()));
            }
        }
        return userRepository.save(existingUser);
    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable("id") Integer id){
        userRepository.deleteById(id);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

        if (optionalUser.isPresent() && user.isMatchingPassword(user.getPwHash())) {
            return ResponseEntity.ok("Login was successful!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid email or password. Please try again!");
        }
    }
}

    /* @PostMapping("/editUser")
    public ResponseEntity<?> addUser(@Valid @RequestBody User newUser,
                                     @RequestParam("file") MultipartFile file,
                                     @RequestParam("fileName") String fileName) {
        try {
            Image tempImage = new Image();
            tempImage = imageService.saveImage(tempImage, fileName, file);

            newUser.setUserImage(tempImage);
            userRepository.save(newUser);

            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error uploading image: " + e.getMessage());
        }
    } */

