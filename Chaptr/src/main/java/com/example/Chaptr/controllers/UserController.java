package com.example.Chaptr.controllers;

import com.example.Chaptr.data.UserRepository;
import com.example.Chaptr.dto.LoginRequest;
import com.example.Chaptr.models.User;
import com.example.Chaptr.services.ImageService;
import com.example.Chaptr.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ImageService imageService;

    @Autowired
    private final UserService userService;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    private static final String userSessionKey = "user";

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    public User getUserFromSession(HttpSession session) {
        return (User) session.getAttribute("user");
    }

    public Integer getUserIdFromSession(HttpSession session) {
        User user = getUserFromSession(session);
        return (user != null) ? user.getId() : null;
    }

    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        List<User> users = (List<User>) userRepository.findAll();
        if (users == null) {
            return new ArrayList<>();
        }
        return users;
    }

    @PostMapping("/register")
    ResponseEntity<?> userRegistration(@Valid @RequestBody User newUser, Errors errors) {
        if (errors.hasErrors()) {
            Map<String, String> registerErrors = new HashMap<>();
            errors.getFieldErrors().forEach(error ->
                    registerErrors.put(error.getField(), error.getDefaultMessage()));
            return new ResponseEntity<>(registerErrors, HttpStatus.BAD_REQUEST);
        }

        try {
            userService.saveUser(newUser);
            return new ResponseEntity<>("User registration was successful", HttpStatus.CREATED );
        } catch (DataIntegrityViolationException exception) {
            if (exception.getMessage().contains("UK_email")) {
                return new ResponseEntity<>(Map.of("email","Email already in use"), HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(Map.of("error", "An unexpected error has occurred"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
                existingUser.setPwHash(passwordEncoder.encode(newUser.getPwHash()));
            }
        }
        return userRepository.save(existingUser);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Integer id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpSession session) {

        if (loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty() ||
                loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            return new ResponseEntity<>("Email and password are required", HttpStatus.BAD_REQUEST);
        }

        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPwHash())) {
                // Store the user ID in session
                session.setAttribute("user", user.getId());
                return new ResponseEntity<>("Login successful!", HttpStatus.OK);
            }
        }

        return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);
    }

    @GetMapping("/checkLogin")
    public ResponseEntity<?> checkLogin(HttpSession session) {
        Integer userId = (Integer) session.getAttribute("user");  // Corrected key
        if (userId == null) {
            return new ResponseEntity<>("No user is logged in", HttpStatus.UNAUTHORIZED);
        }

        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            return new ResponseEntity<>("User: " + userOpt.get().getEmail(), HttpStatus.OK);
        }

        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
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

