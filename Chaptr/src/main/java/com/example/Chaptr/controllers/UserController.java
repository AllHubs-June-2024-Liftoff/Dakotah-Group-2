package com.example.Chaptr.controllers;

import com.example.Chaptr.data.UserRepository;
import com.example.Chaptr.models.User;
import com.example.Chaptr.services.ImageService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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

    @PostMapping("/register")
    User newUser(@RequestBody User newUser) {
        newUser.setPwHash(bCryptPasswordEncoder.encode(newUser.getPwHash()));
        newUser.setName(newUser.getFirstName(), newUser.getLastName());
        return userRepository.save(newUser);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@Valid @RequestBody User newUser, @PathVariable int id) {
        Optional<User> optUser = userRepository.findById(id);

        if (optUser.isPresent()) {
            User existingUser = optUser.get();

            existingUser.setFirstName(newUser.getFirstName());
            existingUser.setLastName(newUser.getLastName());
            existingUser.setName(String.format("%s %s", newUser.getFirstName(), newUser.getLastName()).trim());
            existingUser.setEmail(newUser.getEmail());
            existingUser.setLocation(newUser.getLocation());

            if (newUser.getPwHash() != null && !newUser.getPwHash().equals(existingUser.getPwHash())) {
                existingUser.setPwHash(bCryptPasswordEncoder.encode(newUser.getPwHash()));
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

